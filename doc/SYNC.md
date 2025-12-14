# Sincronização Offline-First — Estratégia de Dados

## 📱 Visão Geral

O app mobile do Preset CTO é **offline-first**, ou seja:
- Funciona **sem conexão com internet**
- Armazena dados **localmente** (SQLite / AsyncStorage)
- Sincroniza dados automaticamente **quando conectado**
- Resolve conflitos de forma transparente

---

## 🏗️ Arquitetura de Dados

### No Mobile (Local)

```
┌─────────────────────────────────────────────┐
│   React Native App (Offline-First)          │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  UI Layer (React Navigation)        │  │
│  └────────────┬────────────────────────┘  │
│               │                            │
│  ┌────────────▼────────────────────────┐  │
│  │  Redux / Context + Sync Service    │  │
│  │  (gerencia estado local)            │  │
│  └────────────┬────────────────────────┘  │
│               │                            │
│  ┌────────────▼────────────────────────┐  │
│  │  SQLite / AsyncStorage              │  │
│  │  (persistência local)               │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  Sync Queue & Conflict Resolution  │  │
│  │  (operações pendentes)              │  │
│  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### No Backend (Central)

```
┌─────────────────────────────────────────────┐
│   Spring Boot API                           │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  REST Endpoints (/sync, /data)      │  │
│  └────────────┬────────────────────────┘  │
│               │                            │
│  ┌────────────▼────────────────────────┐  │
│  │  Sync Service / Merge Logic         │  │
│  │  (reconcilia dados do mobile)       │  │
│  └────────────┬────────────────────────┘  │
│               │                            │
│  ┌────────────▼────────────────────────┐  │
│  │  PostgreSQL + Audit Trail           │  │
│  │  (source of truth)                  │  │
│  └─────────────────────────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  RabbitMQ Events                    │  │
│  │  (notifica outros mobiles)          │  │
│  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 🔄 Fluxo de Sincronização

### 1️⃣ **Operação Offline (Usuário Cria/Edita Dados)**

```
Usuário Edita Registro
         ↓
SQLite Local Atualiza
         ↓
Operação Adicionada à Sync Queue
         ↓
UI Atualiza Imediatamente (otimista)
         ↓
App Aguarda Conexão Online
```

### 2️⃣ **Detecção de Conexão Online**

```
Listener detecta conexão
         ↓
Verifica itens em Sync Queue
         ↓
SE existem itens:
  → Inicia sincronização
  ELSE:
  → Apenas puxa dados atualizados do servidor
```

### 3️⃣ **Sincronização (Push)** — Enviar dados do mobile

```
POST /api/v1/sync/push
{
  "timestamp": "2025-12-13T10:30:00Z",
  "changes": [
    {
      "id": "record-123",
      "entityType": "Task",
      "operation": "CREATE",  // ou UPDATE, DELETE
      "data": { ... },
      "clientTimestamp": "2025-12-13T10:25:00Z"
    }
  ],
  "deviceId": "mobile-device-001"
}
```

**Backend processa:**
1. Valida cada mudança
2. Aplica lógica de negócio
3. Verifica conflitos (mesmo registro foi editado no servidor?)
4. Marca como sincronizado ou gera conflito
5. Retorna:
   ```json
   {
     "success": true,
     "synced": ["record-123", ...],
     "conflicts": [
       {
         "recordId": "record-456",
         "serverVersion": { ... },
         "clientVersion": { ... }
       }
     ],
     "timestamp": "2025-12-13T10:31:00Z"
   }
   ```

### 4️⃣ **Sincronização (Pull)** — Receber dados atualizados

```
GET /api/v1/sync/pull
?lastSyncTimestamp=2025-12-13T10:00:00Z
&deviceId=mobile-device-001
```

**Backend retorna:**
```json
{
  "updates": [
    {
      "id": "record-789",
      "entityType": "Task",
      "operation": "UPDATE",
      "data": { ... },
      "serverTimestamp": "2025-12-13T10:15:00Z"
    }
  ],
  "deletions": ["record-999"],
  "newTimestamp": "2025-12-13T10:31:00Z"
}
```

