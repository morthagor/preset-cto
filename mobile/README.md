# Mobile App — React Native

App mobile multiplataforma (Android + iOS) com arquitetura **offline-first**.

## 🛠️ Tech Stack

- **React Native 0.72** — framework cross-platform
- **TypeScript** — type safety
- **Redux Toolkit** — state management
- **React Navigation** — navigation
- **Axios** — HTTP client
- **WatermelonDB** — local database (offline storage)
- **NetInfo** — network detection
- **AsyncStorage** — persistent data
- **MaterialCommunityIcons** — UI icons

## 📂 Estrutura de Pastas

```
mobile/
├── src/
│   ├── screens/          # Telas (Login, Tasks, Profile)
│   ├── navigation/       # Stack e Tab navigation
│   ├── store/            # Redux slices (auth, sync)
│   ├── services/         # API client e Sync service
│   ├── components/       # Reusable components
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Helper functions
│   └── db/               # WatermelonDB setup
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.tsx               # App root
├── index.js              # Entry point
├── metro.config.js       # Metro bundler config
├── tsconfig.json         # TypeScript config
├── package.json
└── README.md
```

## 🚀 Quick Start

### 1. Instale dependências

```bash
cd mobile
npm install
```

### 2. Rodar em Development (Android)

```bash
npm run android
```

### 3. Rodar em Development (iOS)

```bash
npm run ios
```

## 🔄 Funcionalidades Principais

### Autenticação (LoginScreen)
- Login com email/senha
- Token JWT armazenado em AsyncStorage
- Redux state management

### Lista de Tarefas (TaskListScreen)
- Carrega tarefas do backend
- Pull-to-refresh
- Acesso offline (dados locais)

### Perfil (ProfileScreen)
- Visualizar dados do usuário
- Último sync timestamp
- Logout

### Sincronização Offline-First (SyncService)
- Detecta conexão via NetInfo
- Fila de mudanças locais (CREATE, UPDATE, DELETE)
- Push ao servidor quando online
- Pull de atualizações remotas
- Resolução de conflitos (server-wins)

### Redux State (store/)
- `authSlice` — token, user, loading, error
- `syncSlice` — sync status, pending changes, last sync time

## 📱 Fluxo de Dados

```
User Action (Create/Edit Task)
         ↓
SyncService.addToQueue()
         ↓
Redux state updated
         ↓
Local DB updated (AsyncStorage/SQLite)
         ↓
UI re-renders (optimistic update)
         ↓
[OFFLINE] Aguarda conexão
         ↓
[ONLINE] SyncService.syncWithServer()
         ↓
POST /api/v1/sync/push (enviar mudanças)
GET /api/v1/sync/pull (receber updates)
         ↓
Resolve conflitos
         ↓
Atualiza local DB + Redux
         ↓
UI sincroniza com servidor
```

## 🔒 Segurança

- JWT token em AsyncStorage (protegido pelo device)
- Device ID único para identificar móvel
- HTTPS em produção
- Validação de certificado (pinning)
- Dados sensíveis criptografados

## 🧪 Testes

```bash
npm test
```

## 📦 Build para Produção

### Android (APK/AAB)

```bash
npm run build:android
# Arquivo gerado: android/app/build/outputs/apk/release/
```

### iOS (IPA)

```bash
npm run build:ios
# Arquivo gerado: ios/build/Release-iphoneos/
```

## 🐛 Debug

### React Native Debugger

```bash
npm start
# Abre http://localhost:8081
```

### Logs

```bash
# Android
adb logcat | grep ReactNativeJS

# iOS
xcrun simctl spawn booted log stream --predicate 'eventMessage contains[cd] "ReactNativeJS"'
```

## 📚 Dependências Principais

| Dependência | Versão | Propósito |
|---|---|---|
| React Native | 0.72 | Framework |
| Redux Toolkit | 1.9 | State Management |
| React Navigation | 6.1 | Navigation |
| Axios | 1.6 | HTTP requests |
| WatermelonDB | 0.28 | Local DB |
| TypeScript | 5.3 | Type safety |

## 🔗 Links Úteis

- [React Native Docs](https://reactnative.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Navigation](https://reactnavigation.org)
- [WatermelonDB](https://watermelondb.org)
- [Sync.md](../SYNC.md) — Estratégia de sincronização detalhada

## 📝 Próximos Passos

- [ ] Implementar WatermelonDB schema
- [ ] Criar screens adicionais (TaskDetail, CreateTask)
- [ ] Integrar com Backend API real
- [ ] Adicionar error boundaries
- [ ] Implementar push notifications
- [ ] Testes unitários (Jest)
- [ ] E2E tests (Detox)
- [ ] Build para produção (Android/iOS)
- [ ] Configurar CI/CD (GitHub Actions)

---

**Projeto privado — Instalação manual apenas**
