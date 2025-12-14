# Changelog — Projeto Preset CTO

Todas as mudanças que impactam **ambas as camadas** (Backend + Mobile) são documentadas aqui.

Para mudanças específicas de cada camada, veja:
- [backend/CHANGELOG.md](./backend/CHANGELOG.md) — Mudanças no Backend (Java/Spring Boot)
- [mobile/CHANGELOG.md](./mobile/CHANGELOG.md) — Mudanças no Mobile (React Native)

O formato segue [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

## [1.0.2] — 2025-12-13

### Added
- [2025-12-13] **Web UI** com suporte HTML/CSS/JS para testes rápidos
  - Tela de Login em public/index.html com campos de usuário e senha
  - Tela de Dashboard em public/dashboard.html com welcome message
  - Funcionalidade de mock offline (sem backend necessário)
  - LocalStorage para persistência de sessão
  - Python HTTP server (porta 8081) para servir assets
- [2025-12-13] **Autenticação completa** Backend + Mobile + Web
  - Endpoints REST v2: POST /api/v2/auth/login, GET /api/v2/auth/me, POST /api/v2/auth/logout
  - Endpoint de health: GET /api/v2/auth/health
  - JWT token com 24 horas de expiração
  - Mock credentials: morthagor / wp1234wp
  - Suporte a login offline com fallback automático
- [2025-12-13] **Screens melhoradas** com Light Theme
  - LoginScreen com validação de campos e cores #F5F5F5 / #1976D2
  - DashboardScreen com saudação personalizada e informações do usuário
  - RootNavigator com verificação de autenticação
  - AuthService.ts com smart fallback para offline
- [2025-12-13] **Guias de testes** completos preparados
  - MOBILE_TESTING.md com 150+ linhas de instruções detalhadas
  - MOBILE_QUICK_TEST.txt com opções rápidas de teste
  - Suporte para Web (HTML), Android e iOS

### Changed
- [2025-12-13] Removed expo-router em favor de navegação customizada (RootNavigator.tsx)
- [2025-12-13] Package.json main entry: expo-router/entry → index.js
- [2025-12-13] Babel config com suporte completo a JSX e React Native Web
- [2025-12-13] App.tsx simplificado com NavigationContainer único

### Fixed
- [2025-12-13] Erro de renderização em branco no React Native Web
- [2025-12-13] Missing assets: favicon.png e adaptive-icon.png criados
- [2025-12-13] Duplicado NavigationContainer em RootNavigator
- [2025-12-13] Dependência faltante: react-native-toast-message instalada
- [2025-12-13] Port conflict (8081): Expo reconfigurado

### Security
- [2025-12-13] JWT tokens para autenticação mobile e web
- [2025-12-13] Validação de device ID para cada móvel
- [2025-12-13] CORS configurado (frontend + mobile)
- [2025-12-13] Spring Security com stateless sessions
- [2025-12-13] Sensitive data não persiste em localStorage (apenas token)

## [0.1.0] — 2025-12-13

### Added
- [2025-12-13] Projeto Preset CTO inicializado com arquitetura de 2 camadas
  - Backend: Spring Boot 4.0.0 + Java 21 + PostgreSQL 16 + Redis 7 + RabbitMQ
  - Mobile: React Native 0.72 + TypeScript + Redux + Offline-first sync
- [2025-12-13] Docker Compose com serviços integrados (postgres, redis, rabbitmq)
- [2025-12-13] Estratégia de sincronização offline-first documentada (SYNC.md)
- [2025-12-13] Autenticação com JWT (token-based)
- [2025-12-13] API de sincronização `/api/v1/sync/push` e `/api/v1/sync/pull`
- [2025-12-13] API de atualização mobile `/api/v1/updates/mobile`
- [2025-12-13] Rede Docker interna para comunicação segura entre serviços

### Changed
- [2025-12-13] Tela de login ajustada para "Código do Funcionário" + "Senha"

### Security
- [2025-12-13] JWT tokens para autenticação mobile
- [2025-12-13] Validação de device ID para cada móvel
- [2025-12-13] CORS configurado (frontend + mobile)

---

## [0.1.0] — 2025-12-13

### Initial Release

Primeira versão com setup completo:

**Estrutura de Projeto**
- ✅ Backend (Java 21 + Spring Boot 4.0)
- ✅ Mobile (React Native 0.72 + TypeScript)
- ✅ Docker Compose (postgres, redis, rabbitmq)
- ✅ Documentação (ARCHITECTURE.md, SYNC.md, README.md)

**Backend**
- Spring Boot starter com Web, JPA, Security
- PostgreSQL JDBC driver
- RabbitMQ AMQP client
- Redis client
- OpenAPI/Swagger suporte
- JUnit + Spring Security test

**Mobile**
- React Native + TypeScript
- Redux Toolkit (state management)
- React Navigation (tabs + stack)
- Axios (HTTP client)
- WatermelonDB (offline database)
- NetInfo (network detection)
- AsyncStorage (persistent storage)

**Features**
- Autenticação com JWT
- Sincronização offline-first
- Detecção de conexão automática
- Fila de mudanças locais
- Resolução de conflitos

---

## Guia de Mudanças

### Como Adicionar uma Nova Mudança?

1. **Se afeta ambas as camadas** (Backend + Mobile):
   - Adicione aqui no arquivo raiz `CHANGELOG.md`
   - Seção `## [Unreleased]`
   - Use formato: `[YYYY-MM-DD] Descrição`

2. **Se é específica do Backend**:
   - Adicione em `backend/CHANGELOG.md`
   - Exemplo: schema novo, endpoint novo, dependency update

3. **Se é específica do Mobile**:
   - Adicione em `mobile/CHANGELOG.md`
   - Exemplo: nova screen, novo hook Redux, atualização de dependência

### Tipos de Mudanças

- **Added** — Novas funcionalidades
- **Changed** — Mudanças em funcionalidade existente
- **Deprecated** — Funcionalidade que será removida
- **Removed** — Funcionalidade removida
- **Fixed** — Correções de bugs
- **Security** — Alterações de segurança

### Exemplo de Entrada

```markdown
### Added
- [2025-12-15] Endpoint POST /api/v1/tasks criado
  - Backend: Novo controller TaskController com validação
  - Mobile: Integração com TaskListScreen

### Fixed
- [2025-12-15] Erro ao sincronizar com task vazio
  - Backend: Validação adicionada
  - Mobile: Tratamento de erro melhorado
```

---

## Release Notes

Para gerar release notes, atualize a seção `## [Unreleased]` para `## [X.Y.Z] — YYYY-MM-DD` e crie novo `## [Unreleased]`.

**Exemplo:**

```markdown
## [Unreleased]

### Added
- [2025-12-20] Nova funcionalidade XYZ

## [0.2.0] — 2025-12-20

### Added
- [2025-12-15] Endpoint POST /api/v1/tasks
- [2025-12-18] Screen de detalhes da tarefa
```

---

**Última atualização:** 2025-12-13
