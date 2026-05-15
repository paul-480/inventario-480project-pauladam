import type { TechnologyRepository } from "@/infrastructure/technology/technology.repository";

export const DeleteTechnologyUseCase = async (
    technologyRepository: TechnologyRepository,
    id: string
): Promise<void> => {
    return await technologyRepository.deleteTechnology(id);
};
