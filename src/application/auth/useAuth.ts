import { TokenExpiredError } from '@/domain/auth/errors/token-expired.error';
import { useAuthStore } from './useAuthStore';

export const useAuth = () => {
  const { auth, login, logout, checkAuth, clearError } = useAuthStore();
  const handleAuthError = (error: unknown) => {
    if(error instanceof TokenExpiredError) {
      logout(error.message);
    }
    
  }

  return {
    login,
    logout,
    checkAuth,
    clearError,
    handleAuthError,
    isAuthenticated: auth.isAuthenticated(),
    isAdmin: auth.isAdmin(),
    isLoading: auth.isLoading(),
    isError: auth.isError(),
    userId: auth.getId(),
    
  };
};