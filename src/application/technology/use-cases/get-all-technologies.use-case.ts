import type { TechnologyRepository } from "@/infrastructure/technology/technology.repository";
import type { Technology } from "@/domain/technology/technology.entity";

export const GetAllTechnologiesUseCase = async (
    technologyRepository: TechnologyRepository
): Promise<Technology[]> => {
    return await technologyRepository.getTechnologies();
};
