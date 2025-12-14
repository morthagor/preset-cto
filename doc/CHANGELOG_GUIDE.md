# 📋 Guia de Changelogs — Preset CTO

Documentação sobre como usar e atualizar os Changelogs do projeto.

---

## 📁 Estrutura de Changelogs

O projeto possui **3 arquivos de changelog**:

### 1. **CHANGELOG.md (Raiz)**
- **Localização**: `/cto/CHANGELOG.md`
- **Escopo**: Mudanças que impactam **ambas as camadas** (Backend + Mobile)
- **Exemplos**:
  - Atualização de arquitetura geral
  - Mudanças na API que afetam backend e mobile
  - Alterações em Docker Compose
  - Mudanças no protocolo de sincronização

### 2. **backend/CHANGELOG.md**
- **Localização**: `/cto/backend/CHANGELOG.md`
- **Escopo**: Mudanças **específicas do Backend** (Java/Spring Boot)
- **Exemplos**:
  - Novo controller (TaskController)
  - Atualização de dependência Maven
  - Mudança no schema do banco
  - Novo serviço (TaskService)
  - Configuração Spring Security

### 3. **mobile/CHANGELOG.md**
- **Localização**: `/cto/mobile/CHANGELOG.md`
- **Escopo**: Mudanças **específicas do Mobile** (React Native)
- **Exemplos**:
  - Nova screen (TaskDetailScreen)
  - Novo Redux slice
  - Atualização de dependência npm
  - Mudança em componente
  - Novo ícone ou tema

---

## 📝 Formato e Padrão

