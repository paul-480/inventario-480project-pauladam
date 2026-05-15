import { zodResolver } from "@hookform/resolvers/zod";
import { v7 as uuidv7 } from "uuid";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/ui/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/ui/components/ui/dialog";
import { Alert, AlertDescription } from "@/ui/components/ui/alert";
import { FormInput } from "@/ui/components/forms/common/FormInput";
import { FormSelect } from "@/ui/components/forms/common/FormSelect";
import { useClients } from "@/ui/hooks/clients/useClients";
import { useCreateProject } from "@/ui/hooks/project/useCreateProject";
import { FolderPlus } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(150),
    description: z.string().max(500).optional(),
    start_date: z.string().optional(),
    client_id: z.string().min(1, "Selecciona un cliente"),
});

type FormValues = z.infer<typeof formSchema>;

interface NewProjectModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function NewProjectModal({ open, onOpenChange, onSuccess }: NewProjectModalProps) {
    const { clients, loading: clientsLoading } = useClients();
    const { createProject, loading: creating } = useCreateProject();

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            start_date: "",
            client_id: "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createProject({
                id: uuidv7(),
                name: data.name,
                description: data.description ?? null,
                start_date: data.start_date?.trim() ? data.start_date : undefined,
                client_id: data.client_id,
            });
            reset();
            onOpenChange(false);
            onSuccess?.();
        } catch {
            setError("root", { message: "No se pudo crear el proyecto. Intenta de nuevo." });
        }
    };

    const handleClose = (open: boolean) => {
        if (!open) reset();
        onOpenChange(open);
    };

    const clientOptions = clients.map((c) => ({ value: c.id.value, label: c.name }));

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <FolderPlus className="size-5 text-primary" />
                        Nuevo Proyecto
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <FormInput
                        control={control}
                        name="name"
                        label="Nombre *"
                        placeholder="Nombre del proyecto"
                    />

                    <FormInput
                        control={control}
                        name="description"
                        label="Descripción"
                        placeholder="Descripción del proyecto (opcional)"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput
                            control={control}
                            name="start_date"
                            label="Fecha de inicio"
                            type="date"
                        />

                        <FormSelect
                            control={control}
                            name="client_id"
                            label="Cliente *"
                            placeholder={clientsLoading ? "Cargando clientes..." : "Selecciona un cliente"}
                            options={clientOptions}
                        />
                    </div>

                    {errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.root.message}</AlertDescription>
                        </Alert>
                    )}

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleClose(false)}
                            disabled={creating}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={creating}>
                            {creating ? "Creando..." : "Crear Proyecto"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
