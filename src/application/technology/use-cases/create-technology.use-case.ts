import type { TechnologyRepository } from "@/infrastructure/technology/technology.repository";
import type { Technology } from "@/domain/technology/technology.entity";
import type { CreateTechnologySchema } from "@/infrastructure/technology/technology.schema";

export const CreateTechnologyUseCase = async (
    technologyRepository: TechnologyRepository,
    technology: CreateTechnologySchema
): Promise<Technology | null> => {
    return await technologyRepository.createTechnology(technology);
};
