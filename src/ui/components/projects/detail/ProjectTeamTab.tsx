import { useAddUserModal } from "@/ui/hooks/project/useAddUserModal";
import { AddProjectMemberModal } from "@/ui/components/projects/detail/AddProjectMemberModal";
import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { FolderOpen, UserPlus } from "lucide-react";

interface ProjectTeamTabProps {
    teamUsers: ProjectUser[];
    loading: boolean;
    isAdmin: boolean;
    onToggleActive: (appUserId: string, isActive: boolean) => void;
    addUser: (payload: { app_user_id: string; project_role_id: string }) => Promise<any>;
    userOptions: { value: string; label: string }[];
    roleOptions: { value: string; label: string }[];
}

export function ProjectTeamTab({ teamUsers, loading, isAdmin, onToggleActive, addUser, userOptions, roleOptions }: ProjectTeamTabProps) {
    const { addUserModalOpen, setAddUserModalOpen, addUserForm, openAddUserModal, onAddUser } = useAddUserModal(addUser);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                        <FolderOpen className="size-4" />
                        Miembros del equipo
                    </CardTitle>
                    {isAdmin && (
                        <Button size="sm" className="gap-1.5" onClick={openAddUserModal}>
                            <UserPlus className="size-4" />
                            Añadir miembro
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                    </div>
                ) : teamUsers.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                        No hay miembros asignados a este proyecto.
                    </p>
                ) : (
                    <ul className="divide-y">
                        {teamUsers.map((member) => (
                            <li key={member.appUserId.value} className="flex items-center gap-3 py-3 px-1">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <span className="text-[11px] font-bold text-primary">{member.name[0]}{member.surname[0]}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{member.name} {member.surname}</p>
                                    <p className="text-[11px] text-muted-foreground">{member.role.name}</p>
                                </div>
                                <Badge className={member.isUserActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-0 shrink-0" : "bg-muted text-muted-foreground border-0 shrink-0"}>
                                    {member.isUserActive ? "Activo" : "Inactivo"}
                                </Badge>
                                {isAdmin && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="shrink-0 text-xs"
                                        onClick={() => onToggleActive(member.appUserId.value, !member.isUserActive)}
                                    >
                                        {member.isUserActive ? "Desactivar" : "Activar"}
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>

            <AddProjectMemberModal
                open={addUserModalOpen}
                onOpenChange={setAddUserModalOpen}
                form={addUserForm}
                onSubmit={onAddUser}
                userOptions={userOptions}
                roleOptions={roleOptions}
            />
        </Card>
    );
}
