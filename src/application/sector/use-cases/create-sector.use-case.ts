import type { SectorRepository } from "@/infrastructure/sector/sector.repository";
import type { Sector } from "@/domain/sector/sector.entity";
import type { CreateSectorSchema } from "@/infrastructure/sector/sector.schema";

export const CreateSectorUseCase = async (
    sectorRepository: SectorRepository,
    sector: CreateSectorSchema
): Promise<Sector | null> => {
    return await sectorRepository.createSector(sector);
};
