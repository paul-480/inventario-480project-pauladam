import { useClientDetail } from "@/ui/hooks/clients/useClientDetail";
import { ClientInfoCard } from "@/ui/components/clients/detail/ClientInfoCard";
import { ClientProjectsTab } from "@/ui/components/clients/detail/ClientProjectsTab";
import { ClientContactsTab } from "@/ui/components/clients/detail/ClientContactsTab";
import { Button } from "@/ui/components/ui/button";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/ui/tabs";
import { ArrowLeft, FolderOpen, Users } from "lucide-react";

const ClientDetail = () => {
    const {
        navigate,
        isAdmin,
        client,
        clientLoading,
        isEditing,
        setIsEditing,
        editError,
        editForm,
        onEditSubmit,
        cancelEdit,
        onSoftDelete,
        sectorOptions,
        projects,
        projectsLoading,
        contacts,
        contactsLoading,
        refetchContacts,
        updateMainStatus,
        deleteContact,
    } = useClientDetail();

    if (clientLoading || !client) {
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
                <Button variant="ghost" size="icon" onClick={() => navigate("/clients")}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">Detalle de Cliente</h1>
                    <p className="text-sm text-muted-foreground">Información completa del cliente</p>
                </div>
            </div>

            <ClientInfoCard
                client={client}
                isAdmin={isAdmin}
                isEditing={isEditing}
                editError={editError}
                editForm={editForm}
                sectorOptions={sectorOptions}
                onStartEdit={() => setIsEditing(true)}
                onCancelEdit={cancelEdit}
                onEditSubmit={onEditSubmit}
                onSoftDelete={onSoftDelete}
            />

            <Tabs defaultValue="projects">
                <TabsList>
                    <TabsTrigger value="projects" className="gap-1.5">
                        <FolderOpen className="size-4" />
                        Proyectos
                    </TabsTrigger>
                    <TabsTrigger value="contacts" className="gap-1.5">
                        <Users className="size-4" />
                        Contactos
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="projects" className="mt-4">
                    <ClientProjectsTab projects={projects} loading={projectsLoading} />
                </TabsContent>

                <TabsContent value="contacts" className="mt-4">
                    <ClientContactsTab
                        contacts={contacts}
                        loading={contactsLoading}
                        isAdmin={isAdmin}
                        clientId={client.id.value}
                        onDeleteContact={deleteContact}
                        onUpdateMainStatus={updateMainStatus}
                        onContactSaved={refetchContacts}
                    />
                </TabsContent>
            </Tabs>

        </div>
    );
};

export default ClientDetail;
