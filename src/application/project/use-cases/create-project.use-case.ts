import type { ProjectRepository } from "@/infrastructure/project/project.repository";
import type { Project } from "@/domain/project/project.entity";
import type { CreateProjectSchema } from "@/infrastructure/project/project.schema";

export const CreateProjectUseCase = async (
    projectRepository: ProjectRepository,
    project: CreateProjectSchema
): Promise<Project | null> => {
    return await projectRepository.createProject(project);
};
