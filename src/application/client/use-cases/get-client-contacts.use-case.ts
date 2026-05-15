import type { ContactRepository } from "@/infrastructure/contact/contact.repository";
import type { Contact } from "@/domain/contact/contact.entity";

export const GetClientContactsUseCase = async (
    contactRepository: ContactRepository,
    clientId: string
): Promise<Contact[]> => {
    return await contactRepository.getClientContacts(clientId);
};
