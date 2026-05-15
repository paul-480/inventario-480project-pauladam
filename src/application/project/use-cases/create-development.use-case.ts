import type { DevelopmentRepository } from "@/infrastructure/development/development.repository";
import type { Development } from "@/domain/development/development.entity";
import type { CreateDevelopmentSchema } from "@/infrastructure/development/development.schema";

export const CreateDevelopmentUseCase = async (
    developmentRepository: DevelopmentRepository,
    projectId: string,
    development: CreateDevelopmentSchema
): Promise<Development | null> => {
    return await developmentRepository.createProjectDevelopment(projectId, development);
};
