import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@/domain/user/user.entity";
import { UpdateUserSchema } from "@/infrastructure/user/user.schema";
import { Button } from "@/ui/components/ui/button";
import { Alert, AlertDescription } from "@/ui/components/ui/alert";
import { FormInput } from "@/ui/components/forms/common/FormInput";
import { useUsers } from "@/ui/hooks/user/useUsers";
import { Edit, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { z } from "zod";
import { Switch } from "../ui/switch";

type UpdateUserFormValues = z.infer<typeof UpdateUserSchema>;

type ModifyUserFormProps = {
    user: User;
};

const toFormValues = (u: User): UpdateUserFormValues => ({
    id: u.id.value,
    name: u.name,
    surname: u.surname,
    email: u.email,
    is_active: u.isActive,
    role: u.role.toString() as UpdateUserFormValues["role"],
});

export default function ModifyUserForm({ user }: ModifyUserFormProps) {
    const [isEditing, setIsEditing] = useState(false);
    const { updateUser } = useUsers();
    const navigate = useNavigate();
    const {
        control,
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserFormValues>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: toFormValues(user),
    });

    useEffect(() => {
        reset(toFormValues(user));
    }, [user, reset]);

    const onSubmit: SubmitHandler<UpdateUserFormValues> = async (formData) => {
        try {
            const updated = await updateUser(formData);
            if (!updated) {
                setError("root", { message: "No se pudo actualizar el usuario." });
                return;
            }
            reset(toFormValues(updated));
            setIsEditing(false);
            navigate(0);
        } catch {
            setError("root", { message: "Error al actualizar usuario." });
        }
    };

    const handleCancel = () => {
        reset(toFormValues(user));
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <Button size="sm" onClick={() => setIsEditing(true)} className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Edit className="mr-1.5 h-4 w-4" />
                Editar
            </Button>
        );
    }

    return (
        <form
        id="user-detail-form"
        onSubmit={handleSubmit(
            onSubmit,
            () => undefined
        )}
        className="space-y-4"
        noValidate
    >
        <input type="hidden" {...register("id")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput control={control} name="name" label="Nombre" />
            <FormInput control={control} name="surname" label="Apellido" />
            <FormInput control={control} name="email" label="Correo Corporativo" type="email" className="md:col-span-2" />
            <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">Rol</label>
                <select
                    id="role"
                    className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
                    {...register("role")}
                >
                    <option value="ROLE_EMPLOYEE">Empleado</option>
                    <option value="ROLE_ADMIN">Administrador</option>
                </select>
                {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
            </div>
            <div className="flex items-center gap-2 pt-8">
                <Switch id="is_active"  className="h-4 w-4" {...register("is_active")} />
                <label htmlFor="is_active" className="text-sm">Usuario activo</label>
            </div>
        </div>
        <div className="flex gap-2">
            <Button size="sm" type="submit" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                <Save className="mr-1.5 h-4 w-4" />
                {isSubmitting ? "Guardando..." : "Guardar"}
            </Button>
            <Button size="sm" type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                <X className="mr-1.5 h-4 w-4" />
                Cancelar
            </Button>
        </div>
        {errors.root && (
            <Alert variant="destructive">
                <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
        )}
    </form>
    );
}