import { useState, useEffect, useCallback } from "react";
import type { Technology } from "@/domain/technology/technology.entity";
import { TechnologyApiRepository } from "@/infrastructure/api/technology/technology.api.repository";
import type { CreateTechnologySchema, UpdateTechnologySchema } from "@/infrastructure/technology/technology.schema";

export function useTechnologies() {
    const [technologies, setTechnologies] = useState<Technology[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTechnologies = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await TechnologyApiRepository.getTechnologies();
            setTechnologies(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching technologies"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTechnologies();
    }, [fetchTechnologies]);

    const createTechnology = useCallback(async (technology: CreateTechnologySchema) => {
        setLoading(true);
        setError(null);
        try {
            const newTech = await TechnologyApiRepository.createTechnology(technology);
            if (newTech) {
                setTechnologies(prev => [...prev, newTech]);
            }
            return newTech;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error creating technology"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTechnology = useCallback(async (technology: UpdateTechnologySchema) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await TechnologyApiRepository.updateTechnology(technology);
            if (updated) {
                setTechnologies(prev => prev.map(t => t.id.value === updated.id.value ? updated : t));
            }
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating technology"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteTechnology = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await TechnologyApiRepository.deleteTechnology(id);
            setTechnologies(prev => prev.filter(t => t.id.value !== id));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error deleting technology"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        technologies,
        loading,
        error,
        refetch: fetchTechnologies,
        createTechnology,
        updateTechnology,
        deleteTechnology
    };
}

export function useTechnology(technologyId: string | null) {
    const [technology, setTechnology] = useState<Technology | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!technologyId) {
            setTechnology(null);
            return;
        }

        const fetchTechnology = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await TechnologyApiRepository.getTechnologyById(technologyId);
                setTechnology(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Error fetching technology"));
            } finally {
                setLoading(false);
            }
        };

        fetchTechnology();
    }, [technologyId]);

    return { technology, loading, error };
}
