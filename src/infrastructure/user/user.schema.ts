import z from "zod";
import type { CreateUserDto, UpdateUserDto } from "../../application/user/user.dto";
import { USER_ROLES } from "@/domain/shared/user-role.vo";
export const userSchema = z.object({
    id: z.uuidv7(),
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    email: z.email(),
    isActive: z.boolean(),
    role: z.enum(USER_ROLES),
});
export type UserSchema = z.infer<typeof userSchema>;

export const CreateUserSchema = z.object({
    id: z.uuidv7(),
    name: z.string(),
    surname: z.string(),
    password: z.string(),
    email: z.email(),
    role: z.enum(USER_ROLES),
}) satisfies z.ZodType<CreateUserDto>;
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    id: z.uuid(),
    name: z.string().max(100),
    surname: z.string().max(100),
    email: z.email().max(150),
    is_active: z.boolean(),
    role: z.enum(USER_ROLES),
}) satisfies z.ZodType<UpdateUserDto>;
export type UpdateUserSchema = z.infer<typeof UpdateUserSchema>;


export const DeleteUserSchema = z.object({
    id: z.uuidv7(),
});
export type DeleteUserSchema = z.infer<typeof DeleteUserSchema>;
