import type { SectorRepository } from "@/infrastructure/sector/sector.repository";
import type { Sector } from "@/domain/sector/sector.entity";
import type { UpdateSectorSchema } from "@/infrastructure/sector/sector.schema";

export const UpdateSectorUseCase = async (
    sectorRepository: SectorRepository,
    sector: UpdateSectorSchema
): Promise<Sector | null> => {
    return await sectorRepository.updateSector(sector);
};
