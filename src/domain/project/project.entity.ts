import type { Uuid } from "../shared/uuid.vo";

export interface ProjectClient {
    id: Uuid;
    name: string;
}

export interface ProjectPermissions {
    canEdit: boolean;
    canDelete: boolean;
}

export interface Project {
    id: Uuid;
    name: string;
    description: string | null;
    startDate: string | null;
    isActive: boolean;
    client: ProjectClient;
    teamMembers?: number;
    permissions?: ProjectPermissions;
}
