import type { Development } from "@/domain/development/development.entity";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { DevelopmentCard } from "@/ui/components/projects/DevelopmentCard";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ProjectDevelopmentsTabProps {
    developments: Development[];
    loading: boolean;
    isAdmin: boolean;
    createDevelopment: (development: { technology_id: string; name: string; description: string; url_repository: string; id?: string }) => Promise<Development>;
    updateDevelopment: (developmentId: string, development: { technology_id: string; name: string; description: string; url_repository: string }) => Promise<Development>;
    onDelete: (devId: string) => void;
}

export function ProjectDevelopmentsTab({ developments, loading, isAdmin, createDevelopment, updateDevelopment, onDelete }: ProjectDevelopmentsTabProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingDevelopment, setEditingDevelopment] = useState<Development | null>(null);

    const handleAdd = () => setIsCreateModalOpen(true);
    const handleEdit = (dev: Development) => setEditingDevelopment(dev);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Desarrollos del proyecto</CardTitle>
                    {isAdmin && (
                        <Button size="sm" className="gap-1.5" onClick={handleAdd}>
                            <Plus className="size-4" />
                            Añadir desarrollo
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-40 w-full" />)}
                    </div>
                ) : developments.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No hay desarrollos registrados para este proyecto.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {developments.map((dev) => (
                            <DevelopmentCard
                                key={dev.id.value}
                                development={dev}
                                isAdmin={isAdmin}
                                onEdit={handleEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
