# Backend — Preset CTO

<div align="center">

![Java](https://img.shields.io/badge/Java-21%20LTS-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.0.0-6db33f?style=flat-square&logo=spring-boot)
![Maven](https://img.shields.io/badge/Maven-3.11.0-c71a36?style=flat-square&logo=apache-maven)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-0.12.3-000000?style=flat-square)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

**RESTful API** com autenticação JWT, segurança Spring Security e banco de dados PostgreSQL.

</div>

---

## 🛠️ Tech Stack

### Core Framework
- **Java 21 LTS** — Latest long-term support version
- **Spring Boot 4.0.0** — Modern web framework
- **Spring Framework 6.1** — Latest Spring framework
- **Maven 3.11.0** — Build automation and dependency management

### Web & API
- **Spring Boot Starter Web** — REST API development
- **Spring Boot Starter Security** — Authentication & authorization
- **Spring Security 6.1** — Security framework
- **SpringDoc OpenAPI 2.1.0** — API documentation (Swagger/OpenAPI 3.0)

### Database & ORM
- **Spring Data JPA** — Object-relational mapping
- **Hibernate 6.1** — ORM framework
- **PostgreSQL JDBC Driver 42** — Database driver
- **PostgreSQL 16** — Relational database

### Authentication & JWT
- **jjwt 0.12.3** — JSON Web Token library
  - `jjwt-api` — Core JWT API
  - `jjwt-impl` — Implementation
  - `jjwt-jackson` — JSON serialization

### Messaging & Caching
- **Spring AMQP** — RabbitMQ integration
- **Spring Data Redis** — Cache and session management
- **RabbitMQ** — Message broker
- **Redis 7** — In-memory cache

### Development & Testing
- **Lombok** — Reduce boilerplate code
- **Spring Boot Starter Test** — Testing framework
- **Spring Security Test** — Security testing
- **JUnit 5** — Unit testing framework

## 📂 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/presetcto/
│   │   │   ├── Main.java                          # Application entry point
│   │   │   ├── config/
│   │   │   │   ├── JwtTokenProvider.java          # JWT token generation & validation
│   │   │   │   └── SecurityConfig.java            # Spring Security configuration
│   │   │   ├── controller/
│   │   │   │   └── AuthController.java            # Auth endpoints (/api/v2/auth/*)
│   │   │   ├── dto/
│   │   │   │   ├── LoginRequest.java              # POST /login request
│   │   │   │   ├── LoginResponse.java             # POST /login response
│   │   │   │   ├── MeResponse.java                # GET /me response
│   │   │   │   └── ErrorResponse.java             # Error responses
│   │   │   ├── entity/
│   │   │   │   └── User.java                      # User JPA entity
│   │   │   ├── repository/
│   │   │   │   └── UserRepository.java            # User data access
│   │   │   └── service/
│   │   │       └── AuthService.java               # Business logic
│   │   └── resources/
│   │       ├── application.properties             # App configuration
│   │       ├── application-dev.properties         # Dev profile
│   │       └── application-prod.properties        # Production profile
│   └── test/
│       └── java/com/presetcto/
│           ├── AuthControllerTest.java            # API tests
│           ├── AuthServiceTest.java               # Service tests
│           └── JwtTokenProviderTest.java          # JWT tests
├── .java-version                                   # Java version (21)
├── pom.xml                                         # Maven configuration
├── CHANGELOG.md                                    # Release notes
└── README.md                                       # This file
```

## 🚀 Quick Start

### Prerequisites

- **Java 21 LTS** — [Download from Oracle](https://www.oracle.com/java/technologies/downloads/#java21) or [Eclipse Adoptium](https://adoptium.net/)
- **Maven 3.11.0** — Usually included with IDE or download from [maven.apache.org](https://maven.apache.org)
- **PostgreSQL 16** — [Download here](https://www.postgresql.org/download/)
- **Redis 7** (optional) — For caching and session management
- **RabbitMQ** (optional) — For message queue support

### 1. Verify Java Installation

```bash
java -version
# Should output Java 21 LTS
```

### 2. Database Setup

```bash
# Create database
createdb preset_cto_db

# Or via PostgreSQL CLI
psql -U postgres
CREATE DATABASE preset_cto_db;
\q
```

Update connection in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/preset_cto_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### 3. Build Project

```bash
cd backend
mvn clean compile
```

### 4. Run Application

```bash
# Development (hot reload)
mvn spring-boot:run

# Or run as JAR
mvn clean package
java -jar target/backend-*.jar
```

Server runs on: `http://localhost:8080`

## 🔐 Authentication API (v2)

### Endpoints

All endpoints under `/api/v2/auth`

#### POST `/api/v2/auth/login`
**Login with email and password**

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response (201 Created):
```json
{
  "token": "eyJhbGc...",
  "user": {
    "email": "user@example.com",
    "role": "USER"
  }
}
```

Errors:
- `401 Unauthorized` — Invalid credentials
- `400 Bad Request` — Missing fields

#### GET `/api/v2/auth/me`
**Get current authenticated user**

Headers:
```
Authorization: Bearer eyJhbGc...
```

Response (200 OK):
```json
{
  "email": "user@example.com",
  "role": "USER",
  "createdAt": "2025-12-13T10:30:00Z"
}
```

Errors:
- `401 Unauthorized` — Invalid/missing token
- `403 Forbidden` — Insufficient permissions

#### POST `/api/v2/auth/logout`
**Invalidate current token**

Headers:
```
Authorization: Bearer eyJhbGc...
```

Response (200 OK):
```json
{
  "message": "Logged out successfully"
}
```

#### GET `/api/v2/auth/health`
**Health check (no auth required)**

Response (200 OK):
```json
{
  "status": "ok",
  "timestamp": "2025-12-13T10:30:00Z"
}
```

## 🔒 Security Configuration

### JWT Token Provider (`JwtTokenProvider.java`)

```java
// Token generation
String token = jwtTokenProvider.generateToken(user);

// Token validation
boolean isValid = jwtTokenProvider.validateToken(token);

// Extract user email
String email = jwtTokenProvider.getEmailFromToken(token);
```

**Token Details:**
- **Algorithm:** HS512 (HMAC with SHA-512)
- **Expiration:** 24 hours
- **Claims:** `email`, `role`, `sub` (user ID)
- **Secret:** `spring.jwt.secret` in application.properties

### Spring Security Configuration (`SecurityConfig.java`)

```java
// Security features:
- Stateless sessions (JWT-based)
- CORS enabled for mobile/web clients
- HTTPS enforced in production
- CSRF protection disabled (stateless API)
- Role-based access control (RBAC)
- Bcrypt password hashing
```

**Allowed Origins:**
```properties
spring.cors.allowed-origins=http://localhost:*,https://*
```

### Authentication Flow

```
Client Request
    ↓
BearerTokenFilter extracts JWT
    ↓
JwtTokenProvider validates signature & expiration
    ↓
UserDetailsService loads User from database
    ↓
SecurityContext stores authentication
    ↓
Authorization check (roles/permissions)
    ↓
Response or 401/403 error
```

## 📊 Database Schema

### User Entity

```java
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;  // Bcrypt encrypted
    
    @Enumerated(EnumType.STRING)
    private UserRole role;    // ADMIN, USER, GUEST
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### Migration

Spring Data JPA auto-creates tables. For production, use Flyway or Liquibase.

## 📝 Configuration Files

### application.properties

```properties
# Server
server.port=8080
server.servlet.context-path=/

# Database
spring.datasource.url=jdbc:postgresql://localhost:5432/preset_cto_db
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false

# JWT
spring.jwt.secret=your-secret-key-min-32-chars
spring.jwt.expiration=86400000  # 24 hours

# CORS
spring.cors.allowed-origins=http://localhost:*,https://*
spring.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.cors.allow-credentials=true

# Logging
logging.level.root=INFO
logging.level.com.presetcto=DEBUG
```

### application-dev.properties

```properties
spring.jpa.show-sql=true
logging.level.org.springframework.web=DEBUG
logging.level.org.springframework.security=DEBUG
server.error.include-message=always
server.error.include-stacktrace=always
```

### application-prod.properties

```properties
spring.jpa.show-sql=false
logging.level.root=WARN
server.error.include-message=never
server.error.include-stacktrace=never
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
```

## 🧪 Testing

### Run All Tests

```bash
mvn test
```

### Run Specific Test

```bash
mvn test -Dtest=AuthControllerTest
```

### Test Coverage

```bash
mvn jacoco:report
# Report: target/site/jacoco/index.html
```

### Example Test

```java
@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    void testLogin() throws Exception {
        mockMvc.perform(post("/api/v2/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"email\":\"test@test.com\",\"password\":\"pass\"}"))
            .andExpect(status().isCreated());
    }
}
```

## 📦 Maven Build

### Commands

```bash
# Clean and compile
mvn clean compile

# Run tests
mvn test

# Build JAR
mvn clean package

# Build with profile
mvn -Pprod clean package

# Skip tests during build
mvn clean package -DskipTests
```

### Dependency Management

- Parent: `org.springframework.boot:spring-boot-starter-parent:4.0.0`
- Managed versions in `<dependencyManagement>`
- Override in `<properties>`

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Java version mismatch** | `java -version` and verify Java 21 |
| **Port 8080 in use** | `lsof -i :8080` then `kill -9 <PID>` |
| **Database connection error** | Verify PostgreSQL is running and credentials correct |
| **JWT expiration** | Check `spring.jwt.expiration` value (milliseconds) |
| **CORS error** | Whitelist origin in `spring.cors.allowed-origins` |
| **Maven not found** | Add Maven to PATH or use IDE's bundled Maven |

## 🔗 Useful Resources

### Documentation
- [Spring Boot Docs](https://spring.io/projects/spring-boot) — Official documentation
- [Spring Security](https://spring.io/projects/spring-security) — Authentication & authorization
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa) — Database access
- [jjwt](https://github.com/jwtk/jjwt) — JWT library
- [SpringDoc OpenAPI](https://springdoc.org/) — API documentation

### Project Resources
- [SYNC.md](../SYNC.md) — Synchronization strategy
- [ARCHITECTURE.md](../doc/ARCHITECTURE.md) — System architecture
- [CHANGELOG.md](./CHANGELOG.md) — Release notes (v.1.0.2)
- [../mobile/README.md](../mobile/README.md) — Mobile layer docs
- [../README.md](../README.md) — Root documentation

### Tools
- **Postman** — API testing
- **REST Client** — VS Code extension
- **Spring Tool Suite** — IDE
- **IntelliJ IDEA** — IDE with Spring support

## 📱 Mobile Integration

Mobile app connects to backend:
- **Base URL:** `http://localhost:8080/api/v2/auth`
- **Authentication:** Bearer token in `Authorization` header
- **Fallback:** Mock service when backend unavailable
- **Sync:** Automatic push/pull when connection restored

See [mobile/README.md](../mobile/README.md) for details.

## 🗓️ Roadmap

### v.1.0.2 (Current — December 2025)
- ✅ JWT authentication endpoints
- ✅ Spring Security stateless configuration
- ✅ User entity and repository
- ✅ API documentation (Swagger)
- ✅ Error handling

### v.1.1.0 (Planned)
- [ ] Task CRUD endpoints
- [ ] Sync push/pull endpoints
- [ ] Database migrations (Flyway)
- [ ] Rate limiting
- [ ] Request logging

### v.2.0.0 (Future)
- [ ] OAuth2 integration
- [ ] Refresh tokens
- [ ] Role-based access control (RBAC)
- [ ] Audit logging
- [ ] Event sourcing

## 📄 License

Proprietary — All rights reserved.

---

<div align="center">

**Built with ❤️ for Preset CTO**

Last Updated: December 14, 2025 | Version: 1.0.2

</div>
