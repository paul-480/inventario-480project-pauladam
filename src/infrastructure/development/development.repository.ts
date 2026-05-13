import type { Development } from "@/domain/development/development.entity";
import type { CreateDevelopmentSchema, UpdateDevelopmentSchema } from "./development.schema";

export interface DevelopmentRepository {
    getProjectDevelopments(projectId: string): Promise<Development[]>;
    createProjectDevelopment(projectId: string, development: CreateDevelopmentSchema): Promise<Development | null>;
    updateProjectDevelopment(projectId: string, developmentId: string, development: UpdateDevelopmentSchema): Promise<Development | null>;
    deleteProjectDevelopment(projectId: string, developmentId: string): Promise<void>;
}
