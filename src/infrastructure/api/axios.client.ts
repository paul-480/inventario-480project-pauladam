import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:8000/480project';
export const axiosClient = axios.create({ baseURL });

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
});
