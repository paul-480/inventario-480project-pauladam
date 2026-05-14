import type { ProjectRepository } from "@/infrastructure/project/project.repository";

export const DeleteProjectUseCase = async (
    projectRepository: ProjectRepository,
    id: string
): Promise<void> => {
    return await projectRepository.deleteProject(id);
};
