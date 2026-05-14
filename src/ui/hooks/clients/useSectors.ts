import { useState, useEffect, useCallback } from "react";
import type { Sector } from "@/domain/sector/sector.entity";
import { SectorApiRepository } from "@/infrastructure/api/sector/sector.api.repository";
import type { CreateSectorSchema, UpdateSectorSchema } from "@/infrastructure/sector/sector.schema";

export function useSectors() {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchSectors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await SectorApiRepository.getSectors();
            setSectors(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching sectors"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSectors();
    }, [fetchSectors]);

    const createSector = useCallback(async (sector: CreateSectorSchema) => {
        setLoading(true);
        setError(null);
        try {
            const newSector = await SectorApiRepository.createSector(sector);
            if (newSector) {
                setSectors(prev => [...prev, newSector]);
            }
            return newSector;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error creating sector"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSector = useCallback(async (sector: UpdateSectorSchema) => {
        setLoading(true);
        setError(null);
        try {
            const updated = await SectorApiRepository.updateSector(sector);
            if (updated) {
                setSectors(prev => prev.map(s => s.id.value === updated.id.value ? updated : s));
            }
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating sector"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteSector = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            await SectorApiRepository.deleteSector(id);
            setSectors(prev => prev.filter(s => s.id.value !== id));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error deleting sector"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        sectors,
        loading,
        error,
        refetch: fetchSectors,
        createSector,
        updateSector,
        deleteSector
    };
}

export function useSector(sectorId: string | null) {
    const [sector, setSector] = useState<Sector | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!sectorId) {
            setSector(null);
            return;
        }

        const fetchSector = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await SectorApiRepository.getSectorById(sectorId);
                setSector(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error("Error fetching sector"));
            } finally {
                setLoading(false);
            }
        };

        fetchSector();
    }, [sectorId]);

    return { sector, loading, error };
}
