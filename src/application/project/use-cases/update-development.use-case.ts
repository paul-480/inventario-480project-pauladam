import type { DevelopmentRepository } from "@/infrastructure/development/development.repository";
import type { Development } from "@/domain/development/development.entity";
import type { UpdateDevelopmentSchema } from "@/infrastructure/development/development.schema";

export const UpdateDevelopmentUseCase = async (
    developmentRepository: DevelopmentRepository,
    projectId: string,
    developmentId: string,
    development: UpdateDevelopmentSchema
): Promise<Development | null> => {
    return await developmentRepository.updateProjectDevelopment(projectId, developmentId, development);
};
