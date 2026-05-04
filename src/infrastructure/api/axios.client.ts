import axios from 'axios';
import { tokenService } from './auth/token.service';

const baseURL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:8000/480project';
export const axiosClient = axios.create({ baseURL });

axiosClient.interceptors.request.use((config) => {
  const token = tokenService.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    // tokenService.remove();
    // window.location.href = '/login';
  }
  return Promise.reject(error);
});
