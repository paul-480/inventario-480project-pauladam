import type { User } from "@/domain/user/user.entity";
import type { CreateUserSchema, UpdateUserSchema } from "./user.schema";
import type { UserRoleValue } from "@/domain/shared/user-role.vo";

export interface UserRepository {
    getUserById(id: string): Promise<User | null>;
    getUsers(page: number, limit: number, isActive?: boolean, role?: UserRoleValue): Promise<User[]>;
    getUsersByProjectId(projectId: string): Promise<User[]>;
    createUser(user: CreateUserSchema): Promise<User | null>;
    updateUser(user: UpdateUserSchema): Promise<User | null>;
    deleteUser(id: string): Promise<null>;
}