import type { ProjectRoleRepository } from "@/infrastructure/projectRole/projectRole.repository";
import type { ProjectRole } from "@/domain/projectRole/projectRole.entity";

export const GetProjectRolesUseCase = async (
    projectRoleRepository: ProjectRoleRepository
): Promise<ProjectRole[]> => {
    return await projectRoleRepository.getProjectRoles();
};
