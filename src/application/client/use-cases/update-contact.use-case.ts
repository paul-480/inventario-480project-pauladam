import type { ContactRepository } from "@/infrastructure/contact/contact.repository";
import type { UpdateContactSchema } from "@/infrastructure/contact/contact.schema";
import type { Contact } from "@/domain/contact/contact.entity";

export const UpdateContactUseCase = async (
    contactRepository: ContactRepository,
    clientId: string,
    contactId: string,
    contact: UpdateContactSchema
): Promise<Contact | null> => {
    return await contactRepository.updateClientContact(clientId, contactId, contact);
};
