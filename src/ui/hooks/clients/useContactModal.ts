import { useCallback, useState } from "react";
import type { Contact } from "@/domain/contact/contact.entity";

export function useContactModal() {
    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);

    const openContactModal = useCallback(() => {
        setEditingContact(null);
        setContactModalOpen(true);
    }, []);

    const openEditContactModal = useCallback((contact: Contact) => {
        setEditingContact(contact);
        setContactModalOpen(true);
    }, []);

    const closeContactModal = useCallback(() => {
        setContactModalOpen(false);
        setEditingContact(null);
    }, []);

    return { contactModalOpen, editingContact, openContactModal, openEditContactModal, closeContactModal };
}
