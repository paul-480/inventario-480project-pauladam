import type { ProjectRepository } from "@/infrastructure/project/project.repository";
import type { Project } from "@/domain/project/project.entity";

export const GetProjectByIdUseCase = async (
    projectRepository: ProjectRepository,
    id: string
): Promise<Project | null> => {
    return await projectRepository.getProjectById(id);
};
