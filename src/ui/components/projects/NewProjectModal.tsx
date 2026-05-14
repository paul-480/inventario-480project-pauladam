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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/components/ui/select";
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
        register,
        handleSubmit,
        setValue,
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
                start_date: data.start_date ?? null,
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
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="name">
                            Nombre <span className="text-destructive">*</span>
                        </label>
                        <input
                            id="name"
                            {...register("name")}
                            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            placeholder="Nombre del proyecto"
                        />
                        {errors.name && (
                            <p className="text-xs text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="description">
                            Descripción
                        </label>
                        <textarea
                            id="description"
                            {...register("description")}
                            rows={3}
                            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 resize-none"
                            placeholder="Descripción del proyecto (opcional)"
                        />
                        {errors.description && (
                            <p className="text-xs text-destructive">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="start_date">
                                Fecha de inicio
                            </label>
                            <input
                                id="start_date"
                                type="date"
                                {...register("start_date")}
                                className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                            />
                            {errors.start_date && (
                                <p className="text-xs text-destructive">{errors.start_date.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">
                                Cliente <span className="text-destructive">*</span>
                            </label>
                            <Select
                                disabled={clientsLoading}
                                onValueChange={(val) =>
                                    setValue("client_id", val, { shouldValidate: true })
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue
                                        placeholder={
                                            clientsLoading ? "Cargando clientes..." : "Selecciona un cliente"
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {clients.map((client) => (
                                        <SelectItem key={client.id.value} value={client.id.value}>
                                            {client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.client_id && (
                                <p className="text-xs text-destructive">{errors.client_id.message}</p>
                            )}
                        </div>
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
