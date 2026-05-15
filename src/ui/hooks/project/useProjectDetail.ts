import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/application/auth/useAuth";
import { useClients } from "@/ui/hooks/clients/useClients";
import { useUsers } from "@/ui/hooks/user/useUsers";
import { useProjectRoles } from "@/ui/hooks/project/useProjectRoles";
import { useProjectTimeEntries } from "@/ui/hooks/useTimeEntries";
import { useProjectDevelopments } from "@/ui/hooks/project/useDevelopments";
import { useProjectUsers } from "@/ui/hooks/user/useProjectUsers";
import { useProjectData } from "@/ui/hooks/project/useProjectData";
import { useProjectEditForm } from "@/ui/hooks/project/useProjectEditForm";

export type { EditProjectValues } from "@/ui/hooks/project/useProjectEditForm";

export function useProjectDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { clients } = useClients();
    const { filteredUsers: allUsers } = useUsers();
    const { projectRoles } = useProjectRoles();

    const { timeEntries, loading: entriesLoading } = useProjectTimeEntries(id ?? null);
    const { developments, loading: devsLoading, createDevelopment, updateDevelopment, deleteDevelopment } = useProjectDevelopments(id ?? null);
    const { users: teamUsers, loading: teamLoading, addUser, deactivateUser } = useProjectUsers(id ?? null);

    const { project, setProject, projectLoading, onSoftDelete, deleteConfirmOpen, setDeleteConfirmOpen, deleteLoading, onDelete } = useProjectData(id);

    const { isEditing, setIsEditing, editError, editForm, onEditSubmit, cancelEdit } = useProjectEditForm(project, setProject);

    const totalHours = timeEntries.reduce((sum, e) => sum + Number(e.hour), 0);

    const clientOptions = clients.map((c) => ({ value: c.id.value, label: c.name }));
    const userOptions = allUsers
        .filter((u) => u.isActive && !teamUsers.some((t) => t.appUserId.value === u.id.value))
        .map((u) => ({ value: u.id.value, label: `${u.name} ${u.surname}` }));
    const roleOptions = projectRoles.map((r) => ({ value: r.id.value, label: r.name }));

    return {
        id,
        navigate,
        isAdmin,
        project,
        projectLoading,
        isEditing,
        setIsEditing,
        editError,
        editForm,
        onEditSubmit,
        cancelEdit,
        onSoftDelete,
        deleteConfirmOpen,
        setDeleteConfirmOpen,
        deleteLoading,
        onDelete,
        clientOptions,
        timeEntries,
        entriesLoading,
        totalHours,
        teamUsers,
        teamLoading,
        deactivateUser,
        addUser,
        userOptions,
        roleOptions,
        developments,
        devsLoading,
        deleteDevelopment,
        createDevelopment,
        updateDevelopment,
    };
}
