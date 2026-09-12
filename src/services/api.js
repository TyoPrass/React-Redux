import axios from 'axios';
import { getAccessToken } from '../utils/storage';

export const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Terjadi kesalahan saat memproses permintaan.';
    return Promise.reject(new Error(message));
  }
);

export default api;
