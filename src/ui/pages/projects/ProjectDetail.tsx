import { useProjectDetail } from "@/ui/hooks/project/useProjectDetail";
import { ProjectInfoCard } from "@/ui/components/projects/detail/ProjectInfoCard";
import { ProjectTimeEntriesTab } from "@/ui/components/projects/detail/ProjectTimeEntriesTab";
import { ProjectTeamTab } from "@/ui/components/projects/detail/ProjectTeamTab";
import { ProjectDevelopmentsTab } from "@/ui/components/projects/detail/ProjectDevelopmentsTab";
import { DeleteProjectDialog } from "@/ui/components/projects/detail/DeleteProjectDialog";
import { Button } from "@/ui/components/ui/button";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/ui/tabs";
import { ArrowLeft, Clock, Code2, Users } from "lucide-react";

const ProjectDetail = () => {
    const {
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
    } = useProjectDetail();

    if (projectLoading || !project) {
        return (
            <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate("/projects")}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">Detalle de Proyecto</h1>
                    <p className="text-sm text-muted-foreground">Información completa del proyecto</p>
                </div>
            </div>

            <ProjectInfoCard
                project={project}
                isAdmin={isAdmin}
                isEditing={isEditing}
                editError={editError}
                editForm={editForm}
                clientOptions={clientOptions}
                teamMemberCount={teamUsers.length}
                totalHours={totalHours}
                onStartEdit={() => setIsEditing(true)}
                onCancelEdit={cancelEdit}
                onEditSubmit={onEditSubmit}
                onSoftDelete={onSoftDelete}
                onOpenDeleteDialog={() => setDeleteConfirmOpen(true)}
            />

            <Tabs defaultValue="entries">
                <TabsList>
                    <TabsTrigger value="entries" className="gap-1.5"><Clock className="size-4" />Imputaciones</TabsTrigger>
                    <TabsTrigger value="team" className="gap-1.5"><Users className="size-4" />Equipo</TabsTrigger>
                    <TabsTrigger value="developments" className="gap-1.5"><Code2 className="size-4" />Desarrollos</TabsTrigger>
                </TabsList>

                <TabsContent value="entries" className="mt-4">
                    <ProjectTimeEntriesTab timeEntries={timeEntries} loading={entriesLoading} totalHours={totalHours} />
                </TabsContent>

                <TabsContent value="team" className="mt-4">
                    <ProjectTeamTab
                        teamUsers={teamUsers}
                        loading={teamLoading}
                        isAdmin={isAdmin}
                        onToggleActive={deactivateUser}
                        addUser={addUser}
                        userOptions={userOptions}
                        roleOptions={roleOptions}
                    />
                </TabsContent>

                <TabsContent value="developments" className="mt-4">
                    <ProjectDevelopmentsTab
                        developments={developments}
                        loading={devsLoading}
                        isAdmin={isAdmin}
                        projectId={id ?? ""}
                        createDevelopment={createDevelopment}
                        updateDevelopment={updateDevelopment}
                        onDelete={deleteDevelopment}
                    />
                </TabsContent>
            </Tabs>

            <DeleteProjectDialog
                open={deleteConfirmOpen}
                onOpenChange={setDeleteConfirmOpen}
                projectName={project.name}
                loading={deleteLoading}
                onConfirm={onDelete}
            />
        </div>
    );
};

export default ProjectDetail;
