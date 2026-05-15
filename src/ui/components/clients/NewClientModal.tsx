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
import { useSectors } from "@/ui/hooks/clients/useSectors";
import { Building2 } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(120),
    sector_id: z.string().min(1, "Selecciona un sector"),
});

type FormValues = z.infer<typeof formSchema>;

interface NewClientModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function NewClientModal({ open, onOpenChange, onSuccess }: NewClientModalProps) {
    const { createClient } = useClients();
    const { sectors, loading: sectorsLoading } = useSectors();

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
            sector_id: "",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await createClient({
                id: uuidv7(),
                name: data.name,
                sector_id: data.sector_id,
            });
            reset();
            onOpenChange(false);
            onSuccess?.();
        } catch {
            setError("root", { message: "No se pudo crear el cliente. Intenta de nuevo." });
        }
    };

    const handleClose = (open: boolean) => {
        if (!open) reset();
        onOpenChange(open);
    };

    const sectorOptions = sectors.map((s) => ({ value: s.id.value, label: s.name }));

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <Building2 className="size-5 text-primary" />
                        Nuevo Cliente
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <FormInput
                        control={control}
                        name="name"
                        label="Nombre *"
                        placeholder="Nombre del cliente"
                    />

                    <FormSelect
                        control={control}
                        name="sector_id"
                        label="Sector *"
                        placeholder={sectorsLoading ? "Cargando sectores..." : "Selecciona un sector"}
                        options={sectorOptions}
                    />

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
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creando..." : "Crear Cliente"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
