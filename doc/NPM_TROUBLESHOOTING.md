# 🔧 Troubleshooting: npm install — React Native

Soluções para erros comuns ao instalar dependências do projeto mobile.

---

## ❌ Erro: "No matching version found for @react-native/babel-preset"

### Causa
A versão `^0.72.0` não existe no npm. React Native 0.72 usa versões específicas de pacotes.

### ✅ Solução 1: Atualizar Node.js (Recomendado)

React Native 0.72 funciona melhor com **Node.js 18+**.

```bash
# Verifique sua versão
node --version
npm --version

# Esperado: Node v18.x ou superior

# Se tem versão antiga, atualize via nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Instale Node 20 LTS (recomendado)
nvm install 20
nvm use 20

# Verifique
node --version  # v20.x.x
npm --version   # v10.x.x
```

### ✅ Solução 2: Limpar cache npm e package-lock

```bash
# Limpe o cache npm
npm cache clean --force

# Remova node_modules e package-lock
rm -rf node_modules package-lock.json

# Instale novamente
npm install
```

### ✅ Solução 3: Usar versões exatas (Já aplicado)

O `package.json` foi atualizado com versões exatas comprovadas:

```json
{
  "@react-native/babel-preset": "0.72.11",
  "@react-native/eslint-config": "0.72.11",
  "@react-native/metro-config": "0.72.11"
}
```

Agora tente:
```bash
npm install
```

---

## ❌ Erro: "npm ERR! ERESOLVE unable to resolve dependency tree"

### Causa
Conflito entre versões de dependências.

### ✅ Solução

```bash
# Use --legacy-peer-deps (ignora peer dependencies)
npm install --legacy-peer-deps

# Ou limpe e tente novamente
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## ❌ Erro: "command not found: react-native"

### Causa
`react-native` CLI não foi instalado globalmente ou node_modules não foi criado.

### ✅ Solução

```bash
# Certifique que npm install completou
npm install

# Use npx para rodar
npx react-native --version

# Ou rode o app via npm script
npm run android
```

---

## ❌ Erro: "Cannot find module '@babel/core'"

### Causa
Dependências de desenvolvimento não foram instaladas.

### ✅ Solução

```bash
# Instale com devDependencies
npm install --save-dev

# Ou limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

---

## ❌ Erro: "Metro bundler won't start"

### Causa
Porta 8081 em uso ou cache Metro corrompido.

### ✅ Solução

```bash
# Limpe cache Metro
npm start -- --reset-cache

# Ou mate processo na porta 8081
lsof -ti:8081 | xargs kill -9

# Tente novamente
npm run android
```

---

## ❌ Erro: "Java version mismatch"

### Causa
React Native 0.72 precisa de Java 11+, mas configuração aponta para versão antiga.

### ✅ Solução

```bash
# Verifique Java
java -version

# Instale Java 21 se necessário
sudo apt install openjdk-21-jdk

# Configure JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Adicione a ~/.bashrc ou ~/.zshrc para persistência
echo 'export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

---

## ❌ Erro: "Gradle build failed"

### Causa
Gradle não conseguiu baixar dependências (internet, proxy, etc).

### ✅ Solução

```bash
# Limpe gradle cache
cd mobile/android
./gradlew clean
cd ../..

# Tente novamente
npm run android

# Ou force download das dependências
cd mobile/android
./gradlew --refresh-dependencies
cd ../..
```

---

## 📋 Passo a Passo Recomendado (Se Tudo Falhar)

```bash
# 1. Verifique Node.js (18+)
node --version
npm --version

# 2. Atualize npm
npm install -g npm@latest

# 3. Limpe tudo
rm -rf ~/Doc/02/03.preset-cto/cto/mobile/node_modules
rm -rf ~/Doc/02/03.preset-cto/cto/mobile/package-lock.json
rm -rf ~/.npm/_cacache  # limpa cache npm

# 4. Instale com legacy peer deps
cd ~/Doc/02/03.preset-cto/cto/mobile
npm install --legacy-peer-deps

# 5. Se ainda não funcionar, teste sem react-native-vector-icons
# (este pode ter conflitos ocasionais)
npm install --no-optional
```

---

## ✅ Checklist de Instalação Bem-sucedida

Após `npm install`, verifique:

```bash
# 1. node_modules foi criado
ls node_modules | grep react-native

# 2. Pacotes importantes existem
ls node_modules | grep @react-native/babel-preset
ls node_modules/@react-native/

# 3. React Native CLI funciona
npx react-native --version
# Esperado: 0.72.x

# 4. Babel funciona
npx babel --version
# Esperado: 7.23.x
```

---

## 🚀 Próximo Passo

Após npm install com sucesso:

```bash
# Instale dependências de emulator/device (se necessário)
cd mobile/android
./gradlew dependencies
cd ../..

# Rode o app
npm run android
```

---

## 📚 Versões Comprovadas

| Pacote | Versão | Status |
|--------|--------|--------|
| Node.js | 18+ (recomendado 20 LTS) | ✅ Testado |
| npm | 9+ (recomendado 10) | ✅ Testado |
| React Native | 0.72.0+ | ✅ Testado |
| @react-native/babel-preset | 0.72.11 | ✅ Funciona |
| Java | 21 | ✅ Compatível |

---

## 💡 Dica

Se estiver com pressa, use:

```bash
npm install --legacy-peer-deps --no-optional
```

Isso ignora dependências opcionais que podem causar conflitos.

---

**Última atualização:** 2025-12-13
