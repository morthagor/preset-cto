import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  syncInfo: {
    fontSize: 12,
    color: '#999',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 1,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
  },
});

export const ProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const lastSyncedAt = useAppSelector((state) => state.sync.lastSyncedAt);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth_token');
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.userCard}>
        <Text style={styles.userName}>{user?.name || 'Usuário'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        {lastSyncedAt && (
          <Text style={styles.syncInfo}>
            Última sincronização: {new Date(lastSyncedAt).toLocaleString('pt-BR')}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Icon name="cog" size={24} color="#007AFF" />
        <Text style={styles.buttonText}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Icon name="information" size={24} color="#007AFF" />
        <Text style={styles.buttonText}>Sobre</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Icon name="logout" size={24} color="#fff" />
        <Text style={[styles.buttonText, styles.logoutButtonText]}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
