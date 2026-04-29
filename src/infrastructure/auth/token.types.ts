import type { UserRole } from "@/domain/auth/auth.entity";

// Esta interfaz refleja lo que viene en el JWT
export interface DecodedToken {
  id: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}