Todos os changelogs seguem o padrão [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [Unreleased]

### Added
- [YYYY-MM-DD] Descrição da mudança
  - Detalhes adicionais

### Changed
- [YYYY-MM-DD] Descrição da mudança

### Fixed
- [YYYY-MM-DD] Descrição do bug corrigido

### Removed
- [YYYY-MM-DD] Funcionalidade removida

### Deprecated
- [YYYY-MM-DD] Funcionalidade que será removida

### Security
- [YYYY-MM-DD] Correção de segurança
```

---

## 📅 Categorias de Mudanças

### ✨ Added (Adicionado)
**Quando**: Nova funcionalidade ou feature
**Exemplo**:
```markdown
### Added
- [2025-12-15] Endpoint POST /api/v1/tasks
  - Backend: Novo TaskController.createTask()
  - Validação de entrada com DTO
  - RabbitMQ event publishing
```

### 🔄 Changed (Modificado)
**Quando**: Alteração em funcionalidade existente
**Exemplo**:
```markdown
### Changed
- [2025-12-15] LoginScreen refatorada
  - Campo "Email" renomeado para "Código do Funcionário"
  - UI melhorada com melhor visual
  - Suporte a mock API para testes
```

### 🐛 Fixed (Corrigido)
**Quando**: Correção de bug
**Exemplo**:
```markdown
### Fixed
- [2025-12-15] Erro ao sincronizar com banco vazio
  - Backend: Validação adicionada antes de insert
  - Mobile: Tratamento de erro melhorado
```

### ❌ Removed (Removido)
**Quando**: Funcionalidade deletada
**Exemplo**:
```markdown
### Removed
- [2025-12-15] Endpoint obsoleto DELETE /api/v1/legacy/tasks
  - Migrar para POST /api/v1/tasks/{id}/delete
```

### ⚠️ Deprecated (Deprecado)
**Quando**: Funcionalidade que será removida em breve
**Exemplo**:
```markdown
### Deprecated
- [2025-12-15] Método AuthService.getToken() será removido
  - Use AuthService.generateJWT() no lugar
  - Será removido em v1.0.0
```

### 🔒 Security (Segurança)
**Quando**: Correção de vulnerabilidade ou mudança de segurança
**Exemplo**:
```markdown
### Security
- [2025-12-15] Atualizado jjwt para 0.12.3
  - Corrige vulnerabilidade CVE-2023-1234
  - JWT tokens agora com algoritmo HS512
```

---

## 🔄 Workflow de Atualização

### Ao fazer uma mudança:

1. **Identifique o escopo**:
   - Afeta apenas Backend? → `backend/CHANGELOG.md`
   - Afeta apenas Mobile? → `mobile/CHANGELOG.md`
   - Afeta ambas? → `CHANGELOG.md` (raiz) **E** os específicos

2. **Adicione entrada no `[Unreleased]`**:
   ```markdown
   ### Added
   - [2025-12-15] Descrição da mudança
     - Detalhes
   ```

3. **Inclua data (YYYY-MM-DD)**

4. **Seja descritivo**:
   - O quê? (Que mudança foi feita)
   - Por quê? (Motivo da mudança)
   - Como? (Detalhes técnicos)

---

## 📦 Exemplo: Adicionando um novo endpoint

### Cenário: Criar TaskController no backend

**Arquivos afetados**:
- Backend: TaskController, TaskService, Task entity
- Mobile: TaskListScreen (integração com API)
- Comunicação: JSON payload, autenticação, sincronização

**O que fazer**:

1. **backend/CHANGELOG.md**:
```markdown
### Added
- [2025-12-15] Novo controller POST /api/v1/tasks criado
  - TaskController.createTask(CreateTaskRequest)
  - Validação com Bean Validation
  - RabbitMQ event TaskCreatedEvent publicado
  - Testes: TaskControllerTest.testCreateTask()
```

2. **mobile/CHANGELOG.md**:
```markdown
### Changed
- [2025-12-15] TaskListScreen integrada com API real
  - ApiClient.createTask() agora chama backend
  - SyncService adaptado para task creation
  - Toast notification ao criar tarefa

### Added
- [2025-12-15] CreateTaskScreen: nova screen para criar tarefas
  - Implementado em src/screens/CreateTaskScreen.tsx
  - Form com validação local
  - Sincronização offline com SyncQueue
```

3. **CHANGELOG.md** (raiz):
```markdown
### Added
- [2025-12-15] Feature completa: Criar Tarefas
  - Backend: Endpoint POST /api/v1/tasks
  - Mobile: Screen de criação + integração com API
  - Sincronização offline-first suportada
  - Publicação de eventos RabbitMQ
```

---

## 🔖 Versionamento

Quando preparar uma release, atualize a versão:

```markdown
## [Unreleased]

### Added
- [2025-12-20] Nova feature X

## [0.2.0] — 2025-12-20

### Added
- [2025-12-15] Feature Y
- [2025-12-18] Feature Z

### Fixed
- [2025-12-19] Bug na sincronização

## [0.1.0] — 2025-12-13

### Initial Release
...
```

**Padrão de versioning**: [Semantic Versioning](https://semver.org/)
- **MAJOR** (X.0.0): breaking changes
- **MINOR** (0.Y.0): novas features (backwards compatible)
- **PATCH** (0.0.Z): bugfixes

---

## 🔍 Dicas Importantes

### ✅ Faça
- ✅ Adicione entradas **regularmente** (não deixe pra final)
- ✅ Use **datas consistentes** (YYYY-MM-DD)
- ✅ Seja **descritivo e técnico**
- ✅ Inclua **nomes de arquivos** e **classes** quando relevante
- ✅ Mencione **tickets/issues** se houver (ex: `#123`)
- ✅ Atualize **todos os 3 changelogs** se mudança afeta múltiplas camadas

### ❌ Evite
- ❌ Descrições genéricas ("Fixed bug" sem contexto)
- ❌ Mudanças sem data
- ❌ Esquecer de atualizar quando fizer commits
- ❌ Misturar múltiplas features em uma única entrada
- ❌ Linguagem informal ou gírias

---

## 📊 Exemplo Completo

### Commit que afeta ambas as camadas

**Mensagem do commit**:
```
feat: Adicionar feature completa de tarefas com sincronização

- Backend: POST /api/v1/tasks com validação
- Mobile: CreateTaskScreen com offline support
- Sincronização automática ao conectar
```

**backend/CHANGELOG.md**:
```markdown
### Added
- [2025-12-15] POST /api/v1/tasks endpoint
  - TaskController.createTask(CreateTaskRequest)
  - Validação com Jakarta Bean Validation
  - RabbitMQ TaskCreatedEvent publicado
```

**mobile/CHANGELOG.md**:
```markdown
### Added
- [2025-12-15] CreateTaskScreen implementada
  - Form com validação local
  - SyncService integrado para offline
  - Arquivo: src/screens/CreateTaskScreen.tsx

### Changed
- [2025-12-15] ApiClient.createTask() agora chama POST /api/v1/tasks
  - Integração com backend real
```

**CHANGELOG.md** (raiz):
```markdown
### Added
- [2025-12-15] Feature completa: Criar e sincronizar tarefas
  - Backend: Novo endpoint com RabbitMQ
  - Mobile: Nova screen com offline support
  - Sincronização automática ao conectar
```

---

## 📚 Referências

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Última atualização:** 2025-12-13
