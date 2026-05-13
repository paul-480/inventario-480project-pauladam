import type { Uuid } from "../shared/uuid.vo";

export interface ClientSector {
    id: Uuid;
    name: string;
}

export interface Client {
    id: Uuid;
    name: string;
    isActive: boolean;
    sector: ClientSector;
}
