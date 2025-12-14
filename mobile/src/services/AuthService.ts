/**
 * Authentication Service
 * Handles login, logout, and token management
 * API Version: v2
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, AuthResponse, AuthUser } from '../types/auth';

const STORAGE_KEYS = {
  TOKEN: '@preset_cto_token',
  USER: '@preset_cto_user',
  LAST_LOGIN: '@preset_cto_last_login',
};

const API_BASE_URL = 'http://localhost:8080/api/v2';

// Mock credentials for MVP
const MOCK_CREDENTIALS = {
  username: 'morthagor',
  password: 'wp1234wp',
};

class AuthService {
  /**
   * Login user with credentials (v2)
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Try to call real API first
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          deviceId: undefined, // Optional: can add device identifier
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        if (data.success) {
          // Save to AsyncStorage
          await AsyncStorage.multiSet([
            [STORAGE_KEYS.TOKEN, data.token],
            [STORAGE_KEYS.USER, JSON.stringify(data.user)],
            [STORAGE_KEYS.LAST_LOGIN, new Date().toISOString()],
          ]);

          return {
            success: true,
            token: data.token,
            user: data.user,
          };
        } else {
          return {
            success: false,
            message: data.message || 'Falha ao autenticar',
          };
        }
      } else {
        // Fallback to mock for MVP development
        return this.loginMock(credentials);
      }
    } catch (error) {
      console.warn('API request failed, using mock:', error);
      // Fallback to mock authentication for development
      return this.loginMock(credentials);
    }
  }

  /**
   * Mock login for MVP development
   */
  private async loginMock(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate credentials
      if (
        credentials.username === MOCK_CREDENTIALS.username &&
        credentials.password === MOCK_CREDENTIALS.password
      ) {
        const user: AuthUser = {
          id: '1',
          username: 'morthagor',
          name: 'Morthagor',
          email: 'morthagor@presetcto.com',
        };

        const token = `mock_jwt_token_${Date.now()}`;

        // Save to AsyncStorage
        await AsyncStorage.multiSet([
          [STORAGE_KEYS.TOKEN, token],
          [STORAGE_KEYS.USER, JSON.stringify(user)],
          [STORAGE_KEYS.LAST_LOGIN, new Date().toISOString()],
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
      console.error('Mock login error:', error);
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
      // Call logout endpoint if available
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${await this.getToken()}`,
        },
      }).catch(() => {
        // Ignore errors on logout endpoint
      });

      // Clear local storage
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER,
        STORAGE_KEYS.LAST_LOGIN,
      ]);
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
   * Get last login timestamp
   */
  async getLastLogin(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.LAST_LOGIN);
    } catch (error) {
      console.error('Get last login error:', error);
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
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.LAST_LOGIN,
    ]);
  }

  /**
   * Get current user from API (v2)
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const token = await this.getToken();
      
      if (!token) {
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        return await this.getUser();
      }
    } catch (error) {
      console.warn('Error getting current user from API:', error);
      return await this.getUser();
    }
  }
}

export default new AuthService();
