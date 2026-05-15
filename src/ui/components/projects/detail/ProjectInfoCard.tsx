import type { Project } from "@/domain/project/project.entity";
import { displayProjectStartDate } from "@/domain/project/project.entity";
import type { UseFormReturn } from "react-hook-form";
import type { EditProjectValues } from "@/ui/hooks/project/useProjectDetail";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent } from "@/ui/components/ui/card";
import { Alert, AlertDescription } from "@/ui/components/ui/alert";
import { FormInput } from "@/ui/components/forms/common/FormInput";
import { FormSelect } from "@/ui/components/forms/common/FormSelect";
import { Building2, Calendar, Clock, Edit, Trash2, Users, X } from "lucide-react";

interface ProjectInfoCardProps {
    project: Project;
    isAdmin: boolean;
    isEditing: boolean;
    editError: string | null;
    editForm: UseFormReturn<EditProjectValues>;
    clientOptions: { value: string; label: string }[];
    teamMemberCount: number;
    totalHours: number;
    onStartEdit: () => void;
    onCancelEdit: () => void;
    onEditSubmit: (data: EditProjectValues) => Promise<void>;
    onSoftDelete: () => void;
    onOpenDeleteDialog: () => void;
}

export function ProjectInfoCard({
    project,
    isAdmin,
    isEditing,
    editError,
    editForm,
    clientOptions,
    teamMemberCount,
    totalHours,
    onStartEdit,
    onCancelEdit,
    onEditSubmit,
    onSoftDelete,
    onOpenDeleteDialog,
}: ProjectInfoCardProps) {
    const initials = project.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");

    return (
        <Card>
            <CardContent className="p-6">
                {isEditing ? (
                    <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4 max-w-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput control={editForm.control} name="name" label="Nombre *" placeholder="Nombre del proyecto" />
                            <FormSelect control={editForm.control} name="client_id" label="Cliente *" options={clientOptions} />
                        </div>
                        <FormInput control={editForm.control} name="description" label="Descripción" placeholder="Descripción (opcional)" />
                        <FormInput control={editForm.control} name="start_date" label="Fecha de inicio" type="date" />
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
                    <div className="flex items-start gap-5">
                        <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center shrink-0">
                            <span className="text-primary-foreground text-lg font-bold tracking-wide">{initials}</span>
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-2xl font-bold truncate">{project.name}</h2>
                                <Badge className={project.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0" : "bg-muted text-muted-foreground border-0"}>
                                    {project.isActive ? "Activo" : "Inactivo"}
                                </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1.5"><Building2 className="size-3.5 shrink-0" />{project.client.name}</span>
                                {project.startDate && (
                                    <span className="flex items-center gap-1.5"><Calendar className="size-3.5 shrink-0" />{displayProjectStartDate(project)}</span>
                                )}
                                <span className="flex items-center gap-1.5"><Users className="size-3.5 shrink-0" />{project.teamMembers ?? teamMemberCount} miembros</span>
                                <span className="flex items-center gap-1.5"><Clock className="size-3.5 shrink-0" />{totalHours}h imputadas</span>
                            </div>
                            {project.description && <p className="text-sm text-muted-foreground mt-1">{project.description}</p>}
                        </div>
                        {isAdmin && (
                            <div className="flex gap-2 shrink-0">
                                <Button size="sm" variant="outline" className="gap-1.5" onClick={onStartEdit}>
                                    <Edit className="size-4" />
                                    Editar
                                </Button>
                                <Button size="sm" variant="outline" onClick={onSoftDelete}>
                                    {project.isActive ? "Desactivar" : "Activar"}
                                </Button>
                                <Button size="sm" variant="destructive" onClick={onOpenDeleteDialog}>
                                    <Trash2 className="size-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
                {isEditing && (
                    <Button size="sm" variant="ghost" className="mt-2" onClick={onCancelEdit}>
                        <X className="size-4 mr-1" />
                        Cancelar
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
