# 🚀 Guia de Testes do Preset CTO Mobile (v2)

## ✅ Pré-requisitos
- Node.js 18+ instalado
- npm 9+ instalado
- Android Studio (para emulador Android) ou Xcode (para iOS no macOS)
- Docker com PostgreSQL rodando (para testar com backend real)

---

## 📋 Passo a Passo

### **1. Instalar Dependências** (se não instalado ainda)
```bash
cd mobile
npm install
```

### **2. Iniciar o Metro Bundler**
```bash
npm start
```

Você verá um menu interativo com opções:
```
› Press a │ open Android
› Press i │ open iOS  
› Press w │ open web
› Press r │ reload app
› Press m │ toggle menu
```

### **3. Escolher Plataforma de Teste**

#### **Opção A: Android (Emulador)**
```bash
# No menu, pressione: a
Press a

# Ou diretamente:
npm run android
```

**Requisitos:**
- Android Studio instalado
- Emulador criado no Android Studio
- Emulador rodando

#### **Opção B: iOS (macOS apenas)**
```bash
# No menu, pressione: i
Press i

# Ou diretamente:
npm run ios
```

**Requisitos:**
- macOS com Xcode
- Xcode Command Line Tools

#### **Opção C: Web (Mais Rápido para Testes)**
```bash
# No menu, pressione: w
Press w

# Ou diretamente:
npm run web
```

**Vantagens:**
- ✅ Rápido de carregar
- ✅ Sem emulador necessário
- ✅ Acesso via navegador

---

## 🧪 Testando a Autenticação

### **Credenciais de Teste (MVP)**
```
Usuário: morthagor
Senha: wp1234wp
```

### **Cenários de Teste**

#### **Teste 1: Login com Credenciais Corretas**
1. Abra a tela de login
2. Digite: `morthagor`
3. Digite: `wp1234wp`
4. Clique: "Entrar"
5. **Resultado esperado**: Redirecionado para Dashboard com "Olá, Morthagor bem vindo ao Preset CTO"

#### **Teste 2: Login com Credenciais Incorretas**
1. Digite usuário inválido
2. Digite senha incorreta
3. Clique: "Entrar"
4. **Resultado esperado**: Mensagem de erro "Usuário ou senha inválido"

#### **Teste 3: Logout**
1. Na tela Dashboard, clique: "Sair"
2. **Resultado esperado**: Voltou para a tela de Login

#### **Teste 4: Validação de Campos Vazios**
1. Deixe os campos vazios
2. Clique: "Entrar"
3. **Resultado esperado**: Mensagem "Por favor, preencha todos os campos"

---

## 🔗 Testando com Backend Real (Opcional)

### **Se quiser testar integração com backend de verdade:**

#### **1. Inicie o Docker**
```bash
cd cto
docker-compose up -d
```

#### **2. Inicie o Backend**
```bash
cd backend
mvn clean spring-boot:run
```

#### **3. Configure a URL da API no Mobile**
No arquivo `mobile/src/services/AuthService.ts`, certifique-se de que:
```typescript
const API_BASE_URL = 'http://localhost:8080/api/v2';
```

#### **4. Inicie o Mobile**
```bash
cd mobile
npm start
```

#### **5. Teste o Login**
- Use as credenciais: `morthagor` / `wp1234wp`
- O app fará requisição real ao backend
- Verá resposta com token JWT e dados do usuário

---

## 🎨 O Que Você Verá

### **Tela de Login**
- Cores claras (cinza e branco)
- Logo "Preset CTO"
- Campos: Usuário e Senha
- Botão: Entrar
- Credenciais de teste exibidas

### **Tela de Dashboard**
- Saudação: "Olá, Morthagor bem vindo ao Preset CTO"
- Card com dados do usuário
- Grid com 4 cards de funcionalidades (em breve)
- Botão vermelho: Sair

---

## 📱 Problemas Comuns & Soluções

| Problema | Solução |
|----------|---------|
| `npm: command not found` | Instale Node.js 18+ |
| Emulador não abre | Inicie o Android Studio e crie/inicie um emulador |
| Metro bundler erro | Delete `node_modules` e execute `npm install` novamente |
| Porta 19000 em uso | Mude a porta: `expo start -p 19001` |
| App não conecta ao backend | Verifique se backend está rodando em `localhost:8080` |

---

## ✨ Dicas

1. **Ler Logs**: No Metro bundler, você vê logs do app em tempo real
2. **Recarregar**: Pressione `r` no menu para recarregar o app
3. **Debug**: Abra DevTools com `d` para inspecionar código
4. **Slow Mode**: Pressione `s` para simular conexão lenta

---

## 🎯 Próximas Fases

- ✅ Fase 1: Telas de Login e Dashboard (PRONTO)
- ⏳ Fase 2: Lista de Tarefas e CRUD
- ⏳ Fase 3: Sincronização Offline-First
- ⏳ Fase 4: Sistema de Notificações

---

## 📝 Notas

- O app está em **MVP** com autenticação básica
- Funciona com **mock** (sem backend) ou com **backend real**
- Está pronto para **React Native** compilar para APK/IPA
- Todos os dados salvos em **AsyncStorage** (persistência local)

---

**Sucesso nos testes! 🚀**
