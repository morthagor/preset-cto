# Guia de Execução - App Mobile

> **Status**: ✅ Migrado para Expo (resolvido npm install issues)

## Visão Geral Rápida

```bash
cd cto/mobile
npm install --legacy-peer-deps
npm start                # ou npm run android / ios
```

Scan do QR code com Expo Go ou wait para emulador Android abrir.

---

## Instalação Passo a Passo

### 1. Pré-requisitos

- **Node.js** 18+ → `node -v` (você tem: **v20.19.6** ✅)
- **npm** 9+ → `npm -v` (você tem: **10.8.2** ✅)
- **Android SDK/Emulator** OR **Expo Go app** (veja [ANDROID_SDK_SETUP.md](./ANDROID_SDK_SETUP.md))

### 2. Instalar Dependências

```bash
cd cto/mobile
npm install --legacy-peer-deps
```

**Por que `--legacy-peer-deps`?**
Alguns pacotes do Expo ainda têm dependências peer que não estão completamente alinhadas.
Esse flag permite instalar mesmo assim, pois os pacotes são compatíveis em prática.

### 3. Rodar o App

#### Android (Emulador ou Device)

```bash
npm run android
```

ou manualmente:

```bash
npm start
# Pressione 'a' para Android
```

#### iOS (Mac com Xcode)

```bash
npm run ios
```

#### Web (Debug)

```bash
npm run web
```

---

## Arquitetura da App

### Stack Tecnológico

| Layer | Tecnologia | Versão |
|-------|-----------|--------|
| **Framework** | Expo | 50.0.0 |
| **React Native** | React Native | 0.73.0 |
| **React** | React | 18.2.0 |
| **TypeScript** | TypeScript | 5.3 |
| **State** | Redux Toolkit | 1.9.7 |
| **Navigation** | React Navigation | 6.x |
| **HTTP** | Axios | 1.6.5 |
| **Storage** | AsyncStorage | 1.21.0 |

### Fluxo de Dados

```
User Interaction
    ↓
LoginScreen / TaskListScreen / ProfileScreen
    ↓
Redux Actions (dispatch)
    ↓
Redux Reducers (authSlice, syncSlice)
    ↓
ApiClient (Axios with JWT)
    ↓
Backend API (Spring Boot)
    ↓
SyncService (offline-first)
    ↓
AsyncStorage (local cache)
```

### Estrutura de Pastas

```
mobile/
├── package.json
├── app.json                 # Configuração Expo
├── App.tsx                  # Raiz com Redux + Navigation
├── index.js                 # Entry point
├── metro.config.js          # Bundler config
├── tsconfig.json
│
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx      # Auth (Código + Senha)
│   │   ├── TaskListScreen.tsx   # Lista de tarefas
│   │   └── ProfileScreen.tsx    # Perfil do usuário
│   │
│   ├── services/
│   │   ├── ApiClient.ts         # HTTP + JWT
│   │   └── SyncService.ts       # Offline-first sync
│   │
│   ├── store/
│   │   ├── index.ts
│   │   ├── slices/
│   │   │   ├── authSlice.ts    # Token, user
│   │   │   └── syncSlice.ts    # Sync status
│   │
│   ├── navigation/
│   │   └── RootNavigator.tsx   # Auth routing + tabs
│   │
│   ├── types/                   # TypeScript definitions
│   ├── components/              # Reusable components
│   ├── utils/                   # Utilities
│   └── db/                      # Database (future)
│
└── assets/                      # Icons, images (future)
```

---

## Telas da Aplicação

### 1. LoginScreen

**Propósito**: Autenticação do usuário

**Campos**:
- `Código do Funcionário` (input text)
- `Senha` (input password)

**Funcionalidade**:
- Login com credenciais (demo: código=`demo`, senha=`123456`)
- Mock API para testes sem backend
- Armazena JWT token no Redux + AsyncStorage
- Navega para MainTabs ao sucesso

### 2. TaskListScreen

**Propósito**: Exibir lista de tarefas

**Funcionalidade**:
- Lista com pull-to-refresh
- FAB (Floating Action Button) para nova tarefa
- Exibe status de sincronização
- Mock data inicial

### 3. ProfileScreen

**Propósito**: Perfil do usuário

**Funcionalidade**:
- Exibe dados do usuário logado
- Último timestamp de sincronização
- Botão de logout

---

## Comandos Principais

### Development

```bash
npm start              # Inicia Expo dev server
npm run android        # Android emulator/device
npm run ios            # iOS simulator/device
npm run web            # Web preview
```

### Testing

```bash
npm test               # Jest tests
npm run lint           # ESLint check
```

### Cleaning

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## Conectar com Backend

Editar [mobile/src/services/ApiClient.ts](./mobile/src/services/ApiClient.ts):

```typescript
const API_BASE_URL = 'http://192.168.x.x:8080/api';
// Substitua pelo IP da sua máquina com backend
```

Backend rodando:
```bash
cd backend
mvn spring-boot:run
```

---

## Próximos Passos

1. ✅ **Mobile app com Expo** (você está aqui)
2. ⬜ **Backend API endpoints** (Spring Boot)
3. ⬜ **Conectar app ao backend**
4. ⬜ **Telas adicionais** (TaskDetail, CreateTask)
5. ⬜ **WatermelonDB** (DB local robusto)

---

**Versão**: 0.1.0 | **Framework**: Expo 50.0.0 | **Última atualização**: dezembro de 2024
