import type { Project } from "@/domain/project/project.entity";
import type { ProjectRepository } from "../../project/project.repository";
import type { CreateProjectSchema, UpdateProjectSchema } from "@/infrastructure/project/project.schema";
import { projectMapper } from "@/infrastructure/project/project.mapper";
import { axiosClient } from "../axios.client";

export const ProjectApiRepository: ProjectRepository = {
    getProjectById: async (id: string): Promise<Project | null> => {
        const response = await axiosClient.get(`/projects/${id}`);
        if (!response.data) return null;
        return projectMapper.toDomain(response.data);
    },
    getProjects: async (): Promise<Project[]> => {
        const response = await axiosClient.get("/projects");
        return projectMapper.toDomainList(response.data);
    },
    createProject: async (project: CreateProjectSchema): Promise<Project | null> => {
        const response = await axiosClient.post("/projects", project);
        return projectMapper.toDomain(response.data);
    },
    updateProject: async (project: UpdateProjectSchema): Promise<Project | null> => {
        const response = await axiosClient.put(`/projects/${project.id}`, {
            name: project.name,
            description: project.description,
            start_date: project.start_date,
            is_active: project.is_active,
            client_id: project.client_id
        });
        return projectMapper.toDomain(response.data);
    },
    softDeleteProject: async (id: string, isActive: boolean): Promise<void> => {
        await axiosClient.patch(`/projects/${id}`, { is_active: isActive });
    },
    deleteProject: async (id: string): Promise<void> => {
        await axiosClient.delete(`/projects/${id}`);
    },
    getProjectsByUserId: async (userId: string): Promise<Project[]> => {
        const response = await axiosClient.get(`/users/${userId}/projects`);
        return projectMapper.toDomainList(response.data);
    }
}
