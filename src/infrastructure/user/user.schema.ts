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
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    email: z.email(),
    isActive: z.boolean(),
    role: z.enum(["ROLE_ADMIN", "ROLE_EMPLOYEE"]),
});
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;

export const DeleteUserSchema = z.object({
    id: z.uuidv7(),
});
export type DeleteUserSchema = z.infer<typeof DeleteUserSchema>;
