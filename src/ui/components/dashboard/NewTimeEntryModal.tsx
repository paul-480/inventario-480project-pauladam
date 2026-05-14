import { zodResolver } from "@hookform/resolvers/zod";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/components/ui/select";
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
    onSuccess?: () => void;
}

export function NewTimeEntryModal({
    open,
    onOpenChange,
    userId,
    projects,
    onSuccess,
}: NewTimeEntryModalProps) {
    const { createTimeEntry, loading } = useUserTimeEntries(userId);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
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

    const selectedProjectId = watch("project_id");

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

    const handleClose = (open: boolean) => {
        if (!open) reset();
        onOpenChange(open);
    };

    const inputClass =
        "w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50";

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
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="project_id">
                            Proyecto <span className="text-destructive">*</span>
                        </label>
                        <Select
                            value={selectedProjectId}
                            onValueChange={(v) => setValue("project_id", v, { shouldValidate: true })}
                        >
                            <SelectTrigger id="project_id" className="w-full">
                                <SelectValue placeholder="Selecciona un proyecto" />
                            </SelectTrigger>
                            <SelectContent>
                                {projects.map((p) => (
                                    <SelectItem key={p.id.value} value={p.id.value}>
                                        {p.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.project_id && (
                            <p className="text-xs text-destructive">{errors.project_id.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="date">
                                Fecha <span className="text-destructive">*</span>
                            </label>
                            <input
                                id="date"
                                type="date"
                                className={inputClass}
                                {...register("date")}
                            />
                            {errors.date && (
                                <p className="text-xs text-destructive">{errors.date.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium" htmlFor="hour">
                                Horas <span className="text-destructive">*</span>
                            </label>
                            <input
                                id="hour"
                                type="number"
                                step="0.25"
                                min="0.25"
                                max="24"
                                placeholder="ej: 2.5"
                                className={inputClass}
                                {...register("hour")}
                            />
                            {errors.hour && (
                                <p className="text-xs text-destructive">{errors.hour.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium" htmlFor="comment">
                            Comentario <span className="text-muted-foreground font-normal text-xs">(opcional)</span>
                        </label>
                        <input
                            id="comment"
                            type="text"
                            placeholder="Descripción de la tarea..."
                            maxLength={50}
                            className={inputClass}
                            {...register("comment")}
                        />
                        {errors.comment && (
                            <p className="text-xs text-destructive">{errors.comment.message}</p>
                        )}
                    </div>

                    {errors.root && (
                        <p className="text-xs text-destructive text-center">{errors.root.message}</p>
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