**Mobile:**
1. Aplica atualizações localmente (SQLite)
2. Remove registros deletados
3. Atualiza estado Redux
4. Notifica UI

### 5️⃣ **Resolução de Conflitos**

Se um registro foi editado **tanto no mobile quanto no servidor**:

**Estratégia: Last-Write-Wins (LWW) com notificação**
```
Servidor tem timestamp mais recente
         ↓
Mobile sobrescreve local com versão do servidor
         ↓
App notifica usuário:
"Seu registro foi sobrescrito por uma alteração mais recente"
         ↓
Usuário pode visualizar ambas as versões (histórico)
```

Alternativa: **User-Selects** (mostrar diálogo ao usuário)
```
Aparece modal:
"Conflito detectado em 'Task #123'"
[Server Version] [Your Version] [Compare]
```

---

## 📊 Estrutura de Dados (SQLite Schema)

```sql
-- Tabela de dados sincronizável
CREATE TABLE IF NOT EXISTS SyncedEntity (
  id TEXT PRIMARY KEY,
  entityType TEXT NOT NULL,
  data JSONB,
  serverVersion BIGINT DEFAULT 0,
  clientVersion BIGINT DEFAULT 0,
  isDeleted BOOLEAN DEFAULT FALSE,
  lastModifiedLocal TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastModifiedServer TIMESTAMP,
  conflicted BOOLEAN DEFAULT FALSE
);

-- Fila de sincronização (operações pendentes)
CREATE TABLE IF NOT EXISTS SyncQueue (
  id TEXT PRIMARY KEY,
  entityId TEXT NOT NULL,
  operation TEXT NOT NULL, -- CREATE, UPDATE, DELETE
  data JSONB,
  clientTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  synced BOOLEAN DEFAULT FALSE,
  error TEXT,
  retries INT DEFAULT 0
);

-- Histórico de sincronizações
CREATE TABLE IF NOT EXISTS SyncHistory (
  id TEXT PRIMARY KEY,
  deviceId TEXT,
  syncType TEXT, -- PUSH, PULL
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  itemsCount INT,
  duration BIGINT, -- ms
  status TEXT -- SUCCESS, FAILED, PARTIAL
);
```

---

## 🔐 Segurança na Sincronização

### Autenticação
- **Token JWT** no header de cada requisição de sync:
  ```
  Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
  ```

### Validação
- Cada dispositivo tem um **deviceId** único
- Backend rastreia **qual dispositivo** enviou qual mudança
- Impede que um dispositivo edite dados de outro

### Criptografia (Produção)
- HTTPS/TLS para todas as requisições
- Dados sensíveis criptografados antes de armazenar no SQLite

---

## 🚀 API de Atualizações (Mobile App Updates)

### Verificar Versão

```
GET /api/v1/updates/mobile
?currentVersion=0.1.0
&platform=android  // ou ios
```

**Resposta:**
```json
{
  "updateAvailable": true,
  "forceUpdate": false,
  "latestVersion": "0.2.0",
  "downloadUrl": "https://company-s3/presetcto-0.2.0.apk",
  "releaseNotes": "Fixes offline sync bugs, adds new tasks feature",
  "minSdkVersion": 26,
  "releaseDate": "2025-12-10T00:00:00Z"
}
```

### Endpoints Adicionais

```
POST /api/v1/updates/mobile/feedback
- Usuário relata erro ou solicita feature

GET /api/v1/updates/mobile/changelog
- Lista completa de atualizações

POST /api/v1/updates/mobile/telemetry
- Envia métricas de uso, crashes, performance
```

---

## 🔄 Cenários de Sincronização

### Cenário 1: Usuário Offline → Online (Sem Conflitos)

```
[OFFLINE] Cria Task "Inspecionar válvula X"
    ↓
SQLite salva + SyncQueue adiciona operação
    ↓
UI mostra Task (não sincronizada)
    ↓
[ONLINE] App detecta conexão
    ↓
POST /sync/push com novo Task
    ↓
Backend valida, salva no PostgreSQL
    ↓
Resposta: { synced: ["task-123"] }
    ↓
Mobile marca como sincronizado ✅
```

