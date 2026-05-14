import type { ProjectRole } from "@/domain/projectRole/projectRole.entity";
import { Uuid } from "@/domain/shared/uuid.vo";

export interface ProjectRoleResponseDto {
    id: string;
    name: string;
}

export const projectRoleMapper = {
    toDomain: (raw: ProjectRoleResponseDto): ProjectRole => {
        return {
            id: new Uuid(raw.id),
            name: raw.name
        };
    },
    toDomainList: (raw: ProjectRoleResponseDto[]): ProjectRole[] => 
        raw.map((role: ProjectRoleResponseDto) => projectRoleMapper.toDomain(role))
};
