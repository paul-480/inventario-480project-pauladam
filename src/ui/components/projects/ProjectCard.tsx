import type { Project } from "@/domain/project/project.entity";
import { Badge } from "@/ui/components/ui/badge";
import { Card, CardContent } from "@/ui/components/ui/card";
import { Building2, Users } from "lucide-react";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card
            className={`hover:shadow-lg hover:border-black dark:hover:border-white hover:scale-105 transition-all duration-200 h-full ${!project.isActive ? "opacity-60" : ""}`}
        >
            <CardContent className="h-full p-4 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-semibold leading-tight">
                        {project.name}
                    </h3>
                    <Badge
                        className={
                            project.isActive
                                ? "shrink-0 px-1.5 py-0 text-[10px] sm:text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0"
                                : "shrink-0 px-1.5 py-0 text-[10px] sm:text-xs bg-muted text-muted-foreground border-0"
                        }
                    >
                        {project.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                </div>

                {project.description && (
                    <p className="text-[11px] sm:text-sm text-muted-foreground line-clamp-2 leading-snug">
                        {project.description}
                    </p>
                )}

                <div className="mt-auto space-y-1.5">
                    <div>
                        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            Cliente
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            <Building2 className="size-3.5 text-muted-foreground shrink-0" />
                            <span className="text-sm font-semibold truncate">{project.client.name}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] sm:text-sm text-muted-foreground">
                        <Users className="size-3.5 shrink-0" />
                        <span>{project.teamMembers ?? 0} miembros</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
