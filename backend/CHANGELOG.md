# Changelog — Backend (Java 21 + Spring Boot 4.0.0)

Histórico de mudanças específicas do Backend.

Para mudanças que impactam ambas as camadas, veja [../CHANGELOG.md](../CHANGELOG.md).

---

## [Unreleased]

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

### Documentation
- [2025-12-13] backend/README.md criado com setup e run instructions

---

## [0.1.0] — 2025-12-13

### Initial Release

- ✅ Spring Boot 4.0.0 project scaffold
- ✅ JDK 21 configuration
- ✅ Maven build system
- ✅ Dependencies for JPA, Security, RabbitMQ, Redis, OpenAPI
- ✅ Ready for controller/service development

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
