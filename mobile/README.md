# Mobile App — Preset CTO

<div align="center">

![React Native](https://img.shields.io/badge/React%20Native-0.81.0-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-3178c6?style=flat-square&logo=typescript)
![Node](https://img.shields.io/badge/Node->=20.0.0-339933?style=flat-square&logo=node.js)
![npm](https://img.shields.io/badge/npm->=10.0.0-cb3837?style=flat-square&logo=npm)
![Redux](https://img.shields.io/badge/Redux-1.9.7-764abc?style=flat-square&logo=redux)
![React Navigation](https://img.shields.io/badge/React%20Navigation-6.5.0-000000?style=flat-square)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

**App mobile multiplataforma** (Android + iOS) com arquitetura **offline-first** e autenticação JWT completa.

</div>

---

## 🛠️ Tech Stack

### Frontend Framework
- **React Native 0.81** — Cross-platform mobile framework
- **React 18.2** — UI library
- **TypeScript 5.3** — Type-safe development
- **Expo 54** — Development and build tool

### State Management
- **Redux Toolkit 1.9** — Centralized state management
- **Redux Persist** — State persistence

### Navigation
- **React Navigation 6.5** — Tab + Stack navigation
- **React Navigation Bottom Tabs** — Bottom navigation
- **React Navigation Native Stack** — Native stack navigation

### HTTP & Data
- **Axios 1.6** — HTTP client with interceptors
- **AsyncStorage** — Persistent local storage
- **WatermelonDB 0.28** — Reactive local database (offline support)

### Network & Device
- **@react-native-community/netinfo 11** — Network state detection
- **react-native-device-info** — Device information

### UI & Icons
- **react-native-vector-icons 10** — Material icons
- **react-native-toast-message 2.3** — Toast notifications
- **react-native-safe-area-context** — Safe area handling
- **react-native-screens** — Native screen handling

### Testing
- **Jest 29** — Unit testing framework
- **@testing-library/react-native** — Component testing

## 📂 Estrutura de Pastas

```
mobile/
├── src/
│   ├── screens/              # Screens (LoginScreen, DashboardScreen, ProfileScreen)
│   │   ├── LoginScreen.tsx   # Email/password login with mock fallback
│   │   ├── LoginScreen.web.tsx
│   │   ├── DashboardScreen.tsx # Welcome screen with user info
│   │   ├── ProfileScreen.tsx   # User profile & logout
│   │   ├── TaskListScreen.tsx  # Task management
│   │   └── index.ts
│   ├── navigation/
│   │   ├── RootNavigator.tsx  # Auth-based conditional navigation
│   │   └── types.ts           # Navigation types
│   ├── store/                 # Redux state management
│   │   ├── index.ts           # Store setup
│   │   └── slices/
│   │       ├── authSlice.ts   # Auth state (token, user, loading)
│   │       └── syncSlice.ts   # Sync state (status, pending changes)
│   ├── services/              # Business logic & APIs
│   │   ├── ApiClient.ts       # Axios instance with interceptors
│   │   ├── AuthService.ts     # Login/logout with mock fallback
│   │   └── SyncService.ts     # Offline-first sync engine
│   ├── components/            # Reusable components
│   │   ├── themed-text.tsx
│   │   ├── themed-view.tsx
│   │   └── haptic-tab.tsx
│   ├── types/                 # TypeScript interfaces
│   │   └── auth.ts            # Auth types (User, Token, etc)
│   ├── constants/             # App constants
│   │   └── theme.ts           # Colors and styling
│   ├── hooks/                 # Custom React hooks
│   │   └── use-color-scheme.ts
│   └── utils/                 # Helper functions
├── public/                    # Web assets (HTML/CSS fallback)
│   ├── index.html             # Web login screen
│   ├── dashboard.html         # Web dashboard screen
│   └── favicon.png
├── android/                   # Android native code
├── ios/                       # iOS native code
├── .nvmrc                     # Node version (20)
├── App.tsx                    # App root component
├── index.js                   # Entry point
├── metro.config.js            # Metro bundler configuration
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint rules
├── package.json               # Dependencies and scripts
├── package-lock.json
└── README.md                  # This file
```

## 🚀 Setup & Quick Start

### Prerequisites

- **Node.js 20+** (use `nvm install 20` or check `.nvmrc`)
- **npm 10+**
- **Expo CLI**: `npm install -g expo-cli`
- **Android Studio** (para Android)
- **Xcode** (para iOS em macOS)

### 1. Install Dependencies

```bash
cd mobile
npm install
```

### 2. Start Development Server

```bash
# Expo development server (suporta Web, Android, iOS)
npm start

# Ou diretamente:
npm run start
```

### 3. Run on Web (HTML/CSS fallback)

```bash
# Via Python HTTP server na pasta raiz
cd ..
python3 -m http.server 8081 --directory ./mobile/public

# Acessa em http://localhost:8081
```

### 4. Run on Android

```bash
# Opção 1: Expo (mais fácil para desenvolvimento)
npm run android

# Opção 2: Android Studio
# Abrir android/ folder em Android Studio e Build > Run
```

### 5. Run on iOS (macOS only)

```bash
# Opção 1: Expo
npm run ios

# Opção 2: Xcode
# Abrir ios/PresetCTO.xcodeproj em Xcode e Run
```

## ✨ Key Features

### 🔐 Authentication (LoginScreen)
- **Email/Password Login** — Standard credentials
- **Mock Credentials** — `morthagor` / `wp1234wp` (offline fallback)
- **JWT Tokens** — 24-hour expiration with refresh
- **AsyncStorage** — Secure token persistence
- **Smart Fallback** — Works offline if backend unavailable
- **Auto-login** — Checks AsyncStorage on app start
- **File**: `src/screens/LoginScreen.tsx`

### 📊 Dashboard (DashboardScreen)
- **Personalized Welcome** — "Bem-vindo, [username]"
- **User Information** — Email, role, creation date
- **Logout Button** — Clears tokens and navigates to login
- **Light Theme** — #F5F5F5 background, #1976D2 buttons
- **File**: `src/screens/DashboardScreen.tsx` (also ProfileScreen.tsx)

### 📋 Task Management (TaskListScreen)
- **Task List Display** — Pull-to-refresh support
- **Offline Access** — Local data stored via AsyncStorage
- **Create/Edit/Delete** — Full CRUD operations
- **Sync Indicator** — Shows sync status
- **File**: `src/screens/TaskListScreen.tsx`

### 🔄 Offline-First Sync (SyncService)
- **NetInfo Integration** — Detects online/offline status in real-time
- **Local Queue** — Stores CREATE, UPDATE, DELETE operations
- **Smart Sync** — Automatic sync when connection restored
- **Conflict Resolution** — Server-wins strategy
- **Bidirectional Sync** — 
  - `POST /api/v2/sync/push` — Send local changes
  - `GET /api/v2/sync/pull` — Fetch remote updates
- **Optimistic Updates** — UI updates immediately
- **File**: `src/services/SyncService.ts`

### 🗄️ State Management (Redux)
- **Auth Slice** (`src/store/slices/authSlice.ts`):
  - `token` — JWT token
  - `user` — User object { email, role }
  - `loading` — Auth request state
  - `error` — Error messages

- **Sync Slice** (`src/store/slices/syncSlice.ts`):
  - `status` — 'idle' | 'syncing' | 'error'
  - `lastSyncedAt` — Timestamp
  - `pendingChanges` — Queue of local operations
  - `error` — Sync error details

### 🌐 Navigation
- **RootNavigator** — Conditional navigation based on auth state
- **Protected Screens** — Only visible if authenticated
- **Bottom Tab Navigation** — Tasks and Profile tabs
- **File**: `src/navigation/RootNavigator.tsx`

### 🎨 UI/UX
- **Light Theme** — Modern Material Design
- **Safe Area** — Handles notches and safe areas
- **Toast Notifications** — Feedback for sync events
- **Loading States** — Spinners during async operations
- **Error Handling** — User-friendly error messages

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

## 🔒 Security Best Practices

- **JWT in AsyncStorage** — Tokens automatically encrypted by device OS
- **No Sensitive Data** — Password never stored locally
- **HTTPS Only** — Production API calls enforced
- **Bearer Tokens** — Authorization header on all requests
- **Device ID** — Unique identifier per device (optional)
- **Token Expiration** — 24-hour JWT expiration
- **Logout Cleanup** — Clears all sensitive data from AsyncStorage
- **Mock Credentials** — Dev-only, auto-disabled in production builds

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Framework
- **Jest 29** — Unit testing
- **React Native Testing Library** — Component testing
- **Mock Services** — AuthService and ApiClient have mock implementations

### Create New Tests
```bash
# Create test file alongside component
src/screens/__tests__/LoginScreen.test.tsx
src/services/__tests__/AuthService.test.ts
```

## 📚 Available Scripts

```bash
# Start development server
npm start

# Run on specific platform
npm run android      # Android (via Expo)
npm run ios         # iOS (via Expo)
npm run web         # Web (via Expo)

# Run tests
npm test            # Watch mode
npm test -- --coverage  # With coverage report

# Lint code
npm run lint        # Check ESLint errors
npm run lint -- --fix   # Auto-fix issues

# Build for production
npm run build       # Create optimized bundle
```

## 🐛 Debugging

### Expo DevTools
```bash
npm start

# Press 'j' for Flipper (if installed)
# Press 'w' for web inspector
# Press 'a' for Android
# Press 'i' for iOS
```

### Redux DevTools
```bash
# Enable in redux store and inspect state changes
# Install: Redux DevTools browser extension
```

### Network Requests
```bash
# View all HTTP requests in console
# Check ApiClient.ts interceptors
```

### Logs
```bash
# Android
adb logcat | grep ReactNativeJS

# iOS (Simulator)
xcrun simctl spawn booted log stream --predicate 'eventMessage contains[cd] "ReactNativeJS"'

# Expo Console
npm start  # Logs appear in terminal
```

### Common Issues

| Issue | Solution |
|-------|----------|
| **Metro bundler error** | `npm start -- --reset-cache` |
| **Port 8081 in use** | `lsof -i :8081` then `kill -9 <PID>` |
| **Node version mismatch** | Check `.nvmrc` and run `nvm install 20` |
| **AsyncStorage empty** | Clear app cache: `npm start -- --reset-cache` |
| **Cannot connect to backend** | Verify backend is running on `localhost:8080` |

## 🔗 Useful Resources

### Documentation
- [React Native Docs](https://reactnative.dev/docs/getting-started) — Official documentation
- [React Navigation Docs](https://reactnavigation.org) — Navigation library guide
- [Redux Toolkit Docs](https://redux-toolkit.js.org) — State management
- [Axios Docs](https://axios-http.com) — HTTP client
- [AsyncStorage Docs](https://react-native-async-storage.github.io/async-storage/) — Local storage
- [Expo Docs](https://docs.expo.dev) — Development tool

### Project Documentation
- [SYNC.md](../SYNC.md) — Offline-first sync strategy details
- [MOBILE_TESTING.md](../doc/MOBILE_TESTING.md) — Complete testing guide
- [MOBILE_QUICK_TEST.txt](../MOBILE_QUICK_TEST.txt) — Quick reference
- [ARCHITECTURE.md](../doc/ARCHITECTURE.md) — System architecture
- [CHANGELOG.md](./CHANGELOG.md) — Release notes (v.1.0.2)

### Tools & Extensions
- **Expo CLI** — `npm install -g expo-cli`
- **React Native Debugger** — Standalone debugger
- **Flipper** — Mobile debugging platform
- **Redux DevTools** — State inspector

## 📱 Platform Support

| Platform | Support | Notes |
|----------|---------|-------|
| **Android 10+** | ✅ Full | Via Expo or Android Studio |
| **iOS 13+** | ✅ Full | Via Expo or Xcode (macOS only) |
| **Web** | ⚠️ Partial | HTML/CSS fallback in `public/` folder |

## 🚀 Deployment

### Release Checklist
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with new features
- [ ] Run tests: `npm test`
- [ ] Run linter: `npm run lint`
- [ ] Test on real device
- [ ] Commit and tag release
- [ ] Build release APK/AAB for Android
- [ ] Build release IPA for iOS

### Environment Variables
```bash
# Create .env file in mobile/ folder
REACT_APP_API_URL=https://api.production.com
REACT_APP_ENV=production
```

Then use in code:
```typescript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
```

## � Dependencies Overview

| Package | Version | Purpose | File |
|---------|---------|---------|------|
| **react-native** | 0.73.0 | Core framework | - |
| **react** | 18.2.0 | UI library | - |
| **typescript** | 5.3.3 | Type safety | tsconfig.json |
| **@react-navigation/native** | 6.1.0 | Navigation core | src/navigation/ |
| **@react-navigation/bottom-tabs** | 6.5.0 | Bottom navigation | src/navigation/ |
| **@react-navigation/native-stack** | 6.9.0 | Stack navigation | src/navigation/ |
| **@reduxjs/toolkit** | 1.9.7 | State management | src/store/ |
| **react-redux** | 8.1.3 | Redux bindings | src/store/ |
| **axios** | 1.6.5 | HTTP client | src/services/ApiClient.ts |
| **@react-native-async-storage/async-storage** | 1.21.0 | Persistent storage | src/services/AuthService.ts |
| **@react-native-community/netinfo** | 11.0.0 | Network detection | src/services/SyncService.ts |
| **react-native-vector-icons** | 10.0.0 | Material icons | - |
| **react-native-toast-message** | 2.3.3 | Notifications | - |
| **expo** | 54.0.0 | Development tool | metro.config.js |

## 🔗 API Integration

### Backend Endpoints (v2)

```typescript
// Base URL: http://localhost:8080/api/v2/auth

// Login
POST /api/v2/auth/login
Body: { email: string, password: string }
Response: { token: string, user: { email, role } }

// Get Current User
GET /api/v2/auth/me
Header: Authorization: Bearer <token>
Response: { email: string, role: string, createdAt: string }

// Logout
POST /api/v2/auth/logout
Header: Authorization: Bearer <token>
Response: { success: true }

// Health Check
GET /api/v2/auth/health
Response: { status: 'ok' }
```

### Mock Fallback

When backend is unreachable:
- Uses in-memory mock with `morthagor` / `wp1234wp`
- Returns fake JWT token
- Stores in AsyncStorage like real login
- Syncs with real backend when connection restored

## 🔗 Links Úteis

- [React Native Docs](https://reactnative.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Navigation](https://reactnavigation.org)
- [WatermelonDB](https://watermelondb.org)
- [Sync.md](../SYNC.md) — Estratégia de sincronização detalhada

## � Development Guide

### Adding a New Screen

1. Create file: `src/screens/NewScreen.tsx`
2. Create types: `src/types/newFeature.ts` (if needed)
3. Add to RootNavigator: `src/navigation/RootNavigator.tsx`
4. Implement navigation actions in Redux slice
5. Create tests: `src/screens/__tests__/NewScreen.test.tsx`

### Adding a New Service

1. Create file: `src/services/NewService.ts`
2. Use ApiClient for HTTP requests
3. Handle errors with try-catch
4. Return typed data using TypeScript interfaces
5. Integrate with Redux slice for state

### Adding Redux Slice

1. Create file: `src/store/slices/newSlice.ts`
2. Define initial state with TypeScript
3. Create reducers for state mutations
4. Create async thunks for side effects
5. Export actions and reducer
6. Add to `src/store/index.ts`

## 🤝 Contributing

### Code Style
- Use **TypeScript** strictly (no `any` types)
- Follow **ESLint** rules: `npm run lint -- --fix`
- Use **functional components** with hooks
- Keep components under 300 lines
- Extract complex logic to separate services

### Naming Conventions
- Components: PascalCase (`LoginScreen.tsx`)
- Services/Utils: camelCase (`authService.ts`)
- Types: PascalCase (`LoginRequest`, `User`)
- Redux slices: camelCase (`authSlice.ts`)
- Interfaces: PascalCase with `I` prefix or no prefix (`User`, not `IUser`)

### Testing Requirements
- Write tests for business logic
- Cover error scenarios
- Mock external dependencies
- Test user interactions
- Aim for >80% coverage

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and test
npm run lint -- --fix
npm test

# Commit with conventional message
git commit -m "feat: Add new login feature"

# Push and create PR
git push origin feature/new-feature
```

## 🗓️ Roadmap

### v.1.0.2 (Current — December 2025)
- ✅ Complete authentication flow
- ✅ LoginScreen with mock fallback
- ✅ DashboardScreen with user info
- ✅ Web UI support (HTML/CSS)
- ✅ Testing guides

### v.1.1.0 (Planned)
- [ ] Task CRUD operations
- [ ] Pull-to-refresh on lists
- [ ] Offline data synchronization
- [ ] Push notifications

### v.2.0.0 (Future)
- [ ] Biometric authentication
- [ ] Image upload support
- [ ] Real-time collaboration
- [ ] Advanced search/filtering
- [ ] Dark mode support

## 📞 Support & Contact

| Topic | Resource |
|-------|----------|
| **Bug Reports** | Create GitHub issue |
| **Feature Requests** | Discussion forum |
| **Documentation** | See `doc/` folder |
| **Backend Issues** | See `backend/README.md` |
| **General Help** | Check existing issues first |

## 📄 License

Proprietary — All rights reserved.

---

<div align="center">

**Built with ❤️ for Preset CTO**

Last Updated: December 14, 2025 | Version: 1.0.2

</div>
