import type { ClientRepository } from "@/infrastructure/client/client.repository";

export const DeleteClientUseCase = async (
    clientRepository: ClientRepository,
    id: string
): Promise<void> => {
    return await clientRepository.deleteClient(id);
};
