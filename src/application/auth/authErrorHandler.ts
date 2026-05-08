import { TokenExpiredError } from '@/domain/auth/errors/token-expired.error';
import { useAuthStore } from './useAuthStore';

export const handleAuthError = (error: unknown) => {
  const { logout } = useAuthStore.getState(); // Accede directamente al estado
  if (error instanceof TokenExpiredError) {
    logout(error.message);
  }
};