import { useEffect, useCallback, useState } from "react";
import type { Client } from "@/domain/client/client.entity";
import { ClientApiRepository } from "@/infrastructure/api/client/client.api.repository";
import { GetClientByIdUseCase } from "@/application/client/use-cases/get-client-by-id.use-case";
import { GetClientProjectsUseCase } from "@/application/client/use-cases/get-client-projects.use-case";
import { SoftDeleteClientUseCase } from "@/application/client/use-cases/soft-delete-client.use-case";

const clientRepository = ClientApiRepository;

export function useClientData(id: string | undefined) {
    const [client, setClient] = useState<Client | null>(null);
    const [clientLoading, setClientLoading] = useState(true);
    const [projects, setProjects] = useState<any[]>([]);
    const [projectsLoading, setProjectsLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        setClientLoading(true);
        GetClientByIdUseCase(clientRepository, id)
            .then((c) => setClient(c))
            .catch(() => setClient(null))
            .finally(() => setClientLoading(false));
    }, [id]);

    useEffect(() => {
        if (!id) return;
        setProjectsLoading(true);
        GetClientProjectsUseCase(clientRepository, id)
            .then(setProjects)
            .catch(() => setProjects([]))
            .finally(() => setProjectsLoading(false));
    }, [id]);

    const onSoftDelete = useCallback(async () => {
        if (!client) return;
        try {
            await SoftDeleteClientUseCase(clientRepository, client.id.value);
            setClient((prev) => prev ? { ...prev, isActive: !prev.isActive } : prev);
        } catch { /* ignore */ }
    }, [client]);

    return { client, setClient, clientLoading, projects, projectsLoading, onSoftDelete };
}
