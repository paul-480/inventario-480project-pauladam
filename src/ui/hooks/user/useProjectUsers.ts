import { useState, useEffect, useCallback } from "react";
import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";
import { ProjectUserApiRepository } from "@/infrastructure/api/projectUser/projectUser.api.repository";
import type { AddProjectUserSchema } from "@/infrastructure/projectUser/projectUser.repository";

export function useProjectUsers(projectId: string | null) {
    const [users, setUsers] = useState<ProjectUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchUsers = useCallback(async () => {
        if (!projectId) {
            setUsers([]);
            return;
        }
        
        setLoading(true);
        setError(null);
        try {
            const data = await ProjectUserApiRepository.getProjectUsers(projectId);
            setUsers(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching project users"));
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const addUser = useCallback(async (user: AddProjectUserSchema) => {
        if (!projectId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const newUser = await ProjectUserApiRepository.addProjectUser(projectId, user);
            if (newUser) {
                setUsers(prev => [...prev, newUser]);
            }
            return newUser;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error adding user to project"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const updateUser = useCallback(async (user: AddProjectUserSchema) => {
        if (!projectId) return null;
        
        setLoading(true);
        setError(null);
        try {
            const updated = await ProjectUserApiRepository.updateProjectUsers(projectId, user);
            if (updated) {
                setUsers(prev => prev.map(u => u.appUserId.value === updated.appUserId.value ? updated : u));
            }
            return updated;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error updating project user"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    const deactivateUser = useCallback(async (appUserId: string, isActive: boolean) => {
        if (!projectId) return;
        
        setLoading(true);
        setError(null);
        try {
            await ProjectUserApiRepository.deactivateProjectUser(projectId, appUserId, isActive);
            setUsers(prev => prev.map(u => 
                u.appUserId.value === appUserId ? { ...u, isUserActive: isActive } : u
            ));
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error deactivating project user"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    return {
        users,
        loading,
        error,
        refetch: fetchUsers,
        addUser,
        updateUser,
        deactivateUser
    };
}
