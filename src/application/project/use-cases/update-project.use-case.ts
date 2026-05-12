import type { ProjectRepository } from "@/infrastructure/project/project.repository";
import type { Project } from "@/domain/project/project.entity";
import type { UpdateProjectSchema } from "@/infrastructure/project/project.schema";

export const UpdateProjectUseCase = async (
    projectRepository: ProjectRepository,
    project: UpdateProjectSchema
): Promise<Project | null> => {
    return await projectRepository.updateProject(project);
};
