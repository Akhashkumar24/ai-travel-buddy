// src/services/api.js
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (error.response?.status === 403) {
      toast.error('Access denied');
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Generic methods
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  delete: (url, config) => api.delete(url, config),
  patch: (url, data, config) => api.patch(url, data, config),

  // Trips
  getTrips: (params) => api.get('/trips', { params }),
  getTrip: (id) => api.get(`/trips/${id}`),
  createTrip: (data) => api.post('/trips', data),
  updateTrip: (id, data) => api.put(`/trips/${id}`, data),
  deleteTrip: (id) => api.delete(`/trips/${id}`),
  generateItinerary: (id) => api.post(`/trips/${id}/generate-itinerary`),
  regenerateSuggestions: (id) => api.post(`/trips/${id}/regenerate-suggestions`),

  // Chat
  sendChatMessage: (data) => api.post('/chat/message', data),
  getChatHistory: (tripId) => api.get(`/chat/history/${tripId}`),

  // Tools
  getWeather: (location, dates) => api.get('/tools/weather', { params: { location, ...dates } }),
  convertCurrency: (from, to, amount) => api.get('/tools/currency', { params: { from, to, amount } }),
  translateText: (text, from, to) => api.post('/tools/translate', { text, from, to }),
  searchPlaces: (query, location) => api.get('/tools/places', { params: { query, location } }),

  // User
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    return api.post('/users/upload-profile-picture', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
};

export default api;