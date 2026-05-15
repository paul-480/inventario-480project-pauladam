import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Project } from "@/domain/project/project.entity";
import { ProjectApiRepository } from "@/infrastructure/api/project/project.api.repository";
import { UpdateProjectUseCase } from "@/application/project/use-cases/update-project.use-case";

const projectRepository = ProjectApiRepository;

const editProjectSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(150),
    description: z.string().max(500).optional(),
    start_date: z.string().optional(),
    client_id: z.string().min(1, "Selecciona un cliente"),
    is_active: z.boolean(),
});
export type EditProjectValues = z.infer<typeof editProjectSchema>;

export function useProjectEditForm(
    project: Project | null,
    onUpdated: (updated: Project) => void
) {
    const [isEditing, setIsEditing] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);

    const editForm = useForm<EditProjectValues>({
        resolver: zodResolver(editProjectSchema),
        defaultValues: { name: "", description: "", start_date: "", client_id: "", is_active: true },
    });

    useEffect(() => {
        if (project && isEditing) {
            editForm.reset({
                name: project.name,
                description: project.description ?? "",
                start_date: project.startDate ?? "",
                client_id: project.client.id.value,
                is_active: project.isActive,
            });
        }
    }, [project, isEditing]);

    const onEditSubmit = async (data: EditProjectValues) => {
        if (!project) return;
        setEditError(null);
        try {
            const updated = await UpdateProjectUseCase(projectRepository, {
                id: project.id.value,
                name: data.name,
                description: data.description ?? null,
                start_date: data.start_date?.trim() || null,
                is_active: data.is_active,
                client_id: data.client_id,
            });
            if (updated) onUpdated(updated);
            setIsEditing(false);
        } catch {
            setEditError("No se pudo guardar los cambios.");
        }
    };

    const cancelEdit = useCallback(() => {
        setIsEditing(false);
        setEditError(null);
    }, []);

    return { isEditing, setIsEditing, editError, editForm, onEditSubmit, cancelEdit };
}
