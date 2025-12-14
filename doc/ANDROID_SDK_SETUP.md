# 🔧 Guia: Instalar Android SDK no Ubuntu 24.04.3

Instruções completas para configurar Android SDK e ferramentas de desenvolvimento Android no Ubuntu 24.04.3.

---

## 📋 Pré-requisitos

```bash
# Atualize o sistema
sudo apt update && sudo apt upgrade -y

# Instale dependências
sudo apt install -y \
  openjdk-21-jdk \
  git \
  curl \
  unzip \
  build-essential \
  libssl-dev \
  libffi-dev \
  python3-dev \
  wget
```

Verifique a instalação do Java:
```bash
java -version
```

Você deve ver algo como:
```
openjdk version "21.0.x" 2025-...
```

---

## 1️⃣ Baixar Android SDK

### Opção A: Usar Android Command Line Tools (Recomendado)

```bash
# Crie diretório para Android
mkdir -p ~/Android/Sdk
cd ~/Android/Sdk

# Baixe Android Command Line Tools (substitua a URL pela versão mais recente)
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip

# Descompacte
unzip commandlinetools-linux-11076708_latest.zip

# Organize as pastas
mkdir -p cmdline-tools/latest
mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || true
rm -f cmdline-tools-linux-11076708_latest.zip

# Verifique a estrutura
ls -la ~/Android/Sdk/
```

### Opção B: Usar Android Studio (Completo, com IDE)

Se preferir uma solução mais integrada com IDE:

```bash
# Baixe Android Studio
wget https://dl.google.com/android/studio/ide-zips/2024.1.1.12/android-studio-2024.1.1.12-linux.tar.gz

# Descompacte
tar -xzf android-studio-2024.1.1.12-linux.tar.gz
mv android-studio ~/.local/share/ # ou /opt/android-studio

# Remova o arquivo baixado
rm android-studio-2024.1.1.12-linux.tar.gz

# Execute Android Studio (primeira vez demora, instala SDK)
~/.local/share/android-studio/bin/studio.sh
```

---

## 2️⃣ Configurar Variáveis de Ambiente

Abra seu arquivo de configuração do shell:

```bash
# Se usa bash
nano ~/.bashrc

# Se usa zsh
nano ~/.zshrc

# Se usa fish
nano ~/.config/fish/config.fish
```

**Adicione estas linhas** (no final do arquivo):

```bash
# Android SDK
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/cmdline-tools/latest/bin:$PATH
export PATH=$ANDROID_HOME/emulator:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH
export PATH=$ANDROID_HOME/tools:$PATH
export PATH=$ANDROID_HOME/tools/bin:$PATH

# Java (JDK 21)
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH
```

**Recarregue o arquivo**:

```bash
# Se bash
source ~/.bashrc

# Se zsh
source ~/.zshrc

# Se fish
source ~/.config/fish/config.fish
```

**Verifique**:

```bash
echo $ANDROID_HOME
echo $JAVA_HOME
which adb
```

---

## 3️⃣ Instalar SDK Platforms e Build Tools

Usando `sdkmanager` (command line tools):

```bash
# Aceite licenças
yes | sdkmanager --licenses

# Instale platform-tools (adb, fastboot, etc)
sdkmanager "platform-tools"

# Instale build tools (versão mais recente)
sdkmanager "build-tools;35.0.0"

# Instale SDK para Android 16+ (API 34+)
sdkmanager "platforms;android-34"
sdkmanager "platforms;android-35"

# Instale emulator (opcional, para testes)
sdkmanager "emulator"

# Instale extras
sdkmanager "extras;google;USB_Driver"
sdkmanager "extras;android;m2repository"
```

**Ou via Android Studio**:
1. Abra Android Studio
2. Vá em **Settings → SDK Manager**
3. Marque as versões desejadas (Android 34, 35, etc)
4. Clique **Apply** e **OK**

---

## 4️⃣ Verificar Instalação

```bash
# Verifique o adb
adb version

# Verifique o sdkmanager
sdkmanager --list_installed

# Verifique o emulator
emulator -version
```

Resultado esperado:
```
Android Debug Bridge version 1.0.41
SDK Tools Version: 35.0.0
...
```

---

## 5️⃣ Configurar Emulator (Opcional)

Se quer testar o app com emulator em vez de device físico:

### Criar AVD (Android Virtual Device)

