import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";
import { Uuid } from "@/domain/shared/uuid.vo";

export interface ProjectUserResponseDto {
    app_user_id: string;
    name: string;
    surname: string;
    is_user_active: boolean;
    role: {
        id: string;
        name: string;
    };
}

export const projectUserMapper = {
    toDomain: (raw: ProjectUserResponseDto): ProjectUser => {
        return {
            appUserId: new Uuid(raw.app_user_id),
            name: raw.name,
            surname: raw.surname,
            isUserActive: raw.is_user_active,
            role: {
                id: new Uuid(raw.role.id),
                name: raw.role.name
            }
        };
    },
    toDomainList: (raw: ProjectUserResponseDto[]): ProjectUser[] => 
        raw.map((user: ProjectUserResponseDto) => projectUserMapper.toDomain(user))
};
