import { useState, useEffect, useCallback } from "react";
import type { ProjectRole } from "@/domain/projectRole/projectRole.entity";
import { ProjectRoleApiRepository } from "@/infrastructure/api/projectRole/projectRole.api.repository";
import { GetProjectRolesUseCase } from "@/application/project/use-cases/get-project-roles.use-case";

const repository = ProjectRoleApiRepository;

export function useProjectRoles() {
    const [projectRoles, setProjectRoles] = useState<ProjectRole[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchProjectRoles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await GetProjectRolesUseCase(repository);
            setProjectRoles(data);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error fetching project roles"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjectRoles();
    }, [fetchProjectRoles]);

    return {
        projectRoles,
        loading,
        error,
        refetch: fetchProjectRoles
    };
}
