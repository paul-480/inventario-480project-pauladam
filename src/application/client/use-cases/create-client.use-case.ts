import type { ClientRepository } from "@/infrastructure/client/client.repository";
import type { Client } from "@/domain/client/client.entity";
import type { CreateClientSchema } from "@/infrastructure/client/client.schema";

export const CreateClientUseCase = async (
    clientRepository: ClientRepository,
    client: CreateClientSchema
): Promise<Client | null> => {
    return await clientRepository.createClient(client);
};
