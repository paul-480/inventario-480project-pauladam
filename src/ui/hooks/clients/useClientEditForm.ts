import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Client } from "@/domain/client/client.entity";
import type { UpdateClientSchema } from "@/infrastructure/client/client.schema";

const editSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(120),
    sector_id: z.string().min(1, "Selecciona un sector"),
});
export type ClientEditFormValues = z.infer<typeof editSchema>;

export function useClientEditForm(
    client: Client | null,
    onUpdated: (updated: Client) => void,
    updateClient: (payload: UpdateClientSchema) => Promise<Client | null | undefined>
) {
    const [isEditing, setIsEditing] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const editForm = useForm<ClientEditFormValues>({
        resolver: zodResolver(editSchema),
        defaultValues: { name: "", sector_id: "" },
    });

    useEffect(() => {
        if (client) {
            editForm.reset({ name: client.name, sector_id: client.sector.id.value });
        }
    }, [client]);

    const onEditSubmit = async (data: ClientEditFormValues) => {
        if (!client) return;
        setEditError(null);
        try {
            const updated = await updateClient({
                id: client.id.value,
                name: data.name,
                sector_id: data.sector_id,
                is_active: client.isActive,
            });
            if (updated) onUpdated(updated);
            setIsEditing(false);
        } catch {
            setEditError("No se pudo guardar los cambios. Intenta de nuevo.");
        }
    };

    const cancelEdit = useCallback(() => {
        setIsEditing(false);
        setEditError(null);
        if (client) editForm.reset({ name: client.name, sector_id: client.sector.id.value });
    }, [client, editForm]);

    return { isEditing, setIsEditing, editError, editForm, onEditSubmit, cancelEdit };
}
