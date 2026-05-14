import type { ProjectRepository } from "@/infrastructure/project/project.repository";

export const SoftDeleteProjectUseCase = async (
    projectRepository: ProjectRepository,
    id: string,
    isActive: boolean
): Promise<void> => {
    return await projectRepository.softDeleteProject(id, isActive);
};
