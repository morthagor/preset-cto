/**
 * Authentication Service
 * Handles login, logout, and token management
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, AuthResponse, AuthUser } from '../types/auth';

const STORAGE_KEYS = {
  TOKEN: '@preset_cto_token',
  USER: '@preset_cto_user',
};

// Mock credentials for MVP
const MOCK_CREDENTIALS = {
  username: 'morthagor',
  password: 'wp1234wp',
};

class AuthService {
  /**
   * Login user with credentials
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate credentials (mock authentication)
      if (
        credentials.username === MOCK_CREDENTIALS.username &&
        credentials.password === MOCK_CREDENTIALS.password
      ) {
        // Mock user object
        const user: AuthUser = {
          id: '1',
          username: 'morthagor',
          name: 'Morthagor',
          email: 'morthagor@presetcto.com',
        };

        // Generate mock token
        const token = `mock_jwt_token_${Date.now()}`;

        // Save to AsyncStorage
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.TOKEN, token],
          [STORAGE_KEYS.USER, JSON.stringify(user)],
        ]);

        return {
          success: true,
          token,
          user,
        };
      }

      return {
        success: false,
        message: 'Usuário ou senha inválido',
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Erro ao fazer login',
      };
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  /**
   * Get stored token
   */
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }

  /**
   * Get stored user
   */
  async getUser(): Promise<AuthUser | null> {
    try {
      const userJson = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  /**
   * Clear all auth data
   */
  async clearAuth(): Promise<void> {
    await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USER]);
  }
}

export default new AuthService();
