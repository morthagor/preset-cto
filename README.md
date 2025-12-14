# Preset CTO — Sistema de Gestão Privado

Sistema de gestão completo com backend em **Spring Boot 4.0** (Java 21) e app mobile em **React Native** (Android/iOS offline-first).

## 📋 Stack

### Backend
- **Java 21** + **Spring Boot 4.0.0**
- **PostgreSQL 16** (Alpine) — banco de dados
- **Redis 7** — cache e sessões
- **RabbitMQ** — fila de mensagens e eventos
- **Maven** — gerenciador de dependências

### Mobile
- **React Native 0.72** — app multiplataforma
- **Android** + **iOS**
- **Offline-first** — funciona sem conexão e sincroniza quando online
- **Instalação privada** — distribuição manual aos técnicos

### Infraestrutura
- **Docker** + **Docker Compose** — containers (postgres, redis, rabbitmq)
- **Rede Docker interna** — comunicação segura entre serviços
- **GitHub** — repositório (será configurado)

---

## 🚀 Quick Start

### Pré-requisitos
- **Docker** + **Docker Compose**
- **JDK 21** (ou instale via Maven em `~/.jdk`)
- **Node.js 18+** e **npm**

### 1. Inicie os serviços Docker

```bash
cd cto
docker-compose up -d
```

Isso iniciará:
- PostgreSQL 16 na porta `5432`
- Redis 7 na porta `6379`
- RabbitMQ na porta `5672` (Management UI em `15672`)

Verifique status:

```bash
docker-compose ps
```

### 2. Configure variáveis de ambiente

```bash
cp .env.example .env
```

Edite `.env` com suas configurações locais.

### 3. Execute o backend

```bash
cd backend
mvn clean spring-boot:run
```

O servidor ficará disponível em `http://localhost:8080`

### 4. Execute o app mobile (desenvolvimento)

```bash
cd mobile
npm install
npm run android    # para Android
# ou
npm run ios        # para iOS (macOS + Xcode)
```

---

## 📁 Estrutura do Projeto

```
cto/
├── backend/                  # Spring Boot API
│   ├── src/main/java
│   ├── src/main/resources
│   ├── src/test
│   ├── pom.xml
│   └── README.md
├── mobile/                   # React Native app
│   ├── app/                  # Código React Native
│   ├── android/
│   ├── ios/
│   ├── src/
│   ├── package.json
│   └── README.md
├── docker-compose.yml        # Serviços (postgres, redis, rabbitmq)
├── .env.example              # Variáveis de ambiente (template)
├── ARCHITECTURE.md           # Visão da arquitetura
├── SYNC.md                   # Estratégia de sincronização offline-first
└── README.md                 # Este arquivo
```

---

## 🔄 Sincronização Offline-First (Mobile)

O app mobile funciona **totalmente offline**:
- Dados são armazenados localmente (SQLite ou AsyncStorage)
- Quando online, o app sincroniza com o backend
- Conflitos de sincronização são resolvidos automáticamente

Veja [SYNC.md](./SYNC.md) para detalhes técnicos.

---

## 📱 Distribuição do App Mobile

O app será distribuído manualmente aos técnicos:
- **Android**: `.apk` ou `.aab` assinado
- **iOS**: via TestFlight ou installation profile privado
- **Atualizações**: via API `/api/v1/updates/mobile` (veja [SYNC.md](./SYNC.md))

---

## 🐳 Docker Compose — Serviços Locais

Arquivos gerenciados:
- **PostgreSQL 16** — volume persistente `postgres_data`
- **Redis 7** — porta `6379`
- **RabbitMQ** — porta `5672` (admin: `5672`, Management: `15672`)

Comando úteis:

```bash
# Parar serviços
docker-compose down

# Parar e remover volumes (limpar tudo)
docker-compose down -v

# Ver logs
docker-compose logs -f rabbitmq

# Acessar PostgreSQL
docker-compose exec postgres psql -U presetcto -d presetcto_db
```

---

## 📚 Documentação

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Camadas, componentes e fluxos
- [SYNC.md](./SYNC.md) — Estratégia offline-first e sincronização
- [backend/README.md](./backend/README.md) — Setup e comandos do backend
- [mobile/README.md](./mobile/README.md) — Setup e build do mobile

---

## 🔐 Segurança

- **Spring Security** (backend) — autenticação/autorização
- **JWT tokens** — para mobile
- **HTTPS** (produção) — comunicação criptografada
- **Validação de versão** — o app mobile valida versão mínima

---

## 🛠️ Desenvolvimento

### Seu Workflow Recomendado

1. **Criar branch de feature**:
   ```bash
   git checkout -b feature/seu-feature
   ```

2. **Backend**:
   - Criar endpoint REST em `src/main/java/com/presetcto/controllers`
   - Testes em `src/test/java`
   - Mensagens RabbitMQ quando necessário

3. **Mobile**:
   - Criar tela em `app/screens`
   - Sincronização local em `app/services/SyncService`
   - Testes com Jest

4. **Teste localmente** (docker + backend + mobile)

5. **Commit e push** para sua branch

6. **Pull Request** quando pronto

---

## 📞 Contato & Suporte

Para dúvidas sobre a arquitetura, veja [ARCHITECTURE.md](./ARCHITECTURE.md).

---

**Projeto privado — Não distribuir fora da organização**
