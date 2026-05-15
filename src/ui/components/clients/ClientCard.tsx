import type { Client } from "@/domain/client/client.entity";
import { Badge } from "@/ui/components/ui/badge";
import { Card, CardContent } from "@/ui/components/ui/card";
import { Tag } from "lucide-react";
import { Link } from "react-router-dom";

interface ClientCardProps {
    client: Client;
}

function ClientInitials({ name }: { name: string }) {
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

export function ClientCard({ client }: ClientCardProps) {
    return (
        <Link to={`/clients/${client.id.value}`} className="block h-full">
            <Card className={`hover:shadow-lg hover:border-black dark:hover:border-white hover:scale-[1.02] transition-all duration-200 h-full cursor-pointer ${!client.isActive ? "opacity-60" : ""}`}>
                <CardContent className="p-4 flex items-center gap-4">
                    <ClientInitials name={client.name} />

                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold leading-tight truncate">
                            {client.name}
                        </h3>
                        <div className="flex items-center gap-1 mt-0.5 text-[11px] text-muted-foreground">
                            <Tag className="size-3 shrink-0" />
                            <span className="truncate">{client.sector?.name || "-"}</span>
                        </div>
                    </div>

                    <Badge
                        className={`shrink-0 ${
                            client.isActive
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0"
                                : "bg-muted text-muted-foreground border-0"
                        }`}
                    >
                        {client.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                </CardContent>
            </Card>
        </Link>
    );
}
