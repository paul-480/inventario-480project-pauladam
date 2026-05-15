import type { ProjectUserRepository, AddProjectUserSchema } from "@/infrastructure/projectUser/projectUser.repository";
import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";

export const UpdateProjectUserUseCase = async (
    projectUserRepository: ProjectUserRepository,
    projectId: string,
    user: AddProjectUserSchema
): Promise<ProjectUser | null> => {
    return await projectUserRepository.updateProjectUsers(projectId, user);
};
