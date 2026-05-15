import type { ContactRepository } from "@/infrastructure/contact/contact.repository";
import type { Contact } from "@/domain/contact/contact.entity";
import type { CreateContactSchema } from "@/infrastructure/contact/contact.schema";

export const CreateContactUseCase = async (
    contactRepository: ContactRepository,
    clientId: string,
    contact: CreateContactSchema
): Promise<Contact | null> => {
    return await contactRepository.createClientContact(clientId, contact);
};
