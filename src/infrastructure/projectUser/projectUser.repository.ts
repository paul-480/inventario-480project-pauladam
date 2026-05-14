import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";

export interface AddProjectUserSchema {
    app_user_id: string;
    project_role_id: string;
}

export interface UpdateProjectUserSchema {
    is_active: boolean;
}

export interface ProjectUserRepository {
    getProjectUsers(projectId: string): Promise<ProjectUser[]>;
    addProjectUser(projectId: string, user: AddProjectUserSchema): Promise<ProjectUser | null>;
    updateProjectUsers(projectId: string, user: AddProjectUserSchema): Promise<ProjectUser | null>;
    deactivateProjectUser(projectId: string, appUserId: string, isActive: boolean): Promise<void>;
}
