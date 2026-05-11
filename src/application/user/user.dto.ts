import type { UserRoleValue } from "@/domain/shared/user-role.vo";

export interface CreateUserDto {
    id:       string;
    name:     string;
    surname:  string;
    email:    string;
    password: string;
    role:     UserRoleValue;
}

export interface UpdateUserDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    is_active: boolean;
    role: UserRoleValue;
}

export interface UserResponseDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    role: string;
    is_active: boolean;
}