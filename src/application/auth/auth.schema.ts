// src/application/auth/auth.schema.ts
import { z } from 'zod';

export const loginSchema = z.object({
   
  email: z.email("Formato de email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});