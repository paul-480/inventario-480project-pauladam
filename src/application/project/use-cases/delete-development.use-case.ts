import type { DevelopmentRepository } from "@/infrastructure/development/development.repository";

export const DeleteDevelopmentUseCase = async (
    developmentRepository: DevelopmentRepository,
    projectId: string,
    developmentId: string
): Promise<void> => {
    return await developmentRepository.deleteProjectDevelopment(projectId, developmentId);
};
