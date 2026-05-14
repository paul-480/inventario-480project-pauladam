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

/** Label for tables/UI derived from `Project.startDate` (API `start_date`). */
export function displayProjectStartDate(project: Pick<Project, "startDate">): string {
    const iso = project.startDate;
    if (iso == null || iso.trim() === "") return "Sin fecha";
    const parsed = new Date(iso);
    if (Number.isNaN(parsed.getTime())) return iso;
    return parsed.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}
