import type { SectorRepository } from "@/infrastructure/sector/sector.repository";

export const DeleteSectorUseCase = async (
    sectorRepository: SectorRepository,
    id: string
): Promise<void> => {
    return await sectorRepository.deleteSector(id);
};
