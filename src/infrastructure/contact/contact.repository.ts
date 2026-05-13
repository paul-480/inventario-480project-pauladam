import type { Contact } from "@/domain/contact/contact.entity";
import type { CreateContactSchema, UpdateContactSchema } from "./contact.schema";

export interface ContactRepository {
    getClientContacts(clientId: string): Promise<Contact[]>;
    createClientContact(clientId: string, contact: CreateContactSchema): Promise<Contact | null>;
    updateClientContact(clientId: string, contactId: string, contact: UpdateContactSchema): Promise<Contact | null>;
    updateContactMainStatus(clientId: string, contactId: string): Promise<void>;
    deleteClientContact(clientId: string, contactId: string): Promise<void>;
}
