import type { Development, DevelopmentLink } from "@/domain/development/development.entity";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Code2, ExternalLink, GitBranch, Pencil, Trash2 } from "lucide-react";

const ENV_STYLES: Record<DevelopmentLink["environment"], string> = {
    STAGE: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-0",
    PREPRODUCTION: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-0",
    PRODUCTION: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0",
};

const ENV_LABELS: Record<DevelopmentLink["environment"], string> = {
    STAGE: "Stage",
    PREPRODUCTION: "Preproducción",
    PRODUCTION: "Producción",
};

interface DevelopmentCardProps {
    development: Development;
    isAdmin?: boolean;
    onEdit?: (development: Development) => void;
    onDelete?: (developmentId: string) => void;
}

export function DevelopmentCard({ development, isAdmin, onEdit, onDelete }: DevelopmentCardProps) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <Code2 className="size-4 text-primary" />
                        </div>
                        <div className="min-w-0">
                            <CardTitle className="text-sm font-semibold truncate">{development.name}</CardTitle>
                            <p className="text-[11px] text-muted-foreground truncate mt-0.5">{development.description}</p>
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="flex gap-1 shrink-0">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit?.(development)}>
                                <Pencil className="size-3.5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => onDelete?.(development.id.value)}
                            >
                                <Trash2 className="size-3.5" />
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pt-0">
                {/* Technology + repo */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <Badge variant="outline" className="text-[10px] gap-1">
                        <Code2 className="size-2.5" />
                        {development.technology.name}
                    </Badge>
                    <a
                        href={development.urlRepository}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <GitBranch className="size-3.5 shrink-0" />
                        <span className="truncate max-w-[140px]">Repositorio</span>
                        <ExternalLink className="size-2.5 shrink-0" />
                    </a>
                </div>

                {/* Environment links */}
                {development.links.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                        {development.links.map((link) => (
                            <a
                                key={link.id.value}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 rounded-md px-2 py-1 hover:bg-muted transition-colors group"
                            >
                                <Badge className={`text-[10px] shrink-0 ${ENV_STYLES[link.environment]}`}>
                                    {ENV_LABELS[link.environment]}
                                </Badge>
                                <span className="text-[11px] text-muted-foreground truncate group-hover:text-foreground transition-colors">
                                    {link.url}
                                </span>
                                <ExternalLink className="size-3 shrink-0 text-muted-foreground" />
                            </a>
                        ))}
                    </div>
                )}

                {development.links.length === 0 && (
                    <p className="text-[11px] text-muted-foreground italic">Sin entornos configurados</p>
                )}
            </CardContent>
        </Card>
    );
}
