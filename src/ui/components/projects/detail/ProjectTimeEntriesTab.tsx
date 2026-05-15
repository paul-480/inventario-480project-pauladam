import type { ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { Calendar, Clock, MessageSquare } from "lucide-react";

interface ProjectTimeEntriesTabProps {
    timeEntries: ProjectTimeEntry[];
    loading: boolean;
    totalHours: number;
}

export function ProjectTimeEntriesTab({ timeEntries, loading, totalHours }: ProjectTimeEntriesTabProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base flex items-center justify-between">
                    <span>Imputaciones de horas</span>
                    {timeEntries.length > 0 && (
                        <span className="text-sm font-normal text-muted-foreground">
                            {timeEntries.length} registros · {totalHours}h total
                        </span>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                    </div>
                ) : timeEntries.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No hay imputaciones de horas para este proyecto.
                    </p>
                ) : (
                    <ul className="divide-y">
                        {timeEntries.map((entry) => (
                            <li key={entry.id.value} className="flex items-center gap-3 py-3 px-1">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-[11px] font-bold text-primary">{entry.name[0]}{entry.surname[0]}</span>
                                </div>
                                <span className="text-sm font-medium min-w-[120px] truncate">{entry.name} {entry.surname}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground min-w-[90px]">
                                    <Calendar className="size-3 shrink-0" />
                                    {new Date(entry.date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" })}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-bold min-w-[40px]">
                                    <Clock className="size-3 shrink-0 text-primary" />{entry.hour}h
                                </span>
                                {entry.comment && (
                                    <span className="flex items-center gap-1 text-xs text-muted-foreground italic truncate">
                                        <MessageSquare className="size-3 shrink-0" />{entry.comment}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    );
}
