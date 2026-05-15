import type { ProjectUserRepository } from "@/infrastructure/projectUser/projectUser.repository";
import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";

export const GetProjectTeamUseCase = async (
    projectUserRepository: ProjectUserRepository,
    projectId: string
): Promise<ProjectUser[]> => {
    return await projectUserRepository.getProjectUsers(projectId);
};
