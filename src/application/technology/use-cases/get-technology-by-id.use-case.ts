import type { TechnologyRepository } from "@/infrastructure/technology/technology.repository";
import type { Technology } from "@/domain/technology/technology.entity";

export const GetTechnologyByIdUseCase = async (
    technologyRepository: TechnologyRepository,
    id: string
): Promise<Technology | null> => {
    return await technologyRepository.getTechnologyById(id);
};
