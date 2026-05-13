import type { Sector } from "@/domain/sector/sector.entity";
import { Uuid } from "@/domain/shared/uuid.vo";
import type { CreateSectorSchema, UpdateSectorSchema } from "./sector.schema";

export interface SectorResponseDto {
    id: string;
    name: string;
}

export const sectorMapper = {
    toDomain: (raw: SectorResponseDto): Sector => {
        return {
            id: new Uuid(raw.id),
            name: raw.name
        };
    },
    toDomainList: (raw: SectorResponseDto[]): Sector[] => 
        raw.map((sector: SectorResponseDto) => sectorMapper.toDomain(sector)),
    toCreateSchema: (sector: Sector): CreateSectorSchema => {
        return {
            id: sector.id.value,
            name: sector.name
        };
    },
    toUpdateSchema: (sector: Sector): UpdateSectorSchema => {
        return {
            id: sector.id.value,
            name: sector.name
        };
    }
};
