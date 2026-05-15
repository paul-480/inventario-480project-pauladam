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
import { UserApiRepository } from "@/infrastructure/api/user/user.api.repository";
import { UserPlus } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio").max(100),
    surname: z.string().min(1, "El apellido es obligatorio").max(100),
    email: z.string().email("Email inválido").max(150),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    role: z.enum(["ROLE_ADMIN", "ROLE_EMPLOYEE"] as const),
});

type FormValues = z.infer<typeof formSchema>;

const roleOptions = [
    { value: "ROLE_EMPLOYEE", label: "Empleado" },
    { value: "ROLE_ADMIN", label: "Administrador" },
];

interface NewUserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

export function NewUserModal({ open, onOpenChange, onSuccess }: NewUserModalProps) {
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
            surname: "",
            email: "",
            password: "",
            role: "ROLE_EMPLOYEE",
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            await UserApiRepository.createUser({
                id: uuidv7(),
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: data.password,
                role: data.role,
            });
            reset();
            onOpenChange(false);
            onSuccess?.();
        } catch {
            setError("root", { message: "No se pudo crear el usuario. Intenta de nuevo." });
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
                        <UserPlus className="size-5 text-primary" />
                        Nuevo Usuario
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput control={control} name="name" label="Nombre *" placeholder="Nombre" />
                        <FormInput control={control} name="surname" label="Apellido *" placeholder="Apellido" />
                    </div>
                    <FormInput control={control} name="email" label="Email *" type="email" placeholder="correo@empresa.com" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormInput control={control} name="password" label="Contraseña *" type="password" placeholder="Mínimo 6 caracteres" />
                        <FormSelect control={control} name="role" label="Rol *" options={roleOptions} />
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
                            {isSubmitting ? "Creando..." : "Crear Usuario"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
