import type { ProjectUserRepository } from "@/infrastructure/projectUser/projectUser.repository";

export const DeactivateProjectUserUseCase = async (
    projectUserRepository: ProjectUserRepository,
    projectId: string,
    appUserId: string,
    isActive: boolean
): Promise<void> => {
    return await projectUserRepository.deactivateProjectUser(projectId, appUserId, isActive);
};
