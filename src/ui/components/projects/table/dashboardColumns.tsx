import type { Project } from "@/domain/project/project.entity";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { useAuth } from "@/application/auth/useAuth";
import type { ColumnDef } from "@tanstack/react-table";
import { Building2, CheckCircle2, Clock, Edit2, Users, XCircle } from "lucide-react";

interface ActionCallbacks {
  onRegisterHours: (project: Project) => void;
  onEdit: (project: Project) => void;
}

function ActionsCell({ project, callbacks }: { project: Project; callbacks: ActionCallbacks }) {
  const { isAdmin } = useAuth();
  return (
    <div className="flex items-center gap-1.5">
      <Button
        size="sm"
        variant="outline"
        className="h-7 gap-1 text-xs"
        onClick={() => callbacks.onRegisterHours(project)}
      >
        <Clock className="size-3" />
        Imputar
      </Button>
      {isAdmin && (
        <Button
          size="sm"
          variant="ghost"
          className="h-7 gap-1 text-xs"
          onClick={() => callbacks.onEdit(project)}
        >
          <Edit2 className="size-3" />
          Editar
        </Button>
      )}
    </div>
  );
}

export function getDashboardColumns(callbacks: ActionCallbacks): ColumnDef<Project>[] {
  return [
    {
      accessorKey: "name",
      header: "Nombre",
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        const description = row.original.description;
        return (
          <div className="flex flex-col gap-0.5">
            <span className="font-medium leading-tight">{name}</span>
            <span className="text-xs text-muted-foreground truncate max-w-[220px]">
              {description ?? "Sin descripción"}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "client",
      header: "Cliente",
      cell: ({ row }) => {
        const client = row.getValue("client") as Project["client"];
        return (
          <div className="flex items-center gap-1.5 text-sm">
            <Building2 className="size-3.5 text-muted-foreground shrink-0" />
            <span>{client?.name || "-"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Estado",
      cell: ({ row }) => {
        const isActive = row.getValue("isActive") as boolean;
        return (
          <Badge variant={isActive ? "default" : "destructive"}>
            {isActive ? (
              <CheckCircle2 className="size-3 mr-1" />
            ) : (
              <XCircle className="size-3 mr-1" />
            )}
            {isActive ? "Activo" : "Inactivo"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "teamMembers",
      header: "Miembros",
      cell: ({ row }) => {
        const count = row.getValue("teamMembers") as number | undefined;
        return (
          <div className="flex items-center gap-1.5 text-sm">
            <Users className="size-3.5 text-muted-foreground shrink-0" />
            <span>{count ?? 0}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      enableSorting: false,
      cell: ({ row }) => (
        <ActionsCell project={row.original} callbacks={callbacks} />
      ),
    },
  ];
}
