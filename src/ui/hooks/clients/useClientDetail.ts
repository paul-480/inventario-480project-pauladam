import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/application/auth/useAuth";
import { useClients } from "@/ui/hooks/clients/useClients";
import { useClientContacts } from "@/ui/hooks/clients/useContacts";
import { useSectors } from "@/ui/hooks/clients/useSectors";
import { useClientData } from "@/ui/hooks/clients/useClientData";
import { useClientEditForm } from "@/ui/hooks/clients/useClientEditForm";

export type { ClientEditFormValues } from "@/ui/hooks/clients/useClientEditForm";

export function useClientDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { updateClient } = useClients();
    const { sectors } = useSectors();
    const { contacts, loading: contactsLoading, refetch: refetchContacts, updateMainStatus, deleteContact } = useClientContacts(id ?? null);

    const { client, setClient, clientLoading, projects, projectsLoading, onSoftDelete } = useClientData(id);

    const { isEditing, setIsEditing, editError, editForm, onEditSubmit, cancelEdit } = useClientEditForm(
        client,
        setClient,
        updateClient
    );

    const sectorOptions = sectors.map((s) => ({ value: s.id.value, label: s.name }));

    return {
        id,
        navigate,
        isAdmin,
        client,
        clientLoading,
        isEditing,
        setIsEditing,
        editError,
        editForm,
        onEditSubmit,
        cancelEdit,
        onSoftDelete,
        sectorOptions,
        projects,
        projectsLoading,
        contacts,
        contactsLoading,
        refetchContacts,
        updateMainStatus,
        deleteContact,
    };
}

