import type { ClientRepository } from "@/infrastructure/client/client.repository";
import type { Client } from "@/domain/client/client.entity";

export const GetClientByIdUseCase = async (
    clientRepository: ClientRepository,
    id: string
): Promise<Client | null> => {
    return await clientRepository.getClientById(id);
};
