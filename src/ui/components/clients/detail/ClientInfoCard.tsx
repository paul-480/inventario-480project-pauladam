import type { Client } from "@/domain/client/client.entity";
import type { UseFormReturn } from "react-hook-form";
import type { ClientEditFormValues } from "@/ui/hooks/clients/useClientDetail";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Alert, AlertDescription } from "@/ui/components/ui/alert";
import { FormInput } from "@/ui/components/forms/common/FormInput";
import { FormSelect } from "@/ui/components/forms/common/FormSelect";
import { Edit, Tag, X } from "lucide-react";

interface ClientInfoCardProps {
    client: Client;
    isAdmin: boolean;
    isEditing: boolean;
    editError: string | null;
    editForm: UseFormReturn<ClientEditFormValues>;
    sectorOptions: { value: string; label: string }[];
    onStartEdit: () => void;
    onCancelEdit: () => void;
    onEditSubmit: (data: ClientEditFormValues) => Promise<void>;
    onSoftDelete: () => void;
}

export function ClientInfoCard({
    client,
    isAdmin,
    isEditing,
    editError,
    editForm,
    sectorOptions,
    onStartEdit,
    onCancelEdit,
    onEditSubmit,
    onSoftDelete,
}: ClientInfoCardProps) {
    const initials = client.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-3">
                    <CardTitle>Información del Cliente</CardTitle>
                    {isAdmin && !isEditing && (
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={onStartEdit}>
                                <Edit className="mr-1.5 h-4 w-4" />
                                Editar
                            </Button>
                            <Button size="sm" variant="outline" onClick={onSoftDelete}>
                                {client.isActive ? "Desactivar" : "Activar"}
                            </Button>
                        </div>
                    )}
                    {isEditing && (
                        <Button size="sm" variant="ghost" onClick={onCancelEdit}>
                            <X className="mr-1.5 h-4 w-4" />
                            Cancelar
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {isEditing ? (
                    <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 max-w-md">
                        <FormInput control={editForm.control} name="name" label="Nombre *" placeholder="Nombre del cliente" />
                        <FormSelect control={editForm.control} name="sector_id" label="Sector *" options={sectorOptions} />
                        {editError && (
                            <Alert variant="destructive">
                                <AlertDescription>{editError}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" disabled={editForm.formState.isSubmitting}>
                            {editForm.formState.isSubmitting ? "Guardando..." : "Guardar cambios"}
                        </Button>
                    </form>
                ) : (
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shrink-0">
                            <span className="text-primary-foreground text-lg font-bold tracking-wide">{initials}</span>
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-2xl font-bold truncate">{client.name}</h2>
                                <Badge className={client.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0" : "bg-muted text-muted-foreground border-0"}>
                                    {client.isActive ? "Activo" : "Inactivo"}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <Tag className="size-3.5 shrink-0" />
                                <span>{client.sector.name}</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
