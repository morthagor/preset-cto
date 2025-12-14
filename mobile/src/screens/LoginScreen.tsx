import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { setLoading, setToken, setUser, setError } from '../store/slices/authSlice';
import { apiClient } from '../services/ApiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  logoSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF3B30',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  demoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
});

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [employeeCode, setEmployeeCode] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async () => {
    if (!employeeCode || !password) {
      dispatch(setError('Código do Funcionário e Senha são obrigatórios'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      // For demo: use mock login (backend not needed yet)
      if (employeeCode === 'demo' && password === '123456') {
        const mockToken = 'mock_jwt_token_' + Date.now();
        const mockUser = {
          id: '1',
          name: 'Funcionário Demo',
          email: 'demo@presetcto.local',
          employeeCode: employeeCode,
        };

        await AsyncStorage.setItem('auth_token', mockToken);
        dispatch(setToken(mockToken));
        dispatch(setUser(mockUser));
        navigation.replace('MainTabs');
      } else {
        // Try real API (if backend is running)
        try {
          const response = await apiClient.login(employeeCode, password);
          await AsyncStorage.setItem('auth_token', response.token);
          dispatch(setToken(response.token));
          dispatch(setUser(response.user));
          navigation.replace('MainTabs');
        } catch (apiError: any) {
          // Fallback to demo if API fails
          dispatch(setError('API indisponível. Use credenciais demo: 123456'));
        }
      }
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'Erro ao fazer login. Tente novamente.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDemoLogin = async () => {
    setEmployeeCode('demo');
    setPassword('123456');
    // Trigger login after state update
    setTimeout(() => {
      handleLogin();
    }, 0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Preset CTO</Text>
        <Text style={styles.logoSubtitle}>Sistema de Gestão Privado</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.formContainer}>
        <Text style={styles.label}>Código do Funcionário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu código"
          keyboardType="default"
          value={employeeCode}
          onChangeText={setEmployeeCode}
          editable={!isLoading}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDemoLogin}
          disabled={isLoading}
          activeOpacity={0.7}
        >
          <Text style={styles.demoText}>
            Demo: Toque aqui para teste rápido
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
