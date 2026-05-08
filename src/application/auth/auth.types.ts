// src/application/auth/auth-store.types.ts
import { Auth } from "@/domain/auth/auth.entity";
import type { AuthEvent } from "@/domain/auth/auth.machine";


export interface AuthStore {
  auth: Auth; 
  send: (event: AuthEvent, payload?: any) => void;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}