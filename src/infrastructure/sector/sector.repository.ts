import type { Sector } from "@/domain/sector/sector.entity";
import type { CreateSectorSchema, UpdateSectorSchema } from "./sector.schema";

export interface SectorRepository {
    getSectorById(id: string): Promise<Sector | null>;
    getSectors(): Promise<Sector[]>;
    createSector(sector: CreateSectorSchema): Promise<Sector | null>;
    updateSector(sector: UpdateSectorSchema): Promise<Sector | null>;
    deleteSector(id: string): Promise<void>;
}
