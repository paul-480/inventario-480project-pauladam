import type { ContactRepository } from "@/infrastructure/contact/contact.repository";

export const DeleteContactUseCase = async (
    contactRepository: ContactRepository,
    clientId: string,
    contactId: string
): Promise<void> => {
    return await contactRepository.deleteClientContact(clientId, contactId);
};
