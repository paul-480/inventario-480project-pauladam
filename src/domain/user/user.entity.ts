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
export const isAdmin = (user: User) => {
    if (!user?.role) return false;
    if (typeof user.role.isAdmin === 'function') return user.role.isAdmin();
    return (user.role as any).value === 'ROLE_ADMIN' || (user.role as any) === 'ROLE_ADMIN';
};
export const isActive = (user: User) => user?.isActive;

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