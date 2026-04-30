import z from "zod";
export const userSchema = z.object({
    id: z.uuidv7(),
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    email: z.email(),
    isActive: z.boolean(),
    role: z.enum(["ROLE_ADMIN", "ROLE_EMPLOYEE"]),
});
export type UserSchema = z.infer<typeof userSchema>;

export const CreateUserSchema = z.object({
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    email: z.email(),
    role: z.enum(["ROLE_ADMIN", "ROLE_EMPLOYEE"]),
});