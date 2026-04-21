export type SystemRole = 'ADMIN' | 'EMPLOYEE';

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  role: SystemRole;
}