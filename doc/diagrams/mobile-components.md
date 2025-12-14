# Preset CTO - Component Architecture (Mobile)

## React Native Component Hierarchy

```mermaid
graph TD
    App["App.tsx<br/>Root Component<br/>NavigationContainer"]
    
    subgraph Navigation["Navigation Layer"]
        RootNav["RootNavigator.tsx<br/>Auth-based conditional<br/>login vs dashboard"]
        LoginNav["Auth Stack<br/>LoginScreen"]
        AppTabs["App Tabs<br/>Dashboard + Profile"]
    end
    
    subgraph Screens["Screen Components"]
        LoginScreen["LoginScreen.tsx<br/>Email/Password login<br/>Light theme #F5F5F5"]
        DashboardScreen["DashboardScreen.tsx<br/>Welcome message<br/>User info display"]
        ProfileScreen["ProfileScreen.tsx<br/>User profile<br/>Logout button"]
        TaskListScreen["TaskListScreen.tsx<br/>Task management<br/>Pull-to-refresh"]
    end
    
    subgraph Services["Service Layer"]
        AuthService["AuthService.ts<br/>- login()<br/>- logout()<br/>- getCurrentUser()<br/>- Mock fallback"]
        ApiClient["ApiClient.ts<br/>- axios instance<br/>- interceptors<br/>- error handling"]
        SyncService["SyncService.ts<br/>- offline queue<br/>- sync logic<br/>- conflict resolution"]
    end
    
    subgraph Redux["Redux Store"]
        Store["Redux Store<br/>configureStore()"]
        AuthSlice["authSlice<br/>- token<br/>- user<br/>- loading<br/>- error"]
        SyncSlice["syncSlice<br/>- status<br/>- pendingChanges<br/>- lastSyncedAt<br/>- error"]
    end
    
    subgraph Components["Reusable Components"]
        ThemedText["ThemedText.tsx<br/>Styled text"]
        ThemedView["ThemedView.tsx<br/>Styled container"]
        HapticTab["HapticTab.tsx<br/>Tab with haptic"]
        ExternalLink["ExternalLink.tsx<br/>Link component"]
    end
    
    subgraph Storage["Storage Layer"]
        AsyncStorage["AsyncStorage<br/>- JWT token<br/>- user data<br/>- sync queue"]
        WatermelonDB["WatermelonDB<br/>- tasks table<br/>- users table<br/>- offline sync"]
    end
    
    subgraph Network["Network Layer"]
        NetInfo["NetInfo<br/>- online status<br/>- connection type<br/>- signal strength"]
        API["Backend API<br/>POST /api/v2/auth/login<br/>GET /api/v2/auth/me<br/>POST /api/v2/auth/logout"]
    end
    
    %% App to Navigation
    App --> RootNav
    
    %% Navigation to Screens
    RootNav -->|Not Authenticated| LoginNav
    RootNav -->|Authenticated| AppTabs
    LoginNav --> LoginScreen
    AppTabs --> DashboardScreen
    AppTabs --> ProfileScreen
    AppTabs --> TaskListScreen
    
    %% Screens to Services
    LoginScreen --> AuthService
    DashboardScreen --> AuthService
    ProfileScreen --> AuthService
    TaskListScreen --> SyncService
    
    %% Services to API
    AuthService --> ApiClient
    SyncService --> ApiClient
    ApiClient --> NetInfo
    NetInfo --> API
    
    %% Services to Redux
    AuthService --> Store
    Store --> AuthSlice
    Store --> SyncSlice
    
    %% Redux to Screens
    AuthSlice -.->|useSelector| LoginScreen
    AuthSlice -.->|useSelector| DashboardScreen
    SyncSlice -.->|useSelector| TaskListScreen
    
    %% Screens to Components
    LoginScreen --> ThemedText
    LoginScreen --> ThemedView
    DashboardScreen --> ThemedText
    DashboardScreen --> ThemedView
    ProfileScreen --> HapticTab
    TaskListScreen --> ThemedText
    
    %% Storage
    AuthService --> AsyncStorage
    SyncService --> AsyncStorage
    SyncService --> WatermelonDB
    AsyncStorage -.->|persist| Redux
    
    style App fill:#e1f5ff
    style Navigation fill:#f3e5f5
    style Screens fill:#fff3e0
    style Services fill:#f1f8e9
    style Redux fill:#fce4ec
    style Components fill:#ede7f6
    style Storage fill:#e0f2f1
    style Network fill:#fff9c4
```

## Data Flow in Components

```mermaid
graph LR
    User["👤 User<br/>Interaction"]
    Screen["Screen<br/>Component"]
    Dispatch["dispatch<br/>Action"]
    Reducer["Reducer<br/>Function"]
    State["Redux<br/>State"]
    Selector["useSelector<br/>Hook"]
    Service["Service<br/>Function"]
    API["Backend<br/>API"]
    
    User -->|onClick| Screen
    Screen -->|dispatch| Dispatch
    Dispatch -->|action| Reducer
    Reducer -->|mutate| State
    State -->|subscribe| Selector
    Selector -->|update| Screen
    Screen -->|call| Service
    Service -->|HTTP| API
    API -->|response| Service
    Service -->|dispatch| Dispatch
    
    style User fill:#ffeb3b
    style Screen fill:#fff3e0
    style Dispatch fill:#e1f5ff
    style Reducer fill:#f3e5f5
    style State fill:#fce4ec
    style Selector fill:#ede7f6
    style Service fill:#f1f8e9
    style API fill:#c8e6c9
```

