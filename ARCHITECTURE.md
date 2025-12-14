# Arquitetura — Preset CTO

## 🏗️ Visão em Camadas

### Camada 1 — Backend (APIs / Endpoints)
- **Tech Stack**: Spring Boot 4.0.0 (Java 21), PostgreSQL 16, Redis 7, RabbitMQ
- **Responsabilidades**:
  - Autenticação e autorização (Spring Security + JWT)
  - Gestão de recursos e endpoints REST
  - Sincronização de dados com mobile (offline-first)
  - Fila de eventos (RabbitMQ)
  - Caching (Redis)
  - API de atualização para o app mobile
- **Portas**: 8080 (HTTP), 5432 (PostgreSQL), 6379 (Redis), 5672 (RabbitMQ)

### Camada 2 — Mobile App
- **Tech Stack**: React Native 0.72 (Android + iOS)
- **Responsabilidades**:
  - Interface para técnicos
  - Offline-first — funciona sem internet
  - Sincronização automática quando online
  - SQLite para armazenamento local
  - Atualização automática via API
- **Plataformas**: Android (APK/AAB), iOS (TestFlight/profile privado)

### Infraestrutura
- **Docker + Docker Compose**: Serviços locais (postgres, redis, rabbitmq)
- **Rede interna**: Todos os containers comunicam-se seguramente
- **GitHub**: Repositório (Git + branches)

---

## 🗂️ Estrutura do repositório:

- `backend/` — Spring Boot service (Maven)
  - `src/main/java` — código-fonte
  - `src/main/resources` — configuração
  - `pom.xml` — dependências e build

- `mobile/` — React Native app
  - `app/` — código React Native
  - `android/`, `ios/` — projetos nativos
  - `package.json`

---

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────────┐
│                    Mobile App (React Native)                    │
│              (SQLite local + offline-first sync)                │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                   REST API (HTTPS)
                   /api/v1/sync/*
                   /api/v1/updates/*
                           │
┌──────────────────────────▼──────────────────────────────────────┐
│                   Spring Boot API (8080)                        │
│         (Authentication, Business Logic, Sync Service)          │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────┬───────┴───────┬──────────┐
        │          │               │          │
        ▼          ▼               ▼          ▼
   PostgreSQL   Redis        RabbitMQ    External
   (5432)      (6379)         (5672)      APIs
   
   ├─ Tables   ├─ Cache      ├─ Events   └─ Webhooks
   ├─ Users    ├─ Sessions   └─ Queues     Integrations
   ├─ Tasks    └─ Tokens
   └─ Audit
```

---

## 🐳 Docker Compose — Serviços Locais

- **PostgreSQL 16 Alpine** — banco de dados principal
- **Redis 7** — cache e sessões
- **RabbitMQ** — fila de mensagens e eventos
- **Rede interna** (`presetcto_network`) — comunicação segura

Volumes persistentes:
- `postgres_data` — dados do banco
- `redis_data` — snapshots Redis
- `rabbitmq_data` — dados RabbitMQ

---

## 🔐 Segurança

### Backend
- **Spring Security** + **JWT** para autenticação
- **HTTPS/TLS** (produção)
- **Role-based access control (RBAC)**
- **SQL injection prevention** via JPA/Hibernate
- **CORS** configurado para mobile

### Mobile
- **Token JWT** armazenado seguramente (Keychain/Keystore)
- **Pinning de certificado** (produção)
- **Offline data encryption** (SQLite)
- **Device fingerprint** para validação

---

## 📱 Sincronização Offline-First

Veja [SYNC.md](./SYNC.md) para detalhes técnicos completos:
- Arquitetura de dados (SQLite schema)
- Fluxos de push/pull
- Resolução de conflitos
- API de atualização (`/api/v1/updates/mobile`)
- Exemplos de código (React Native)

---

## 🎯 Próximos Passos Recomendados

1. **Configurar Git e branches**
   ```bash
   git init
   git remote add origin https://github.com/...
   git checkout -b feature/initial-setup
   ```

2. **Backend** — Ajustar `pom.xml` com dependências:
   - Spring Data JPA
   - PostgreSQL JDBC driver
   - Spring Security + JWT
   - OpenAPI/Swagger
   - RabbitMQ client (AMQP)
   - Lombok (opcional)

3. **Mobile** — Inicializar projeto React Native:
   ```bash
   cd mobile
   npx react-native init PresetCTO
   # ou com Expo
   # expo init preset-cto
   ```

4. **Database** — Criar migrations (Flyway/Liquibase)
   - Users, Tasks, Audit tables

5. **API Docs** — Gerar Swagger/OpenAPI
   - Documentar endpoints `/sync/*`
   - Documentar endpoints `/updates/mobile`

6. **CI/CD** — Configurar GitHub Actions
   - Build backend (JDK 21)
   - Build mobile (Android/iOS)
   - Testes automatizados
   - Deploy (opcional)
