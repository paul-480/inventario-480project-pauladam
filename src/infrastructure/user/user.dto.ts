import type { UserRoleValue } from "@/domain/shared/user-role.vo";

export interface CreateUserDto {
    id:       string;
    name:     string;
    surname:  string;
    email:    string;
    password: string;
    role:     UserRoleValue;
}
