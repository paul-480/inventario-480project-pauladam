import { zodResolver } from "@hookform/resolvers/zod";
import { v7 as uuidv7 } from "uuid";
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
import { Pencil, UserPlus } from "lucide-react";
import { useClientContacts } from "@/ui/hooks/clients/useContacts";
import type { Contact } from "@/domain/contact/contact.entity";

const formSchema = z.object({
    full_name: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("Email inválido"),
    phone_number: z.string().max(30).optional().nullable(),
    note: z.string().max(100).optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

interface NewContactModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    clientId: string;
    contact?: Contact | null;
    onSuccess?: () => void;
}

export function NewContactModal({ open, onOpenChange, clientId, contact, onSuccess }: NewContactModalProps) {
    const { createContact, updateContact } = useClientContacts(clientId);
    const isEditing = !!contact;

    const {
        control,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: "",
            email: "",
            phone_number: "",
            note: "",
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                full_name: contact?.fullName ?? "",
                email: contact?.email ?? "",
                phone_number: contact?.phoneNumber ?? "",
                note: contact?.note ?? "",
            });
        }
    }, [open, contact, reset]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (isEditing && contact) {
                await updateContact(contact.id.value, {
                    full_name: data.full_name,
                    email: data.email,
                    phone_number: data.phone_number || null,
                    note: data.note || null,
                });
            } else {
                await createContact({
                    id: uuidv7(),
                    full_name: data.full_name,
                    email: data.email,
                    phone_number: data.phone_number || null,
                    note: data.note || null,
                });
            }
            reset();
            onOpenChange(false);
            onSuccess?.();
        } catch {
            setError("root", { message: `No se pudo ${isEditing ? "actualizar" : "crear"} el contacto. Intenta de nuevo.` });
        }
    };

    const handleClose = (open: boolean) => {
        if (!open) reset();
        onOpenChange(open);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        {isEditing ? <Pencil className="size-5 text-primary" /> : <UserPlus className="size-5 text-primary" />}
                        {isEditing ? "Editar Contacto" : "Nuevo Contacto"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <FormInput
                        control={control}
                        name="full_name"
                        label="Nombre completo *"
                        placeholder="Nombre del contacto"
                    />
                    <FormInput
                        control={control}
                        name="email"
                        label="Email *"
                        type="email"
                        placeholder="correo@ejemplo.com"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput
                            control={control}
                            name="phone_number"
                            label="Teléfono"
                            placeholder="+34 600 000 000"
                        />
                        <FormInput
                            control={control}
                            name="note"
                            label="Nota"
                            placeholder="Observaciones (opcional)"
                        />
                    </div>

                    {errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>{errors.root.message}</AlertDescription>
                        </Alert>
                    )}

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (isEditing ? "Guardando..." : "Creando...") : (isEditing ? "Guardar cambios" : "Crear Contacto")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
