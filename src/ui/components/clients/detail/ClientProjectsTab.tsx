import { Badge } from "@/ui/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { Building2 } from "lucide-react";

interface ClientProjectsTabProps {
    projects: any[];
    loading: boolean;
}

export function ClientProjectsTab({ projects, loading }: ClientProjectsTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Proyectos del cliente</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : projects.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No hay proyectos asociados a este cliente.
                    </p>
                ) : (
                    <ul className="divide-y">
                        {projects.map((p: any) => (
                            <li key={p.id} className="flex items-center justify-between py-3 px-1 gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Building2 className="size-4 text-primary" />
                                    </div>
                                    <span className="text-sm font-medium truncate">{p.name}</span>
                                </div>
                                <Badge className={p.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0 shrink-0" : "bg-muted text-muted-foreground border-0 shrink-0"}>
                                    {p.is_active ? "Activo" : "Inactivo"}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
