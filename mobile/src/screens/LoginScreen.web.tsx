/**
 * Web-specific Login Screen
 * Simplified version for web testing without complex React Native components
 */

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView, SafeAreaView } from 'react-native';
import AuthService from '../services/AuthService';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState('morthagor');
  const [password, setPassword] = useState('wp1234wp');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const response = await AuthService.login({
        username,
        password,
      });

      if (response.success) {
        navigation.replace('Dashboard');
      } else {
        Alert.alert('Erro de Login', response.message || 'Falha ao autenticar');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao tentar fazer login');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.headerSection}>
            <Text style={styles.appTitle}>Preset CTO</Text>
            <Text style={styles.appSubtitle}>Sistema de Gestão Privado</Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuário</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu usuário"
                placeholderTextColor="#B0BEC5"
                value={username}
                onChangeText={setUsername}
                editable={!loading}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite sua senha"
                placeholderTextColor="#B0BEC5"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footerSection}>
            <Text style={styles.footerText}>
              Para o MVP, use:
            </Text>
            <Text style={styles.credentialsText}>
              Usuário: morthagor
            </Text>
            <Text style={styles.credentialsText}>
              Senha: wp1234wp
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  headerSection: {
    marginBottom: 60,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  formSection: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#212121',
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    height: 50,
    backgroundColor: '#1976D2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonDisabled: {
    backgroundColor: '#90CAF9',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footerSection: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 8,
  },
  credentialsText: {
    fontSize: 12,
    color: '#757575',
    fontStyle: 'italic',
  },
});
