import type { TechnologyRepository } from "@/infrastructure/technology/technology.repository";
import type { Technology } from "@/domain/technology/technology.entity";
import type { UpdateTechnologySchema } from "@/infrastructure/technology/technology.schema";

export const UpdateTechnologyUseCase = async (
    technologyRepository: TechnologyRepository,
    technology: UpdateTechnologySchema
): Promise<Technology | null> => {
    return await technologyRepository.updateTechnology(technology);
};
