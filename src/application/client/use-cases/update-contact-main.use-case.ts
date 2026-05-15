import type { ContactRepository } from "@/infrastructure/contact/contact.repository";

export const UpdateContactMainUseCase = async (
    contactRepository: ContactRepository,
    clientId: string,
    contactId: string
): Promise<void> => {
    return await contactRepository.updateContactMainStatus(clientId, contactId);
};
