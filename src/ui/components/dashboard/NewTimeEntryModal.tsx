import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
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
import { Clock } from "lucide-react";
import { v7 as uuidv7 } from "uuid";
import type { Project } from "@/domain/project/project.entity";
import { useUserTimeEntries } from "@/ui/hooks/useTimeEntries";

const formSchema = z.object({
    project_id: z.string().uuid({ message: "Selecciona un proyecto" }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Fecha requerida" }),
    hour: z.coerce
        .number()
        .min(0.25, { message: "Mínimo 0.25h" })
        .max(24, { message: "Máximo 24h" }),
    comment: z.string().max(50).optional(),
});

type FormInput = z.input<typeof formSchema>;
type FormValues = z.output<typeof formSchema>;

interface NewTimeEntryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string;
    projects: Project[];
    initialProjectId?: string;
    onSuccess?: () => void;
}

export function NewTimeEntryModal({
    open,
    onOpenChange,
    userId,
    projects,
    initialProjectId,
    onSuccess,
}: NewTimeEntryModalProps) {
    const { createTimeEntry, loading } = useUserTimeEntries(userId);

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<FormInput, unknown, FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            project_id: "",
            date: new Date().toISOString().slice(0, 10),
            hour: "" as unknown as number,
            comment: "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createTimeEntry({
                id: uuidv7(),
                project_id: data.project_id,
                date: data.date,
                hour: data.hour,
                comment: data.comment?.trim() || undefined,
            });
            reset();
            onOpenChange(false);
            onSuccess?.();
        } catch {
            setError("root", { message: "No se pudo registrar las horas. Intenta de nuevo." });
        }
    };

    useEffect(() => {
        if (open) {
            reset({
                project_id: initialProjectId ?? "",
                date: new Date().toISOString().slice(0, 10),
                hour: "" as unknown as number,
                comment: "",
            });
        }
    }, [open, initialProjectId, reset]);

    const handleClose = (open: boolean) => {
        if (!open) reset();
        onOpenChange(open);
    };

    const projectOptions = projects.map((p) => ({ value: p.id.value, label: p.name }));

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <Clock className="size-5 text-primary" />
                        Registrar Horas
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <FormSelect
                        control={control}
                        name="project_id"
                        label="Proyecto *"
                        placeholder="Selecciona un proyecto"
                        options={projectOptions}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <FormInput
                            control={control}
                            name="date"
                            label="Fecha *"
                            type="date"
                        />
                        <FormInput
                            control={control}
                            name="hour"
                            label="Horas *"
                            type="number"
                            step="0.25"
                            min="0.25"
                            max="24"
                            placeholder="ej: 2.5"
                        />
                    </div>

                    <FormInput
                        control={control}
                        name="comment"
                        label="Comentario"
                        placeholder="Descripción de la tarea..."
                        maxLength={50}
                    />

                    {errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.root.message}</AlertDescription>
                        </Alert>
                    )}

                    <DialogFooter className="pt-2">
                        <Button type="button" variant="outline" onClick={() => handleClose(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Guardando..." : "Registrar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
