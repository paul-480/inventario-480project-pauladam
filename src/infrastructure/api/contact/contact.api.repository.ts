import type { Contact } from "@/domain/contact/contact.entity";
import type { ContactRepository } from "@/infrastructure/contact/contact.repository";
import type { CreateContactSchema, UpdateContactSchema } from "@/infrastructure/contact/contact.schema";
import { contactMapper } from "@/infrastructure/contact/contact.mapper";
import { axiosClient } from "../axios.client";

export const ContactApiRepository: ContactRepository = {
    getClientContacts: async (clientId: string): Promise<Contact[]> => {
        const response = await axiosClient.get(`/clients/${clientId}/contacts`);
        return contactMapper.toDomainList(response.data);
    },
    createClientContact: async (clientId: string, contact: CreateContactSchema): Promise<Contact | null> => {
        const response = await axiosClient.post(`/clients/${clientId}/contacts`, contact);
        return contactMapper.toDomain(response.data);
    },
    updateClientContact: async (clientId: string, contactId: string, contact: UpdateContactSchema): Promise<Contact | null> => {
        const response = await axiosClient.put(`/clients/${clientId}/contacts/${contactId}`, contact);
        return contactMapper.toDomain(response.data);
    },
    updateContactMainStatus: async (clientId: string, contactId: string): Promise<void> => {
        await axiosClient.patch(`/clients/${clientId}/contacts/${contactId}`);
    },
    deleteClientContact: async (clientId: string, contactId: string): Promise<void> => {
        await axiosClient.delete(`/clients/${clientId}/contacts/${contactId}`);
    }
};