## File Organization

```
mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx          # Login form + authentication
│   │   ├── LoginScreen.web.tsx      # Web-specific login
│   │   ├── DashboardScreen.tsx      # Welcome + user info
│   │   ├── ProfileScreen.tsx        # User profile + logout
│   │   ├── TaskListScreen.tsx       # Task management
│   │   └── index.ts                 # Exports
│   │
│   ├── navigation/
│   │   ├── RootNavigator.tsx        # Main navigation logic
│   │   ├── types.ts                 # Navigation types
│   │   └── index.ts                 # Exports
│   │
│   ├── store/
│   │   ├── index.ts                 # Store setup
│   │   └── slices/
│   │       ├── authSlice.ts         # Auth state logic
│   │       └── syncSlice.ts         # Sync state logic
│   │
│   ├── services/
│   │   ├── ApiClient.ts             # Axios HTTP client
│   │   ├── AuthService.ts           # Auth business logic
│   │   └── SyncService.ts           # Offline-first sync
│   │
│   ├── components/
│   │   ├── themed-text.tsx          # Reusable text
│   │   ├── themed-view.tsx          # Reusable container
│   │   ├── haptic-tab.tsx           # Tab with feedback
│   │   └── external-link.tsx        # Link component
│   │
│   ├── types/
│   │   ├── auth.ts                  # Auth interfaces
│   │   ├── sync.ts                  # Sync interfaces
│   │   └── index.ts                 # Exports
│   │
│   ├── constants/
│   │   └── theme.ts                 # Colors & styles
│   │
│   ├── hooks/
│   │   ├── use-color-scheme.ts      # Theme hook
│   │   └── use-theme-color.ts       # Color hook
│   │
│   ├── utils/
│   │   └── helpers.ts               # Helper functions
│   │
│   ├── App.tsx                      # App root
│   └── index.js                     # Entry point
│
├── public/
│   ├── index.html                   # Web login UI
│   ├── dashboard.html               # Web dashboard UI
│   └── favicon.png
│
├── metro.config.js                  # Metro bundler
├── tsconfig.json                    # TypeScript config
├── eslint.config.js                 # ESLint rules
├── package.json
└── README.md
```

## State Management Flow

```mermaid
graph TB
    subgraph "Redux Store"
        Store["Redux Store<br/>configureStore()"]
        
        subgraph "Auth Slice"
            AuthState["State:<br/>token: string<br/>user: User | null<br/>loading: boolean<br/>error: string | null"]
            AuthReducers["Reducers:<br/>setToken()<br/>setUser()<br/>setLoading()<br/>setError()"]
            AuthThunks["Thunks:<br/>login()<br/>logout()<br/>refreshToken()"]
        end
        
        subgraph "Sync Slice"
            SyncState["State:<br/>status: 'idle'|'syncing'<br/>lastSyncedAt: number<br/>pendingChanges: any[]<br/>error: string | null"]
            SyncReducers["Reducers:<br/>setSyncing()<br/>addPending()<br/>clearPending()<br/>setError()"]
            SyncThunks["Thunks:<br/>syncWithServer()<br/>handleOfflineQueue()"]
        end
        
        Store --> AuthState
        Store --> SyncState
        AuthState --> AuthReducers
        AuthState --> AuthThunks
        SyncState --> SyncReducers
        SyncState --> SyncThunks
    end
    
    subgraph "Components"
        Screen1["LoginScreen"]
        Screen2["DashboardScreen"]
        Screen3["TaskListScreen"]
    end
    
    subgraph "Hooks"
        useDispatch["useDispatch()"]
        useSelector["useSelector()"]
    end
    
    Screen1 -->|useDispatch| useDispatch
    Screen2 -->|useSelector| useSelector
    Screen3 -->|both| useDispatch
    Screen3 -->|both| useSelector
    
    useDispatch -->|dispatch actions| AuthThunks
    useDispatch -->|dispatch actions| SyncThunks
    AuthReducers -->|update| AuthState
    SyncReducers -->|update| SyncState
    useSelector -->|subscribe| AuthState
    useSelector -->|subscribe| SyncState
    
    style Store fill:#fce4ec
    style AuthState fill:#f3e5f5
    style SyncState fill:#f3e5f5
    style Screen1 fill:#fff3e0
    style Screen2 fill:#fff3e0
    style Screen3 fill:#fff3e0
```

## Authentication States

```mermaid
stateDiagram-v2
    [*] --> Loading
    
    Loading --> Unauthenticated: No token
    Loading --> Authenticated: Token found
    
    Unauthenticated --> Logging_In: Login attempt
    Logging_In --> Authenticated: Success
    Logging_In --> Login_Error: Failed
    Login_Error --> Unauthenticated: Retry
    
    Authenticated --> Refreshing: Token near expiry
    Refreshing --> Authenticated: Success
    Refreshing --> Unauthenticated: Failed
    
    Authenticated --> Logging_Out: Logout
    Logging_Out --> Unauthenticated: Cleared
    
    Authenticated --> Offline: Connection lost
    Offline --> Syncing: Connection restored
    Syncing --> Authenticated: Sync complete
    
    note right of Loading
        Check AsyncStorage for token
    end note
    
    note right of Logging_In
        POST /api/v2/auth/login
    end note
    
    note right of Offline
        Queue operations locally
    end note
    
    note right of Syncing
        POST /sync/push + GET /sync/pull
    end note
```

---

**Last Updated:** December 14, 2025 | Version: 1.0.2
