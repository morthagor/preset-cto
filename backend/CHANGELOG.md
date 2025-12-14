# Changelog — Backend (Java 21 + Spring Boot 4.0.0)

Histórico de mudanças específicas do Backend.

Para mudanças que impactam ambas as camadas, veja [../CHANGELOG.md](../CHANGELOG.md).

---

## [Unreleased]

## [1.0.2] — 2025-12-13

### Added
- [2025-12-13] **API v2 endpoints** para autenticação completa
  - POST /api/v2/auth/login (email/password → JWT token)
  - GET /api/v2/auth/me (recupera dados do usuário autenticado)
  - POST /api/v2/auth/logout (invalidação de token)
  - GET /api/v2/auth/health (healthcheck sem autenticação)
- [2025-12-13] **JwtTokenProvider** completo
  - Geração de JWT com 24 horas expiração
  - Validação de token
  - Extração de claims (email, roles)
  - Suporte a bearer token no header Authorization
- [2025-12-13] **Spring Security Configuration**
  - Stateless sessions (sem cookies)
  - Filtro de JWT customizado
  - CORS habilitado
  - Public endpoints: /api/v2/auth/login, /api/v2/auth/health
  - Protected endpoints: /api/v2/auth/me, /api/v2/auth/logout
- [2025-12-13] **User entity** com repositório JPA
  - Campos: id, email, password, role, createdAt, updatedAt
  - Métodos de validação: password, role check
  - Repository para buscar by email
- [2025-12-13] **AuthService** com lógica de negócio
  - login(email, password) → JWT token
  - validateToken(token) → UserDetails
  - getCurrentUser() → User data
  - logout() → token invalidation
- [2025-12-13] **DTOs** para requisição/resposta
  - LoginRequest: { email, password }
  - LoginResponse: { token, user: { email, role } }
  - MeResponse: { email, role, createdAt }

### Changed
- [2025-12-13] Java version configuration: Maven compiler plugin usando Java 21
- [2025-12-13] Application.properties com database e JWT configuration

### Fixed
- [2025-12-13] Spring Security default behavior (auth required)
- [2025-12-13] JWT claim extraction error handling
- [2025-12-13] CORS header configuration

### Security
- [2025-12-13] JWT token validation em todos endpoints protegidos
- [2025-12-13] Password hashing com Spring Security encoder
- [2025-12-13] Bearer token extraction from Authorization header
- [2025-12-13] Stateless sessions (sem session hijacking risk)
- [2025-12-13] Token expiration: 24 hours (JWT_EXPIRATION)

## [0.1.0] — 2025-12-13

### Added
- [2025-12-13] Projeto Spring Boot 4.0.0 inicializado com JDK 21
- [2025-12-13] Dependências principais:
  - Spring Boot Starter Web
  - Spring Data JPA + PostgreSQL JDBC
  - Spring Security + JWT (jjwt 0.12.3)
  - Spring AMQP (RabbitMQ)
  - Spring Data Redis
  - SpringDoc OpenAPI 2.1.0 (Swagger/API Docs)
- [2025-12-13] Configuração Maven com Java 21 (maven-compiler-plugin 3.11.0)
- [2025-12-13] Spring Boot Maven Plugin para build e run
- [2025-12-13] pom.xml estruturado com dependencyManagement

### Configuration
- [2025-12-13] java.version = 21
- [2025-12-13] maven.compiler.source = 21
- [2025-12-13] maven.compiler.target = 21
- [2025-12-13] Spring Boot parent version = 4.0.0

### Dependencies
- [2025-12-13] org.springframework.boot:spring-boot-starter-web:4.0.0
- [2025-12-13] org.springframework.boot:spring-boot-starter-data-jpa:4.0.0
- [2025-12-13] org.postgresql:postgresql (latest runtime)
- [2025-12-13] org.springframework.boot:spring-boot-starter-security:4.0.0
- [2025-12-13] io.jsonwebtoken:jjwt-api:0.12.3
- [2025-12-13] io.jsonwebtoken:jjwt-impl:0.12.3 (runtime)
- [2025-12-13] io.jsonwebtoken:jjwt-jackson:0.12.3 (runtime)
- [2025-12-13] org.springframework.boot:spring-boot-starter-amqp:4.0.0
- [2025-12-13] org.springframework.boot:spring-boot-starter-data-redis:4.0.0
- [2025-12-13] org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0
- [2025-12-13] org.projectlombok:lombok (optional)
- [2025-12-13] org.springframework.boot:spring-boot-starter-test (test scope)
- [2025-12-13] org.springframework.security:spring-security-test (test scope)

---

## Próximas Mudanças Esperadas

### Controllers
- [ ] AuthController (POST /auth/login, GET /auth/profile)
- [ ] TaskController (CRUD /api/v1/tasks)
- [ ] SyncController (POST /sync/push, GET /sync/pull)
- [ ] UpdateController (GET /updates/mobile)

### Services
- [ ] AuthService (JWT generation, validation)
- [ ] TaskService (business logic)
- [ ] SyncService (conflict resolution, reconciliation)

### Database
- [ ] User entity + repository
- [ ] Task entity + repository
- [ ] Audit entity (track changes)
- [ ] Flyway/Liquibase migrations

### Security
- [ ] JWT token filter
- [ ] Role-based access control (RBAC)
- [ ] Password hashing (BCrypt)
- [ ] CORS configuration

### RabbitMQ
- [ ] Event publishing (task created, updated, deleted)
- [ ] Queue configuration
- [ ] Consumer setup

### Redis
- [ ] Cache configuration
- [ ] Session management
- [ ] Token blacklist (logout)

### Testing
- [ ] Unit tests (services)
- [ ] Integration tests (controllers)
- [ ] Security tests

---

## Padrão de Mudanças

### Adicionar Nova Funcionalidade

```markdown
### Added
- [YYYY-MM-DD] Novo controller/service/entity
  - Descrição
  - Arquivos criados/modificados
```

### Correção de Bug

```markdown
### Fixed
- [YYYY-MM-DD] Descrição do bug
  - Como foi corrigido
  - Arquivos afetados
```

### Atualizar Dependência

```markdown
### Changed
- [YYYY-MM-DD] Atualizado org.springframework.boot:spring-boot-starter-web de X.Y.Z para A.B.C
  - Motivo: bugfix, feature, security patch
```

---

**Última atualização:** 2025-12-13
