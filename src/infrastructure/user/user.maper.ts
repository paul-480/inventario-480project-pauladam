import type { UserResponseDto } from "@/application/user/user.dto";
import type { User } from "../../domain/user/user.entity";
import { UserRole } from "@/domain/shared/user-role.vo";

export const userMaper = {
    toDomain: (raw: UserResponseDto): User => {
        return {
            id: raw.id,
            name: raw.name,
            surname: raw.surname,
            email: raw.email,
            role: new UserRole(raw.role as "ROLE_ADMIN" | "ROLE_EMPLOYEE"),
            isActive: raw.is_active ?? (raw as any).active ?? true,
        };
    },
    toDomainList: (raw: UserResponseDto[]): User[] => {
        return raw.map((user: UserResponseDto) => userMaper.toDomain(user));
    }
}