import type { Development, DevelopmentLink } from "@/domain/development/development.entity";
import { Uuid } from "@/domain/shared/uuid.vo";
import type { CreateDevelopmentSchema, UpdateDevelopmentSchema, DevelopmentLinkSchema } from "./development.schema";

export interface DevelopmentLinkResponseDto {
    id: string;
    environment: "STAGE" | "PREPRODUCTION" | "PRODUCTION";
    url: string;
}

export interface DevelopmentResponseDto {
    id: string;
    name: string;
    description: string;
    technology: {
        id: string;
        name: string;
    };
    url_repository: string;
    links: DevelopmentLinkResponseDto[];
}

export const developmentMapper = {
    toDomain: (raw: DevelopmentResponseDto): Development => {
        return {
            id: new Uuid(raw.id),
            name: raw.name,
            description: raw.description,
            technology: {
                id: new Uuid(raw.technology.id),
                name: raw.technology.name
            },
            urlRepository: raw.url_repository,
            links: raw.links.map((link: DevelopmentLinkResponseDto) => ({
                id: new Uuid(link.id),
                environment: link.environment,
                url: link.url
            }))
        };
    },
    toDomainList: (raw: DevelopmentResponseDto[]): Development[] => 
        raw.map((dev: DevelopmentResponseDto) => developmentMapper.toDomain(dev)),
    toCreateSchema: (dev: Development & { technologyId: string }): CreateDevelopmentSchema => {
        return {
            id: dev.id.value,
            technology_id: dev.technologyId,
            name: dev.name,
            description: dev.description,
            url_repository: dev.urlRepository
        };
    },
    toUpdateSchema: (dev: Partial<Development> & { technologyId?: string, links?: DevelopmentLinkSchema[] }): UpdateDevelopmentSchema => {
        return {
            name: dev.name || '',
            description: dev.description || '',
            technology_id: dev.technologyId || '',
            url_repository: dev.urlRepository || '',
            links: dev.links
        };
    }
};
