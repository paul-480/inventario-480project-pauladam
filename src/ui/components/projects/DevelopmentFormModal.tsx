import { useEffect } from "react";
import { useForm, useFieldArray, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Development } from "@/domain/development/development.entity";
import { useTechnologies } from "@/ui/hooks/project/useTechnologies";
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
import { Code2, Plus, Trash2 } from "lucide-react";
import { Field, FieldLabel, FieldError } from "@/ui/components/ui/field";
import { Input } from "@/ui/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/components/ui/select";
const linkSchema = z.object({
    environment: z.enum(["STAGE", "PREPRODUCTION", "PRODUCTION"]),
    url: z.string().url("URL inválida"),
});

const formSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(100),
    description: z.string().min(1, "La descripción es obligatoria").max(150),
    technology_id: z.string().min(1, "Selecciona una tecnología"),
    url_repository: z.string().url("URL de repositorio inválida"),
    links: z.array(linkSchema),
});

type FormValues = z.infer<typeof formSchema>;

const ENV_OPTIONS = [
    { value: "STAGE", label: "Stage" },
    { value: "PREPRODUCTION", label: "Preproducción" },
    { value: "PRODUCTION", label: "Producción" },
];

interface DevelopmentFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectId: string;
    development?: Development | null;
    onSubmit: (data: FormValues) => Promise<void>;
}

export function DevelopmentFormModal({
    open,
    onOpenChange,
    development,
    onSubmit,
}: DevelopmentFormModalProps) {
    const { technologies } = useTechnologies();

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            technology_id: "",
            url_repository: "",
            links: [],
        },
    });

    const { fields, append, remove } = useFieldArray({ control, name: "links" });

    useEffect(() => {
        if (open) {
            if (development) {
                reset({
                    name: development.name,
                    description: development.description,
                    technology_id: development.technology.id.value,
                    url_repository: development.urlRepository,
                    links: development.links.map((l) => ({
                        environment: l.environment,
                        url: l.url,
                    })),
                });
            } else {
                reset({
                    name: "",
                    description: "",
                    technology_id: "",
                    url_repository: "",
                    links: [],
                });
            }
        }
    }, [open, development, reset]);

    const handleFormSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await onSubmit(data);
            onOpenChange(false);
        } catch {
            setError("root", { message: "No se pudo guardar el desarrollo. Intenta de nuevo." });
        }
    };

    const techOptions = technologies.map((t) => ({ value: t.id.value, label: t.name }));

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <Code2 className="size-5 text-primary" />
                        {development ? "Editar Desarrollo" : "Nuevo Desarrollo"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-4">
                    <FormInput control={control} name="name" label="Nombre *" placeholder="Ej: Frontend" />
                    <FormInput control={control} name="description" label="Descripción *" placeholder="Ej: SPA React" />
                    <FormSelect
                        control={control}
                        name="technology_id"
                        label="Tecnología *"
                        options={techOptions}
                        placeholder="Selecciona tecnología"
                    />
                    <FormInput
                        control={control}
                        name="url_repository"
                        label="URL Repositorio *"
                        placeholder="https://github.com/org/repo"
                        type="url"
                    />

                    {/* Dynamic links */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Entornos</span>
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs gap-1"
                                onClick={() => append({ environment: "STAGE", url: "" })}
                            >
                                <Plus className="size-3" />
                                Añadir entorno
                            </Button>
                        </div>

                        {fields.length === 0 && (
                            <p className="text-xs text-muted-foreground italic">Sin entornos configurados.</p>
                        )}

                        <div className="space-y-2">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2 items-start">
                                    {/* Environment select */}
                                    <div className="w-36 shrink-0">
                                        <Controller
                                            control={control}
                                            name={`links.${index}.environment`}
                                            render={({ field: f, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <Select value={f.value} onValueChange={f.onChange}>
                                                        <SelectTrigger className="h-9 text-xs">
                                                            <SelectValue placeholder="Entorno" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {ENV_OPTIONS.map((o) => (
                                                                <SelectItem key={o.value} value={o.value} className="text-xs">
                                                                    {o.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FieldError errors={[fieldState.error]} />
                                                </Field>
                                            )}
                                        />
                                    </div>

                                    {/* URL input */}
                                    <div className="flex-1 min-w-0">
                                        <Controller
                                            control={control}
                                            name={`links.${index}.url`}
                                            render={({ field: f, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel className="sr-only" htmlFor={`links.${index}.url`}>URL</FieldLabel>
                                                    <Input
                                                        {...f}
                                                        id={`links.${index}.url`}
                                                        placeholder="https://app.client.com"
                                                        className="h-9 text-xs"
                                                        aria-invalid={fieldState.invalid}
                                                    />
                                                    <FieldError errors={[fieldState.error]} />
                                                </Field>
                                            )}
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="h-9 w-9 shrink-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 className="size-3.5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.root.message}</AlertDescription>
                        </Alert>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Guardando..." : development ? "Guardar cambios" : "Crear Desarrollo"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
