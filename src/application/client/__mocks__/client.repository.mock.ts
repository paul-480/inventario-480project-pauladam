import { vi } from "vitest"
import type { ClientRepository } from "@/infrastructure/client/client.repository"
import type { Client } from "@/domain/client/client.entity"
import type { ContactRepository } from "@/infrastructure/contact/contact.repository"
import type { Contact } from "@/domain/contact/contact.entity"

export const mockClientRepo: ClientRepository = {
    createClient: vi.fn(),
    getClientById: vi.fn(),
    getClients: vi.fn(),
    updateClient: vi.fn(),
    softDeleteClient: vi.fn(),
    deleteClient: vi.fn(),
    getClientProjects: vi.fn(),
    getClientContacts: vi.fn(),
}

export const mockContactRepo: ContactRepository = {
    getClientContacts: vi.fn(),
    createClientContact: vi.fn(),
    updateClientContact: vi.fn(),
    updateContactMainStatus: vi.fn(),
    deleteClientContact: vi.fn(),
}

export const mockClient: Client = {
    id: { value: 'client-uuid-1' },
    name: 'TechCorp',
    isActive: true,
    sector: { id: { value: 'sector-uuid-1' }, name: 'Technology' },
}

export const mockContact: Contact = {
    id: { value: 'contact-uuid-1' },
    fullName: 'Ana López',
    email: 'ana@techcorp.es',
    phoneNumber: '+34600000001',
    isMain: true,
    note: null,
}
