/**
 * Dashboard Screen
 * Welcome screen after successful login (MVP version)
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AuthService from '../services/AuthService';
import { AuthUser } from '../types/auth';

export default function DashboardScreen({ navigation }: { navigation: any }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AuthService.getUser();
      setUser(userData);
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>
            Olá, {user?.name || 'Usuário'}
          </Text>
          <Text style={styles.welcome}>
            bem vindo ao Preset CTO
          </Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userInfoRow}>
            <Text style={styles.infoLabel}>Usuário:</Text>
            <Text style={styles.infoValue}>{user?.username}</Text>
          </View>
          <View style={styles.userInfoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>

        {/* Feature Cards (MVP placeholders) */}
        <View style={styles.featureGrid}>
          <View style={[styles.featureCard, styles.featureCard1]}>
            <Text style={styles.featureIcon}>📋</Text>
            <Text style={styles.featureTitle}>Tarefas</Text>
            <Text style={styles.featureSubtitle}>Em breve</Text>
          </View>

          <View style={[styles.featureCard, styles.featureCard2]}>
            <Text style={styles.featureIcon}>👤</Text>
            <Text style={styles.featureTitle}>Perfil</Text>
            <Text style={styles.featureSubtitle}>Em breve</Text>
          </View>

          <View style={[styles.featureCard, styles.featureCard3]}>
            <Text style={styles.featureIcon}>⚙️</Text>
            <Text style={styles.featureTitle}>Configurações</Text>
            <Text style={styles.featureSubtitle}>Em breve</Text>
          </View>

          <View style={[styles.featureCard, styles.featureCard4]}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureTitle}>Relatórios</Text>
            <Text style={styles.featureSubtitle}>Em breve</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  header: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 4,
  },
  welcome: {
    fontSize: 16,
    color: '#757575',
    fontWeight: '500',
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#616161',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  featureCard: {
    width: '48%',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureCard1: {
    backgroundColor: '#E3F2FD',
  },
  featureCard2: {
    backgroundColor: '#F3E5F5',
  },
  featureCard3: {
    backgroundColor: '#E8F5E9',
  },
  featureCard4: {
    backgroundColor: '#FFF3E0',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  logoutButton: {
    height: 50,
    backgroundColor: '#EF5350',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
