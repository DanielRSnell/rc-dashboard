// API Module Index
// This file serves as the main entry point for the API module

import { AxiosInstance } from 'axios';
import axios from 'axios';

// Export all controllers
export * from './controllers';

// Export types
export * from './types';

// Base API configuration
const API_BASE_URL = 'https://hpc.dev-ai4jobs.com/hpcnck';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    // const token = localStorage.getItem('auth_token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global error responses here
    // For example, redirect to login if 401 unauthorized
    return Promise.reject(error);
  }
);

export default apiClient;
