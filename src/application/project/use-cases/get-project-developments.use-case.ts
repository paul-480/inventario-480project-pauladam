import type { DevelopmentRepository } from "@/infrastructure/development/development.repository";
import type { Development } from "@/domain/development/development.entity";

export const GetProjectDevelopmentsUseCase = async (
    developmentRepository: DevelopmentRepository,
    projectId: string
): Promise<Development[]> => {
    return await developmentRepository.getProjectDevelopments(projectId);
};
