import type { Uuid } from "../shared/uuid.vo";

export interface ProjectUserRole {
    id: Uuid;
    name: string;
}

export interface ProjectUser {
    appUserId: Uuid;
    name: string;
    surname: string;
    isUserActive: boolean;
    role: ProjectUserRole;
}