### Cenário 2: Múltiplos Dispositivos (Técnicos diferentes)

```
Técnico A (Mobile A):
  → Edita Task #1 enquanto offline
  → Fica online, sincroniza

Técnico B (Mobile B):
  → Já tinha Task #1 sincronizado
  → Recebe notificação RabbitMQ (atualização de A)
  → Puxa dados atualizados em próxima sync
  → SQLite local atualiza automaticamente
```

### Cenário 3: Conflito (Mesma Tarefa, 2 Edições)

```
[Técnico A] Edita Task: status = "completed"
[Técnico B] Edita Task: status = "pending"  (mais recente)

A: Sincroniza primeiro → OK, servidor tem "completed"
B: Sincroniza segundo → CONFLITO!

Backend retorna:
{
  "conflicts": [{
    "recordId": "task-1",
    "clientVersion": { status: "pending", ts: 10:32 },
    "serverVersion": { status: "completed", ts: 10:31 }
  }]
}

B: App mostra modal "versão do servidor é mais recente"
   Usuário escolhe: sobrescrever com servidor
   SQLite local sincroniza
```

---

## 📈 Performance & Otimizações

### Sincronização Inteligente
- **Delta sync**: apenas registros modificados desde última sincronização
- **Batching**: agrupa múltiplas operações em 1 request
- **Throttling**: evita sincronizar a cada mudança (agrupa a cada 30s)
- **Compressão**: dados comprimidos em requisições grandes

### SQLite
- **Índices** em campos de busca frequente
- **Pagination** para listas grandes
- **Cleanup**: apaga registros deletados após 30 dias

### Backend
- **Cache Redis** para dados frequentemente acessados
- **Async processing** via RabbitMQ para operações pesadas
- **Database indexes** em colunas de sync

---

## 🛠️ Implementação no Mobile

### SyncService.ts (Exemplo React Native)

```typescript
class SyncService {
  async syncWithServer() {
    // 1. Verificar conexão
    if (!this.isOnline()) return;

    // 2. Push: enviar mudanças locais
    const pushResult = await this.pushChanges();
    
    // 3. Pull: receber atualizações
    const pullResult = await this.pullUpdates();
    
    // 4. Aplicar localmente
    await this.applyUpdates(pullResult);
    
    // 5. Notificar Redux
    this.store.dispatch(setSyncedAt(new Date()));
  }

  async pushChanges() {
    const queue = await this.db.all('SELECT * FROM SyncQueue WHERE synced = 0');
    
    const response = await fetch('/api/v1/sync/push', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ changes: queue })
    });

    // Processar conflitos se existirem
    if (response.conflicts.length > 0) {
      this.handleConflicts(response.conflicts);
    }

    // Marcar como sincronizado
    await this.db.update('SyncQueue', { synced: 1 });
  }

  async pullUpdates() {
    const lastSync = await this.getLastSyncTime();
    
    const response = await fetch(
      `/api/v1/sync/pull?lastSyncTimestamp=${lastSync}`,
      { headers: { 'Authorization': `Bearer ${this.token}` } }
    );

    return response.json();
  }
}
```

---

## ✅ Checklist de Implementação

- [ ] SQLite schema + migrations
- [ ] Redux actions para sync
- [ ] SyncService com push/pull
- [ ] Detecção de conexão (NetInfo)
- [ ] Fila de sincronização
- [ ] Resolução de conflitos
- [ ] Testes offline → online
- [ ] Backend `/sync/push` endpoint
- [ ] Backend `/sync/pull` endpoint
- [ ] RabbitMQ eventos de atualização
- [ ] `/updates/mobile` API
- [ ] Telemetria e logging
- [ ] Documentação de API (OpenAPI/Swagger)

---

## 📚 Referências

- [React Native AsyncStorage vs SQLite](https://docs.expo.dev/versions/latest/sdk/async-storage/)
- [WatermelonDB - Offline-first DB para React Native](https://watermelondb.org/)
- [Conflict-free replicated data types (CRDTs)](https://crdt.tech/)
- [Exponential backoff para retry](https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/)
