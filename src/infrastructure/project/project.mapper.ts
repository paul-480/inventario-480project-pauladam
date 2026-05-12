import type { ProjectResponseDto } from "@/application/project/project.dto";
import type { Project } from "../../domain/project/project.entity";
import { Uuid } from "../../domain/shared/uuid.vo";
import type { CreateProjectSchema, UpdateProjectSchema } from "./project.schema";

export const projectMapper = {
    toDomain: (raw: ProjectResponseDto): Project => {
        return {
            id: new Uuid(raw.id),
            name: raw.name,
            description: raw.description,
            startDate: raw.start_date,
            isActive: raw.is_active,
            client: {
                id: new Uuid(raw.client.id),
                name: raw.client.name
            },
            teamMembers: raw.team_members,
            permissions: raw.permissions ? {
                canEdit: raw.permissions.can_edit,
                canDelete: raw.permissions.can_delete
            } : undefined
        };
    },
    toDomainList: (raw: ProjectResponseDto[]): Project[] => raw.map((project: ProjectResponseDto) => projectMapper.toDomain(project)),
    toCreateSchema: (project: Project): CreateProjectSchema => {
        return {
            id: project.id.value,
            name: project.name,
            description: project.description,
            start_date: project.startDate,
            client_id: project.client.id.value
        };
    },
    toUpdateSchema: (project: Project): UpdateProjectSchema => {
        return {
            id: project.id.value,
            name: project.name,
            description: project.description,
            start_date: project.startDate,
            is_active: project.isActive,
            client_id: project.client.id.value
        };
    }
}
