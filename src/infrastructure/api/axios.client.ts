import axios from 'axios';
import { tokenService } from './auth/token.service';
import { TokenExpiredError } from '@/domain/auth/errors/token-expired.error';
import { UnauthorizedError } from '@/domain/auth/errors/unauthorized.error';
import { handleAuthError } from '@/application/auth/authErrorHandler';

const baseURL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:8000/480project';
export const axiosClient = axios.create({ baseURL });

axiosClient.interceptors.request.use((config) => {
  const token = tokenService.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isExpired = error.response?.data?.message === "Expired JWT Token";
      tokenService.remove();
      handleAuthError(isExpired ? new TokenExpiredError() : new UnauthorizedError());
    }
    return Promise.reject(error);
  }
);