```bash
# Listar devices disponíveis
avdmanager list device

# Criar novo device (Pixel 4a, Android 34)
avdmanager create avd \
  --name "Pixel4a_API34" \
  --device "pixel_4a" \
  --package "system-images;android-34;google_apis;x86_64"

# Ou via Android Studio GUI
# Android Studio → Device Manager → Create Device
```

### Rodar Emulator

```bash
# Iniciar emulator criado
emulator -avd Pixel4a_API34 &

# Verificar se conectou
adb devices

# Esperado:
# List of attached devices
# emulator-5554          device
```

---

## 6️⃣ Conectar Device USB (Físico)

Se quer testar em device físico:

### 1. Habilitar USB Debugging no Device

1. Vá em **Settings → About Phone**
2. Toque 7 vezes em **Build Number**
3. Retorne a **Settings → Developer Options**
4. Ative **USB Debugging**

### 2. Conectar USB

```bash
# Conecte o device via USB

# Aceite a prompt no device

# Verifique a conexão
adb devices

# Esperado:
# List of attached devices
# RF8N50F5FQK         device
```

### 3. Conceder Permissões (se necessário)

```bash
# Se adb mostra "unauthorized"
adb kill-server
adb devices
# Aceite a prompt novamente no device
```

---

## 7️⃣ Testar com React Native

Agora que Android SDK está configurado, pode rodar React Native:

```bash
# No diretório do mobile app
cd ~/Documentos/02.apps/03.preset-cto/cto/mobile

# Rode o app
npm run android

# Ou com device específico
adb devices  # liste dispositivos
npx react-native run-android --deviceId=RF8N50F5FQK
```

---

## ⚠️ Problemas Comuns

### ❌ "ANDROID_HOME not found"

```bash
# Verifique se as variáveis foram adicionadas
echo $ANDROID_HOME

# Se vazio, execute
source ~/.bashrc  # ou ~/.zshrc

# Ou reinicie o terminal
```

### ❌ "sdkmanager: command not found"

```bash
# Verifique o PATH
echo $PATH

# Se não tem cmdline-tools, baixe novamente
mkdir -p ~/Android/Sdk/cmdline-tools
cd ~/Android/Sdk/cmdline-tools
wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip
unzip commandlinetools-linux-11076708_latest.zip
```

### ❌ "gradle: command not found" (ao rodar `npm run android`)

```bash
# Você não precisa instalar Gradle separadamente!
# React Native o instala automaticamente via Gradle Wrapper (gradlew)

# Se der erro, teste o gradle wrapper direto
cd mobile/android
./gradlew --version
```

### ❌ "Cannot accept license"

```bash
# Aceite todas as licenças
yes | sdkmanager --licenses

# Ou manualmente
sdkmanager --licenses
# Digite 'y' para cada pergunta
```

### ❌ "Emulator won't start"

```bash
# Verifique se VT-x/KVM está habilitado (processador)
grep -c -w vmx /proc/cpuinfo  # Intel

# Se resultado > 0, está ok
# Se 0, você precisa ativar no BIOS

# Ou use o emulator em modo software (mais lento)
emulator -avd Pixel4a_API34 -no-accel
```

---

## 📋 Checklist de Instalação

- [ ] Java JDK 21 instalado (`java -version`)
- [ ] Android SDK em `~/Android/Sdk`
- [ ] Variáveis de ambiente (`$ANDROID_HOME`, `$JAVA_HOME`)
- [ ] Platform-tools instalado (`adb --version`)
- [ ] SDK Platforms instalado (`sdkmanager --list_installed`)
- [ ] Build-tools instalado
- [ ] Device USB conectado ou Emulator criado (`adb devices`)
- [ ] React Native app consegue rodar (`npm run android`)

---

## 🚀 Próximo Passo

Após completar a instalação:

```bash
cd ~/Documentos/02.apps/03.preset-cto/cto/mobile

# Instale dependências
npm install

# Rode o app
npm run android
```

Se tudo funcionar, você verá a tela de login do Preset CTO no device! 🎉

---

## 📚 Links Úteis

- [Android Developers Setup](https://developer.android.com/studio/command-line)
- [Android SDK Platforms](https://developer.android.com/sdk/platform-tools)
- [Android Emulator Documentation](https://developer.android.com/studio/run/emulator)
- [React Native Android Setup](https://reactnative.dev/docs/environment-setup)

---

**Última atualização:** 2025-12-13
