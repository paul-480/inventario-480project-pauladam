import { useCallback, useState } from "react";
import type { Project } from "@/domain/project/project.entity";
import { CreateProjectUseCase } from "@/application/project/use-cases/create-project.use-case";
import { ProjectApiRepository } from "@/infrastructure/api/project/project.api.repository";
import type { CreateProjectSchema } from "@/infrastructure/project/project.schema";

const repository = ProjectApiRepository;

export function useCreateProject() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createProject = useCallback(async (data: CreateProjectSchema): Promise<Project | null> => {
        setLoading(true);
        setError(null);
        try {
            const project = await CreateProjectUseCase(repository, data);
            return project;
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error al crear el proyecto"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { createProject, loading, error };
}
