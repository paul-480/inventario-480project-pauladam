import type { ProjectRole } from "@/domain/projectRole/projectRole.entity";

export interface ProjectRoleRepository {
    getProjectRoles(): Promise<ProjectRole[]>;
}
