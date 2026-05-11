import type { CreateUserDto } from "@/application/user/user.dto";
import { UserRole } from "../shared/user-role.vo";

export interface User {
    id:        string;
    name:      string;
    surname:   string;
    email:     string;
    isActive: boolean;
    role:      UserRole;
}
export const isAdmin = (user: User) => user?.role?.isAdmin?.() ?? false;
export const isActive = (user: User) => user?.isActive ?? false;

export const fullName = (user: User) => `${user.name} ${user.surname}`;

export const createUser = (dto: CreateUserDto) => {
    return {
        id: dto.id,
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        isActive: true,
        role: new UserRole(dto.role),
    }
}