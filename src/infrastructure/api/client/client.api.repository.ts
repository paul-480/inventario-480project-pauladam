import type { Client } from "@/domain/client/client.entity";
import type { ClientRepository } from "@/infrastructure/client/client.repository";
import type { CreateClientSchema, UpdateClientSchema } from "@/infrastructure/client/client.schema";
import { clientMapper } from "@/infrastructure/client/client.mapper";
import { axiosClient } from "../axios.client";

export const ClientApiRepository: ClientRepository = {
    getClientById: async (id: string): Promise<Client | null> => {
        const response = await axiosClient.get(`/clients/${id}`);
        if (!response.data) return null;
        return clientMapper.toDomain(response.data);
    },
    getClients: async (): Promise<Client[]> => {
        const response = await axiosClient.get("/clients");
        return clientMapper.toDomainList(response.data);
    },
    createClient: async (client: CreateClientSchema): Promise<Client | null> => {
        const response = await axiosClient.post("/clients", client);
        if (!response.data?.id || !response.data?.sector) return null;
        return clientMapper.toDomain(response.data);
    },
    updateClient: async (client: UpdateClientSchema): Promise<Client | null> => {
        const response = await axiosClient.put(`/clients/${client.id}`, {
            name: client.name,
            sector_id: client.sector_id,
            is_active: client.is_active
        });
        return clientMapper.toDomain(response.data);
    },
    softDeleteClient: async (id: string): Promise<void> => {
        await axiosClient.patch(`/clients/${id}`);
    },
    deleteClient: async (id: string): Promise<void> => {
        await axiosClient.delete(`/clients/${id}`);
    },
    getClientProjects: async (id: string): Promise<any[]> => {
        const response = await axiosClient.get(`/clients/${id}/projects`);
        return response.data;
    },
    getClientContacts: async (id: string): Promise<any[]> => {
        const response = await axiosClient.get(`/clients/${id}/contacts`);
        return response.data;
    }
};
