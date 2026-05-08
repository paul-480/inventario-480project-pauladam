import { useAuthStore } from './useAuthStore';

export const useAuth = () => {
  const { auth, login, logout, checkAuth } = useAuthStore();


  return {
    login,
    logout,
    checkAuth,
    isAuthenticated: auth.isAuthenticated(),
    isAdmin: auth.isAdmin(),
    isLoading: auth.isLoading(),
    isError: auth.isError(),
    userId: auth.getId(),
  };
};