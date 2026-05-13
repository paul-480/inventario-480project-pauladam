import { useState, useEffect, useCallback } from "react";
import type { Development } from "@/domain/development/development.entity";
import { DevelopmentApiRepository } from "@/infrastructure/api/development/development.api.repository";
import type { CreateDevelopmentSchema, UpdateDevelopmentSchema } from "@/infrastructure/development/development.schema";

export function useProjectDevelopments(projectId: string | null) {
    const [developments, setDevelopments] = useState<Development[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchDevelopments = useCallback(async () => {
        if (!projectId) {
            setDevelopments([]);
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const data = await DevelopmentApiRepository.getProjectDevelopments(projectId);
            setDevelopments(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching developments"));
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchDevelopments();
    }, [fetchDevelopments]);

    const createDevelopment = useCallback(async (development: CreateDevelopmentSchema) => {
        if (!projectId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const newDev = await DevelopmentApiRepository.createProjectDevelopment(projectId, development);
            if (newDev) {
                setDevelopments(prev => [...prev, newDev]);
            }
            return newDev;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error creating development"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const updateDevelopment = useCallback(async (developmentId: string, development: UpdateDevelopmentSchema) => {
        if (!projectId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const updated = await DevelopmentApiRepository.updateProjectDevelopment(projectId, developmentId, development);
            if (updated) {
                setDevelopments(prev => prev.map(d => d.id.value === developmentId ? updated : d));
            }
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating development"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const deleteDevelopment = useCallback(async (developmentId: string) => {
        if (!projectId) return;
        
        setLoading(true);
        setError(null);
        try {
            await DevelopmentApiRepository.deleteProjectDevelopment(projectId, developmentId);
            setDevelopments(prev => prev.filter(d => d.id.value !== developmentId));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error deleting development"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    return {
        developments,
        loading,
        error,
        refetch: fetchDevelopments,
        createDevelopment,
        updateDevelopment,
        deleteDevelopment
    };
}
