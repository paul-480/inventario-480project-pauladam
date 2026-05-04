import type { User } from "@/domain/user/user.entity";
import type { CreateUserSchema } from "./user.schema";
import type { UserRoleValue } from "@/domain/shared/user-role.vo";
import type { UserResponseDto } from "@/application/user/user.dto";

export interface UserRepository {
    getUserById(id: string): Promise<UserResponseDto | null>;
    getUsers(page: number, limit: number, isActive?: boolean, role?: UserRoleValue): Promise<User[]>;
    createUser(user: CreateUserSchema): Promise<User | null>;
    updateUser(user: CreateUserSchema): Promise<User | null>;
    deleteUser(id: string): Promise<null>;
}