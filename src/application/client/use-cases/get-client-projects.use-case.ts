import type { ClientRepository } from "@/infrastructure/client/client.repository";

export const GetClientProjectsUseCase = async (
    clientRepository: ClientRepository,
    clientId: string
): Promise<any[]> => {
    return await clientRepository.getClientProjects(clientId);
};
