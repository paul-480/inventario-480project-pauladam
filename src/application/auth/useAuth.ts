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