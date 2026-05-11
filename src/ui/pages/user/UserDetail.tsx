import type { User } from "@/domain/user/user.entity";
import { isAdmin } from "@/domain/user/user.entity";
import { ArrowLeft, Edit, Save, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateUserSchema } from "@/infrastructure/user/user.schema";
import { Alert, AlertDescription } from "@/ui/components/ui/alert";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { FormInput } from "@/ui/components/forms/common/FormInput";
import { Skeleton } from "@/ui/components/ui/skeleton";
import CustomAvatar from "@/ui/components/user/CustomAvatar";
import { useMe } from "@/ui/hooks/user/useMe";
import { useUsers } from "@/ui/hooks/user/useUsers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


type UpdateUserFormValues = z.infer<typeof UpdateUserSchema>;

const UserDetail = ({ paramUser }: { paramUser: User | null }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const { getUserById, updateUser } = useUsers();
    const { me } = useMe();
    const {
        control,
        register,
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserFormValues>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            id: "",
            name: "",
            surname: "",
            email: "",
            is_active: true,
            role: "ROLE_EMPLOYEE",
        },
    });

    useEffect(() => {
        if (paramUser) {
            setUser(paramUser);
            return;
        }
        if (!id) return;
        getUserById(id).then((fetchedUser) => {
            setUser(fetchedUser);
        });
    }, [id, paramUser, getUserById]);

    useEffect(() => {
        if (user) {
            reset({
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                is_active: user.isActive,
                role: user.role.toString(),
            });
        }
    }, [user, reset]);

    const handleEdit = () => {
        if (!user) return;
        reset({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            is_active: user.isActive,
            role: user.role.toString(),
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (!user) return;
        reset({
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            is_active: user.isActive,
            role: user.role.toString(),
        });
        setIsEditing(false);
    };

    const onSubmit: SubmitHandler<UpdateUserFormValues> = async (formData) => {
        console.log(formData)
        try {
            const updated = await updateUser(formData);
            if (!updated) {
                setError("root", { message: "No se pudo actualizar el usuario." });
                return;
            }
            setUser(updated);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setError("root", { message: "Error al actualizar usuario." });
        }
    };

    if (!user) {
        return (
            <div className="p-4 md:p-8 max-w-5xl mx-auto">
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    const isOwnProfile = me?.id === user.id;
    const canEdit = !!me && (isAdmin(me) || isOwnProfile);
    const backPath = isOwnProfile ? "/" : "/users";

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(backPath)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">
                        {isOwnProfile ? "Mi Perfil" : "Detalle de Personal"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isOwnProfile ? "Tu informacion personal" : "Informacion completa del empleado"}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <CardTitle>Informacion Personal</CardTitle>
                        <div className="flex gap-2">
                            {canEdit && !isEditing && (
                                <Button size="sm" onClick={handleEdit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    <Edit className="w-4 h-4 mr-1.5" />
                                    Editar
                                </Button>
                            )}
                            {isEditing && (
                                <>
                                    <Button size="sm" type="submit" form="user-detail-form" className="bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
                                        <Save className="w-4 h-4 mr-1.5" />
                                        {isSubmitting ? "Guardando..." : "Guardar"}
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                                        <X className="w-4 h-4 mr-1.5" />
                                        Cancelar
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                        <CustomAvatar user={user} className="w-24 h-24" />
                        <div className="flex-1">
                            {!isEditing ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h2 className={`text-2xl font-bold ${!user.isActive ? "opacity-70" : ""}`}>
                                            {user.name} {user.surname}
                                        </h2>
                                        {isOwnProfile && (
                                            <Badge className="bg-primary/10 text-secondary dark:bg-primary/20 dark:text-secondary border-0">
                                                Tu
                                            </Badge>
                                        )}
                                        {isAdmin(user) && isAdmin(me!) && (
                                            <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0">
                                                Administrador
                                            </Badge>
                                        )}
                                    </div>
                                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${!user.isActive ? "opacity-70" : ""}`}>
                                        <div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Correo Corporativo</p>
                                            <p className="font-medium">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form
                                    id="user-detail-form"
                                    onSubmit={handleSubmit(
                                        onSubmit,
                                        (formErrors) => console.log("Errores de validacion:", formErrors),
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
                                            <input id="is_active" type="checkbox" className="h-4 w-4" {...register("is_active")} />
                                            <label htmlFor="is_active" className="text-sm">Usuario activo</label>
                                        </div>
                                    </div>
                                    {errors.root && (
                                        <Alert variant="destructive">
                                            <AlertDescription>{errors.root.message}</AlertDescription>
                                        </Alert>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserDetail
