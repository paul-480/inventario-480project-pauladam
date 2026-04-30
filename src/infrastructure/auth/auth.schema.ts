import z from "zod";

export const loginSchema = z.object({
    email: z.email("Formato de email inválido"),
    password: z.string("La contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres"),
});