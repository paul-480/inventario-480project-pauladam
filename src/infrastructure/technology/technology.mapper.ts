import type { Technology } from "@/domain/technology/technology.entity";
import { Uuid } from "@/domain/shared/uuid.vo";
import type { CreateTechnologySchema, UpdateTechnologySchema } from "./technology.schema";

export interface TechnologyResponseDto {
    id: string;
    name: string;
}

export const technologyMapper = {
    toDomain: (raw: TechnologyResponseDto): Technology => {
        return {
            id: new Uuid(raw.id),
            name: raw.name
        };
    },
    toDomainList: (raw: TechnologyResponseDto[]): Technology[] => 
        raw.map((tech: TechnologyResponseDto) => technologyMapper.toDomain(tech)),
    toCreateSchema: (technology: Technology): CreateTechnologySchema => {
        return {
            id: technology.id.value,
            name: technology.name
        };
    },
    toUpdateSchema: (technology: Technology): UpdateTechnologySchema => {
        return {
            id: technology.id.value,
            name: technology.name
        };
    }
};
