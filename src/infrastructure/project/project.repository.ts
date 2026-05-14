import type { Project } from "@/domain/project/project.entity";
import type { CreateProjectSchema, UpdateProjectSchema } from "./project.schema";

export interface ProjectRepository {
    getProjectById(id: string): Promise<Project | null>;
    getProjects(): Promise<Project[]>;
    getProjectsByUserId(userId: string): Promise<Project[]>;
    createProject(project: CreateProjectSchema): Promise<Project | null>;
    updateProject(project: UpdateProjectSchema): Promise<Project | null>;
    softDeleteProject(id: string, isActive: boolean): Promise<void>;
    deleteProject(id: string): Promise<void>;
}
