import { Auth, type UserRole } from "@/domain/auth/auth.entity";
import type { AuthEvent } from "@/domain/auth/auth.machine";


export interface AuthStore {
  auth: Auth;
  send: (event: AuthEvent, payload?: any) => void;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export interface DecodedToken {
  id: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}
