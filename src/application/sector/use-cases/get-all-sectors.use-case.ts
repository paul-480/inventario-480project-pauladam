import type { SectorRepository } from "@/infrastructure/sector/sector.repository";
import type { Sector } from "@/domain/sector/sector.entity";

export const GetAllSectorsUseCase = async (
    sectorRepository: SectorRepository
): Promise<Sector[]> => {
    return await sectorRepository.getSectors();
};
