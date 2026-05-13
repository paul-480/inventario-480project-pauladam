import type { Technology } from "@/domain/technology/technology.entity";
import type { CreateTechnologySchema, UpdateTechnologySchema } from "./technology.schema";

export interface TechnologyRepository {
    getTechnologyById(id: string): Promise<Technology | null>;
    getTechnologies(): Promise<Technology[]>;
    createTechnology(technology: CreateTechnologySchema): Promise<Technology | null>;
    updateTechnology(technology: UpdateTechnologySchema): Promise<Technology | null>;
    deleteTechnology(id: string): Promise<void>;
}
