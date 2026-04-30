import type { Role } from "@/domain/shared/common.types";
import type { User } from "@/domain/user/user.entity";

export interface UserRepository {
        getUserById(id: string): Promise<User|null>;
        getUsers(page:number, limit: number, isActive?: boolean, role?: Role): Promise<User[]>;
        createUser(user:User): Promise<User|null>;
        updateUser(user:User): Promise<User|null>;
        deleteUser(id: string): Promise<null>;
    }