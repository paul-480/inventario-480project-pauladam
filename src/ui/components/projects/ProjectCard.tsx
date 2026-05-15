import type { Project } from "@/domain/project/project.entity";
import { Badge } from "@/ui/components/ui/badge";
import { Card, CardContent } from "@/ui/components/ui/card";
import { Building2, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectCardProps {
    project: Project;
}

function ProjectInitials({ name }: { name: string }) {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");
    return (
        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground text-sm font-bold tracking-wide">{initials}</span>
        </div>
    );
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link to={`/projects/${project.id.value}`} className="block h-full">
            <Card className={`hover:shadow-lg hover:border-black dark:hover:border-white hover:scale-[1.02] transition-all duration-200 h-full cursor-pointer ${!project.isActive ? "opacity-60" : ""}`}>
                <CardContent className="p-4 flex items-center gap-4">
                    <ProjectInitials name={project.name} />

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold leading-tight truncate">
                            {project.name}
                        </h3>
                        <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Building2 className="size-3 shrink-0" />
                                <span className="truncate max-w-[140px]">{project.client?.name || "-"}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Users className="size-3 shrink-0" />
                                <span>{project.teamMembers ?? 0} miembros</span>
                            </div>
                        </div>
                    </div>

                    <Badge
                        className={`shrink-0 ${
                            project.isActive
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0"
                                : "bg-muted text-muted-foreground border-0"
                        }`}
                    >
                        {project.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                </CardContent>
            </Card>
        </Link>
    );
}
