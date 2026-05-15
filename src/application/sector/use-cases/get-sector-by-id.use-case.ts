import type { SectorRepository } from "@/infrastructure/sector/sector.repository";
import type { Sector } from "@/domain/sector/sector.entity";

export const GetSectorByIdUseCase = async (
    sectorRepository: SectorRepository,
    id: string
): Promise<Sector | null> => {
    return await sectorRepository.getSectorById(id);
};
