import { useState, useEffect, useCallback } from "react";
import type { Contact } from "@/domain/contact/contact.entity";
import { ContactApiRepository } from "@/infrastructure/api/contact/contact.api.repository";
import type { CreateContactSchema, UpdateContactSchema } from "@/infrastructure/contact/contact.schema";

export function useClientContacts(clientId: string | null) {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchContacts = useCallback(async () => {
        if (!clientId) {
            setContacts([]);
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const data = await ContactApiRepository.getClientContacts(clientId);
            setContacts(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching contacts"));
        } finally {
            setLoading(false);
        }
    }, [clientId]);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts]);

    const createContact = useCallback(async (contact: CreateContactSchema) => {
        if (!clientId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const newContact = await ContactApiRepository.createClientContact(clientId, contact);
            if (newContact) {
                setContacts(prev => [...prev, newContact]);
            }
            return newContact;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error creating contact"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [clientId]);

    const updateContact = useCallback(async (contactId: string, contact: UpdateContactSchema) => {
        if (!clientId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const updated = await ContactApiRepository.updateClientContact(clientId, contactId, contact);
            if (updated) {
                setContacts(prev => prev.map(c => c.id.value === contactId ? updated : c));
            }
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating contact"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [clientId]);

    const updateMainStatus = useCallback(async (contactId: string) => {
        if (!clientId) return;
        
        setLoading(true);
        setError(null);
        try {
            await ContactApiRepository.updateContactMainStatus(clientId, contactId);
            setContacts(prev => prev.map(c => ({
                ...c,
                isMain: c.id.value === contactId ? true : false
            })));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating contact main status"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [clientId]);

    const deleteContact = useCallback(async (contactId: string) => {
        if (!clientId) return;
        
        setLoading(true);
        setError(null);
        try {
            await ContactApiRepository.deleteClientContact(clientId, contactId);
            setContacts(prev => prev.filter(c => c.id.value !== contactId));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error deleting contact"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [clientId]);

    return {
        contacts,
        loading,
        error,
        refetch: fetchContacts,
        createContact,
        updateContact,
        updateMainStatus,
        deleteContact
    };
}
