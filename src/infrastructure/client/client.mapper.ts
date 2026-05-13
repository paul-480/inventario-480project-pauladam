import type { Client } from "@/domain/client/client.entity";
import { Uuid } from "@/domain/shared/uuid.vo";
import type { CreateClientSchema, UpdateClientSchema } from "./client.schema";

export interface ClientResponseDto {
    id: string;
    name: string;
    is_active: boolean;
    sector: {
        id: string;
        name: string;
    };
}

export const clientMapper = {
    toDomain: (raw: ClientResponseDto): Client => {
        return {
            id: new Uuid(raw.id),
            name: raw.name,
            isActive: raw.is_active,
            sector: {
                id: new Uuid(raw.sector.id),
                name: raw.sector.name
            }
        };
    },
    toDomainList: (raw: ClientResponseDto[]): Client[] => 
        raw.map((client: ClientResponseDto) => clientMapper.toDomain(client)),
    toCreateSchema: (client: Client): CreateClientSchema => {
        return {
            id: client.id.value,
            name: client.name,
            sector_id: client.sector.id.value
        };
    },
    toUpdateSchema: (client: Partial<Client> & { id: string }): UpdateClientSchema => {
        return {
            id: client.id,
            name: client.name,
            sector_id: client.sector?.id.value,
            is_active: client.isActive
        };
    }
};
