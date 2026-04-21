import { type SystemRole } from '@/domain/user/user.entity';

export interface UserResponse {
  id: string;
  name: string;
  surname: string;
  email: string;
  is_active: boolean; // El snake_case del backend
  role: SystemRole;
}