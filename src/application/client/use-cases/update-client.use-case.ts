import type { ClientRepository } from "@/infrastructure/client/client.repository";
import type { Client } from "@/domain/client/client.entity";
import type { UpdateClientSchema } from "@/infrastructure/client/client.schema";

export const UpdateClientUseCase = async (
    clientRepository: ClientRepository,
    client: UpdateClientSchema
): Promise<Client | null> => {
    return await clientRepository.updateClient(client);
};
