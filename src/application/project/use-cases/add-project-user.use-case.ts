import type { ProjectUserRepository, AddProjectUserSchema } from "@/infrastructure/projectUser/projectUser.repository";
import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";

export const AddProjectUserUseCase = async (
    projectUserRepository: ProjectUserRepository,
    projectId: string,
    user: AddProjectUserSchema
): Promise<ProjectUser | null> => {
    return await projectUserRepository.addProjectUser(projectId, user);
};
