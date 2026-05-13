import type { Client } from "@/domain/client/client.entity";
import type { CreateClientSchema, UpdateClientSchema } from "./client.schema";

export interface ClientRepository {
    getClientById(id: string): Promise<Client | null>;
    getClients(): Promise<Client[]>;
    createClient(client: CreateClientSchema): Promise<Client | null>;
    updateClient(client: UpdateClientSchema): Promise<Client | null>;
    softDeleteClient(id: string): Promise<void>;
    deleteClient(id: string): Promise<void>;
    getClientProjects(id: string): Promise<any[]>;
    getClientContacts(id: string): Promise<any[]>;
}
