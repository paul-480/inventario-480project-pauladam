import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "@/domain/project/project.entity";
import { ProjectApiRepository } from "@/infrastructure/api/project/project.api.repository";
import { GetProjectByIdUseCase } from "@/application/project/use-cases/get-project-by-id.use-case";
import { SoftDeleteProjectUseCase } from "@/application/project/use-cases/soft-delete-project.use-case";
import { DeleteProjectUseCase } from "@/application/project/use-cases/delete-project.use-case";

const projectRepository = ProjectApiRepository;

export function useProjectData(id: string | undefined) {
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);
    const [projectLoading, setProjectLoading] = useState(true);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        setProjectLoading(true);
        GetProjectByIdUseCase(projectRepository, id)
            .then((p) => setProject(p))
            .catch(() => setProject(null))
            .finally(() => setProjectLoading(false));
    }, [id]);

    const onSoftDelete = useCallback(async () => {
        if (!project) return;
        try {
            await SoftDeleteProjectUseCase(projectRepository, project.id.value, !project.isActive);
            setProject((prev) => prev ? { ...prev, isActive: !prev.isActive } : prev);
        } catch { /* ignore */ }
    }, [project]);

    const onDelete = useCallback(async () => {
        if (!project) return;
        setDeleteLoading(true);
        try {
            await DeleteProjectUseCase(projectRepository, project.id.value);
            navigate("/projects");
        } catch {
            setDeleteLoading(false);
            setDeleteConfirmOpen(false);
        }
    }, [project, navigate]);

    return {
        project,
        setProject,
        projectLoading,
        onSoftDelete,
        deleteConfirmOpen,
        setDeleteConfirmOpen,
        deleteLoading,
        onDelete,
    };
}
