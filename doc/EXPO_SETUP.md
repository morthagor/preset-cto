# Rodando o App Mobile com Expo

## Status ✅

O app mobile agora usa **Expo** para evitar problemas de versão com React Native bare CLI. Expo gerencia todas as dependências nativas automaticamente.

## Pré-requisitos

- **Node.js**: v18+ (Verificado: v20.19.6) ✅
- **npm**: v9+ (Verificado: 10.8.2) ✅
- **Android Studio** ou **Android SDK** instalado para emulador (Veja [ANDROID_SDK_SETUP.md](../ANDROID_SDK_SETUP.md))
- **Expo Go** app (opcional, para testar no device físico)

## Instalação

### 1. Instalar Dependências

```bash
cd mobile
npm install --legacy-peer-deps
```

**Nota**: Usamos `--legacy-peer-deps` para compatibilidade com pacotes que ainda não foram completamente atualizados para Expo.

## Desenvolvimento

### 2. Iniciar o Servidor Expo

```bash
npm start
# ou
npx expo start
```

Você verá uma saída como:
```
   ╔─────────────────────────────────────────────────────────────────╗
   │                                                                 │
   │   Expo Go                                                       │
   │   ────────────────────────────────────────────────────────────  │
   │   http://localhost:8081                                         │
   │                                                                 │
   │   Android │ Scan with Expo Go                                   │
   │   iOS     │ Scan with Expo Go                                   │
   │                                                                 │
   ╚─────────────────────────────────────────────────────────────────╝
```

### 3. Testar no Android

#### Opção A: Emulador Android (Recomendado)

```bash
npm run android
```

Isso abre automaticamente no emulador Android se estiver em execução.

**Se o emulador não estiver rodando:**
```bash
# Listar emuladores disponíveis
emulator -list-avds

# Iniciar um emulador
emulator -avd <nome_do_emulador>
```

#### Opção B: Expo Go (Device Físico)

1. Instale o app **Expo Go** (Google Play Store)
2. Abra a câmera do seu device
3. Aponte para o QR code exibido no terminal ou no Expo Dev Tools

### 4. Testar no iOS

```bash
npm run ios
```

Requer Xcode instalado (Mac apenas).

### 5. Testar no Web

```bash
npm run web
```

Abre em http://localhost:19006

## Desenvolvimento com Hot Reload

Expo oferece hot reload automático:
- **Pressione `r`** no terminal para recarregar o app
- **Pressione `w`** para abrir no web
- **Pressione `a`** para abrir no Android
- **Pressione `i`** para abrir no iOS
- **Pressione `c`** para limpar o cache

## Estrutura do Projeto

```
mobile/
├── package.json              # Dependências Expo
├── app.json                  # Configuração do app Expo
├── src/
│   ├── screens/             # Telas (Login, TaskList, Profile)
│   ├── services/            # ApiClient, SyncService
│   ├── store/               # Redux store
│   ├── navigation/          # Navegação com React Navigation
│   ├── types/               # TypeScript types
│   └── components/          # Componentes reutilizáveis
├── App.tsx                  # Componente raiz com Redux Provider
├── index.js                 # Entry point
└── tsconfig.json            # TypeScript config
```

## Dependências Principais

| Pacote | Versão | Propósito |
|--------|--------|----------|
| `expo` | ^50.0.0 | Framework Expo para React Native |
| `react-native` | 0.73.0 | React Native (gerenciado pelo Expo) |
| `@react-navigation/*` | ^6.x | Navegação (tabs, stacks) |
| `@reduxjs/toolkit` | ^1.9.7 | State management |
| `axios` | ^1.6.5 | HTTP client com JWT |
| `@react-native-async-storage/async-storage` | ^1.21.0 | Local storage |
| `@react-native-community/netinfo` | ^11.0.0 | Network detection |

## Fluxo da Aplicação

```
App.tsx
├── Redux Provider
├── NavigationContainer
│   └── RootNavigator
│       ├── LoginScreen (sem token)
│       │   ├── Input: Código do Funcionário
│       │   ├── Input: Senha
│       │   └── Button: Entrar (mock API)
│       │
│       └── MainTabs (com token)
│           ├── TaskListScreen (Stack)
│           │   ├── Lista de tarefas
│           │   ├── Pull-to-refresh
│           │   └── FAB: Nova tarefa
│           │
│           └── ProfileScreen (Stack)
│               ├── Dados do usuário
│               ├── Last sync timestamp
│               └── Button: Logout

Redux Store
├── authSlice (token, user, loading)
├── syncSlice (status, lastSyncedAt, pendingChanges)
└── Hooks: useAppDispatch, useAppSelector
```

## Testes

```bash
# Rodar testes
npm test

# Rodar com watch mode
npm test -- --watch
```

## Lint

```bash
# Verificar erros de linting
npm run lint

# Corrigir automaticamente
npx eslint . --ext .ts,.tsx --fix
```

## Build para Produção

### Android

```bash
# Criar APK
eas build --platform android --type apk

# Ou build local (requer Android SDK)
cd android && ./gradlew assembleRelease
```

### iOS

```bash
# Criar IPA (requer macOS com Xcode)
eas build --platform ios
```

## Troubleshooting

### "Cannot find module '@expo/vector-icons'"

```bash
npm install expo-vector-icons --legacy-peer-deps
```

### "Metro bundler error"

```bash
# Limpar cache
npm start -- --clear

# Ou
npx expo start -c
```

### App não atualiza após mudanças

```bash
# Pressione 'r' no terminal do expo ou:
npm start -- --clear
```

### Emulador não abre

```bash
# Verificar se o emulador está rodando
emulator -list-avds

# Iniciar manualmente
$ANDROID_HOME/emulator/emulator -avd <nome>
```

### "Cannot resolve react-native"

```bash
# Deletar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## Próximos Passos

1. **Conectar Backend**: Atualizar `ApiClient.ts` para apontar para seu servidor
   ```typescript
   const API_BASE_URL = 'http://192.168.x.x:8080/api'; // Seu servidor
   ```

2. **Configurar Sincronização**: Ajustar `SyncService.ts` para sua estratégia de sync

3. **Adicionar mais Screens**: TaskDetailScreen, CreateTaskScreen, SettingsScreen

4. **Implementar WatermelonDB**: Para banco de dados local mais robusto

5. **CI/CD**: Configurar GitHub Actions para builds automáticos

## Recursos Úteis

- [Documentação Expo](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Expo EAS Build](https://docs.expo.dev/build/introduction/)

## Resumo de Comandos

```bash
# Instalar
npm install --legacy-peer-deps

# Desenvolvimento
npm start                    # Iniciar dev server
npm run android             # Abrir no Android
npm run ios                 # Abrir no iOS
npm run web                 # Abrir no web

# Testes e Lint
npm test                    # Rodar testes
npm run lint                # Verificar linting

# Produção
eas build --platform android
eas build --platform ios
```

---

**Criado em**: dezembro de 2024  
**Atualizado**: Migração para Expo (resolvido npm install issues)  
**Versão Expo**: 50.0.0  
**Versão React Native**: 0.73.0
