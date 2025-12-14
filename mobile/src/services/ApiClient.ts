import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
    });

    // Add token to requests
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle response errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          await AsyncStorage.removeItem('auth_token');
          // Dispatch logout action
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string) {
    const response = await this.client.post('/auth/login', { email, password });
    return response.data;
  }

  async getProfile() {
    const response = await this.client.get('/auth/profile');
    return response.data;
  }

  async getTasks() {
    const response = await this.client.get('/tasks');
    return response.data;
  }

  async getTask(id: string) {
    const response = await this.client.get(`/tasks/${id}`);
    return response.data;
  }

  async createTask(data: any) {
    const response = await this.client.post('/tasks', data);
    return response.data;
  }

  async updateTask(id: string, data: any) {
    const response = await this.client.put(`/tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: string) {
    await this.client.delete(`/tasks/${id}`);
  }

  async syncPush(changes: any[]) {
    const response = await this.client.post('/sync/push', {
      changes,
      deviceId: await this.getDeviceId(),
      timestamp: new Date().toISOString(),
    });
    return response.data;
  }

  async syncPull(lastSyncTimestamp: string) {
    const response = await this.client.get('/sync/pull', {
      params: {
        lastSyncTimestamp,
        deviceId: await this.getDeviceId(),
      },
    });
    return response.data;
  }

  async checkMobileUpdate(currentVersion: string, platform: 'android' | 'ios') {
    const response = await this.client.get('/updates/mobile', {
      params: { currentVersion, platform },
    });
    return response.data;
  }

  private async getDeviceId(): Promise<string> {
    let deviceId = await AsyncStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = `device-${Date.now()}`;
      await AsyncStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  }
}

export const apiClient = new ApiClient();
