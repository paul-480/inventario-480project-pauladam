import { TokenExpiredError } from '@/domain/auth/errors/token-expired.error';
import { useAuthStore } from './useAuthStore';

export const useAuth = () => {
  const { auth, login, logout, checkAuth, clearError } = useAuthStore();
  
  return {
    login,
    logout,
    checkAuth,
    clearError,
    isAuthenticated: auth.isAuthenticated(),
    isAdmin: auth.isAdmin(),
    isLoading: auth.isLoading(),
    isError: auth.isError(),
    userId: auth.getId(),
    
  };
};