import { useState, useEffect, useCallback } from "react";
import type { TimeEntry, ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import { TimeEntryApiRepository } from "@/infrastructure/api/timeEntry/timeEntry.api.repository";
import type { CreateTimeEntrySchema, UpdateTimeEntrySchema } from "@/infrastructure/timeEntry/timeEntry.schema";
import { GetProjectTimeEntriesUseCase } from "@/application/project/use-cases/get-project-time-entries.use-case";
import { GetUserTimeEntriesUseCase } from "@/application/timeEntry/use-cases/get-user-time-entries.use-case";
import { CreateTimeEntryUseCase } from "@/application/timeEntry/use-cases/create-time-entry.use-case";
import { UpdateProjectTimeEntryUseCase } from "@/application/timeEntry/use-cases/update-project-time-entry.use-case";
import { DeleteProjectTimeEntryUseCase } from "@/application/timeEntry/use-cases/delete-project-time-entry.use-case";

const repository = TimeEntryApiRepository;

export function useUserTimeEntries(userId: string | null, filters?: {
    from?: string;
    to?: string;
    projectId?: string;
    page?: number;
    limit?: number;
}) {
    const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTimeEntries = useCallback(async () => {
        if (!userId) return;
        
        setLoading(true);
        setError(null);
        try {
            const data = await GetUserTimeEntriesUseCase(
                repository,
                userId,
                filters?.from,
                filters?.to,
                filters?.projectId,
                filters?.page,
                filters?.limit
            );
            setTimeEntries(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching time entries"));
        } finally {
            setLoading(false);
        }
    }, [userId, filters?.from, filters?.to, filters?.projectId, filters?.page, filters?.limit]);

    useEffect(() => {
        fetchTimeEntries();
    }, [fetchTimeEntries]);

    const createTimeEntry = useCallback(async (entry: CreateTimeEntrySchema) => {
        if (!userId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const newEntry = await CreateTimeEntryUseCase(repository, userId, entry);
            if (newEntry) {
                setTimeEntries(prev => [...prev, newEntry]);
            }
            return newEntry;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error creating time entry"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [userId]);

    return {
        timeEntries,
        loading,
        error,
        refetch: fetchTimeEntries,
        createTimeEntry
    };
}

export function useProjectTimeEntries(projectId: string | null, filters?: {
    from?: string;
    to?: string;
    app_user_id?: string;
    min_hour?: number;
    max_hour?: number;
    has_comment?: boolean;
    sort_by?: string;
    sort_order?: string;
    page?: number;
    limit?: number;
}) {
    const [timeEntries, setTimeEntries] = useState<ProjectTimeEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchTimeEntries = useCallback(async () => {
        if (!projectId) return;
        
        setLoading(true);
        setError(null);
        try {
            const data = await GetProjectTimeEntriesUseCase(repository, projectId, filters);
            setTimeEntries(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching project time entries"));
        } finally {
            setLoading(false);
        }
    }, [projectId, filters]);

    useEffect(() => {
        fetchTimeEntries();
    }, [fetchTimeEntries]);

    const updateTimeEntry = useCallback(async (entryId: string, entry: UpdateTimeEntrySchema) => {
        if (!projectId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const updated = await UpdateProjectTimeEntryUseCase(repository, projectId, entryId, entry);
            if (updated) {
                setTimeEntries(prev => prev.map(e => e.id.value === entryId ? updated : e));
            }
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating time entry"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const deleteTimeEntry = useCallback(async (entryId: string) => {
        if (!projectId) return;
        
        setLoading(true);
        setError(null);
        try {
            await DeleteProjectTimeEntryUseCase(repository, projectId, entryId);
            setTimeEntries(prev => prev.filter(e => e.id.value !== entryId));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error deleting time entry"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    return {
        timeEntries,
        loading,
        error,
        refetch: fetchTimeEntries,
        updateTimeEntry,
        deleteTimeEntry
    };
}
