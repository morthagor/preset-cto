# Changelog — Mobile (React Native 0.72 + TypeScript)

Histórico de mudanças específicas do App Mobile.

Para mudanças que impactam ambas as camadas, veja [../CHANGELOG.md](../CHANGELOG.md).

---

## [Unreleased]

### Added
- [2025-12-13] Projeto React Native 0.72 inicializado com TypeScript
- [2025-12-13] Dependências principais:
  - React 18.2.0
  - React Native 0.72.0
  - @react-navigation/native 6.1.9 (navigation)
  - @react-navigation/bottom-tabs 6.5.8 (tab navigation)
  - @react-navigation/native-stack 6.9.14 (stack navigation)
  - @reduxjs/toolkit 1.9.7 (state management)
  - react-redux 8.1.3
  - axios 1.6.5 (HTTP client)
  - watermelondb 0.28.0 (offline database)
  - @react-native-community/netinfo 11.0.0 (network detection)
  - @react-native-async-storage/async-storage 1.21.0 (storage)
  - react-native-vector-icons 10.0.0 (Material icons)
  - react-native-toast-message 2.1.5 (notifications)
  - react-native-device-info 10.11.0 (device info)

- [2025-12-13] Estrutura de pastas criada:
  - src/screens/ (LoginScreen, TaskListScreen, ProfileScreen)
  - src/navigation/ (RootNavigator, tab + stack setup)
  - src/store/ (Redux slices: auth, sync)
  - src/services/ (ApiClient, SyncService)
  - src/components/ (reusable components)
  - src/types/ (TypeScript interfaces)
  - src/utils/ (helper functions)
  - src/db/ (WatermelonDB schema)

- [2025-12-13] Screens Iniciais:
  - LoginScreen com autenticação (Código do Funcionário + Senha)
  - TaskListScreen com lista de tarefas
  - ProfileScreen com dados do usuário
  - Mock API para testes sem backend

- [2025-12-13] Services:
  - ApiClient (HTTP client com interceptors)
  - SyncService (offline-first sync, push/pull)

- [2025-12-13] Redux Store:
  - authSlice (token, user, loading, error)
  - syncSlice (status, lastSyncedAt, pendingChanges, error)

- [2025-12-13] Navigation:
  - RootNavigator com autenticação
  - MainTabs com BottomTabNavigator (Tasks, Profile)
  - Stack navigation para cada tab

- [2025-12-13] Build Configuration:
  - tsconfig.json (TypeScript config)
  - metro.config.js (Metro bundler config)
  - app.json (app metadata)
  - .eslintrc.js (linting config)

### Features
- [2025-12-13] Autenticação com JWT + AsyncStorage
- [2025-12-13] Network detection (online/offline)
- [2025-12-13] Sincronização offline-first
- [2025-12-13] Fila de mudanças local (SyncQueue)
- [2025-12-13] Redux state management
- [2025-12-13] Bottom tab navigation (Tasks, Profile)
- [2025-12-13] Mock API para desenvolvimento
- [2025-12-13] Toast notifications para sync events

### Configuration
- [2025-12-13] React Native 0.72.0
- [2025-12-13] TypeScript 5.3.3
- [2025-12-13] Node.js 18+ support
- [2025-12-13] npm 9+ support
- [2025-12-13] Dev scripts: start, android, ios, build, test, lint

### Documentation
- [2025-12-13] mobile/README.md com setup e tech stack
- [2025-12-13] MOBILE_RUN.md com instruções para rodar app
- [2025-12-13] Documentação de SyncService (SYNC.md da raiz)

---

## [0.1.0] — 2025-12-13

### Initial Release

- ✅ React Native 0.72 project scaffold
- ✅ TypeScript support
- ✅ Redux Toolkit setup
- ✅ React Navigation (tabs + stack)
- ✅ Basic screens (Login, Tasks, Profile)
- ✅ Offline-first sync service
- ✅ Network detection
- ✅ Ready for development

---

## Próximas Mudanças Esperadas

### Screens
- [ ] TaskDetailScreen (visualizar tarefa)
- [ ] CreateTaskScreen (criar tarefa)
- [ ] EditTaskScreen (editar tarefa)
- [ ] SettingsScreen (configurações)
- [ ] AboutScreen (sobre o app)
- [ ] SyncStatusScreen (status de sincronização)

### Services
- [ ] WatermelonDB integration (local database)
- [ ] Geolocation service (location tracking)
- [ ] Push notifications service
- [ ] Image upload service
- [ ] Offline data export

### Store (Redux)
- [ ] tasksSlice (list, detail, form state)
- [ ] uiSlice (modals, loading states)
- [ ] offlineSlice (pending operations)

### Components
- [ ] TaskCard (reusable task item)
- [ ] LoadingSpinner (loading indicator)
- [ ] ErrorBoundary (error handling)
- [ ] SyncStatusBadge (sync indicator)
- [ ] OfflineNotice (offline indicator)

### Features
- [ ] Pull-to-refresh for task lists
- [ ] Search/filter tasks
- [ ] Task status management (pending, completed)
- [ ] Bulk operations (delete multiple)
- [ ] App update checker
- [ ] Offline data sync statistics
- [ ] Conflict resolution UI
- [ ] Data export (CSV, JSON)

### Security
- [ ] Biometric authentication (fingerprint, face)
- [ ] Device lock timeout
- [ ] Data encryption at rest
- [ ] Certificate pinning

### Testing
- [ ] Jest unit tests
- [ ] React Testing Library
- [ ] Detox E2E tests
- [ ] Mock API tests

### Build & Deployment
- [ ] Android build (APK/AAB)
- [ ] iOS build (IPA)
- [ ] Gradle signing config
- [ ] Xcode signing config
- [ ] App version management
- [ ] Automated release process

---

## Padrão de Mudanças

### Adicionar Nova Screen

```markdown
### Added
- [YYYY-MM-DD] Nova screen TaskDetailScreen
  - Exibe detalhes de uma tarefa
  - Implementado em src/screens/TaskDetailScreen.tsx
  - Integrado ao RootNavigator
```

### Adicionar novo Redux Slice

```markdown
### Added
- [YYYY-MM-DD] tasksSlice criado para state das tarefas
  - Actions: setTasks, addTask, updateTask, deleteTask
  - Arquivo: src/store/slices/tasksSlice.ts
```

### Correção de Bug

```markdown
### Fixed
- [YYYY-MM-DD] Erro ao sincronizar tarefas vazias
  - SyncService agora valida payload antes de enviar
  - ApiClient melhorado para tratamento de erros
```

### Atualizar Dependência

```markdown
### Changed
- [YYYY-MM-DD] Atualizado react-native de 0.72.0 para 0.72.5
  - Motivo: bugfix, performance improvement
  - Recompilado para iOS e Android
```

---

**Última atualização:** 2025-12-13
