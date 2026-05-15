import type { ClientRepository } from "@/infrastructure/client/client.repository";

export const SoftDeleteClientUseCase = async (
    clientRepository: ClientRepository,
    id: string
): Promise<void> => {
    return await clientRepository.softDeleteClient(id);
};
