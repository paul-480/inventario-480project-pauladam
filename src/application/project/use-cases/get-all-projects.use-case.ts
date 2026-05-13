import type { ProjectRepository } from "@/infrastructure/project/project.repository";
import type { Project } from "@/domain/project/project.entity";

export const GetAllProjectsUseCase = async (
    projectRepository: ProjectRepository
): Promise<Project[]> => {
    return await projectRepository.getProjects();
};
