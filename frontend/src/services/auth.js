// src/services/auth.js
import api from './api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response;
  },

  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response;
  },

  getProfile: async (token) => {
    const response = await api.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  },

  updateProfile: async (profileData, token) => {
    const response = await api.put('/auth/profile', profileData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  },

  changePassword: async (passwordData, token) => {
    const response = await api.post('/auth/change-password', passwordData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response;
  }
};