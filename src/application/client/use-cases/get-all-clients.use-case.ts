import type { ClientRepository } from "@/infrastructure/client/client.repository";
import type { Client } from "@/domain/client/client.entity";

export const GetAllClientsUseCase = async (
    clientRepository: ClientRepository
): Promise<Client[]> => {
    return await clientRepository.getClients();
};
