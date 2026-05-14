import type { ProjectRepository } from "@/infrastructure/project/project.repository";
import type { Project } from "@/domain/project/project.entity";

export const GetUserProjectsUseCase = async (
    projectRepository: ProjectRepository,
    userId: string
): Promise<Project[]> => {
    return await projectRepository.getProjectsByUserId(userId);
};
