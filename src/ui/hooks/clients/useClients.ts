import { useState, useEffect, useCallback } from "react";
import type { Client } from "@/domain/client/client.entity";
import { ClientApiRepository } from "@/infrastructure/api/client/client.api.repository";
import type { CreateClientSchema, UpdateClientSchema } from "@/infrastructure/client/client.schema";
import { GetAllClientsUseCase } from "@/application/client/use-cases/get-all-clients.use-case";
import { GetClientByIdUseCase } from "@/application/client/use-cases/get-client-by-id.use-case";
import { CreateClientUseCase } from "@/application/client/use-cases/create-client.use-case";
import { UpdateClientUseCase } from "@/application/client/use-cases/update-client.use-case";
import { DeleteClientUseCase } from "@/application/client/use-cases/delete-client.use-case";
import { SoftDeleteClientUseCase } from "@/application/client/use-cases/soft-delete-client.use-case";

const repository = ClientApiRepository;

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchClients = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await GetAllClientsUseCase(repository);
            setClients(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching clients"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const createClient = useCallback(async (client: CreateClientSchema) => {
        setLoading(true);
        setError(null);
        try {
            const newClient = await CreateClientUseCase(repository, client);
            if (newClient) {
                setClients(prev => [...prev, newClient]);
            }
            return newClient;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error creating client"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateClient = useCallback(async (client: UpdateClientSchema) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await UpdateClientUseCase(repository, client);
            if (updated) {
                setClients(prev => prev.map(c => c.id.value === updated.id.value ? updated : c));
            }
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating client"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteClient = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await DeleteClientUseCase(repository, id);
            setClients(prev => prev.filter(c => c.id.value !== id));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error deleting client"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const softDeleteClient = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await SoftDeleteClientUseCase(repository, id);
            setClients(prev => prev.map(c => c.id.value === id ? { ...c, isActive: false } : c));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error soft deleting client"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        clients,
        loading,
        error,
        refetch: fetchClients,
        createClient,
        updateClient,
        deleteClient,
        softDeleteClient
    };
}

export function useClient(clientId: string | null) {
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!clientId) {
            setClient(null);
            return;
        }

        const fetchClient = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await GetClientByIdUseCase(repository, clientId);
                setClient(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Error fetching client"));
            } finally {
                setLoading(false);
            }
        };

        fetchClient();
    }, [clientId]);

    return { client, loading, error };
}
