import type { Technology } from "@/domain/technology/technology.entity";
import type { TechnologyRepository } from "@/infrastructure/technology/technology.repository";
import type { CreateTechnologySchema, UpdateTechnologySchema } from "@/infrastructure/technology/technology.schema";
import { technologyMapper } from "@/infrastructure/technology/technology.mapper";
import { axiosClient } from "../axios.client";

export const TechnologyApiRepository: TechnologyRepository = {
    getTechnologyById: async (id: string): Promise<Technology | null> => {
        const response = await axiosClient.get(`/technologies/${id}`);
        if (!response.data) return null;
        return technologyMapper.toDomain(response.data);
    },
    getTechnologies: async (): Promise<Technology[]> => {
        const response = await axiosClient.get("/technologies");
        return technologyMapper.toDomainList(response.data);
    },
    createTechnology: async (technology: CreateTechnologySchema): Promise<Technology | null> => {
        const response = await axiosClient.post("/technologies", technology);
        return technologyMapper.toDomain(response.data);
    },
    updateTechnology: async (technology: UpdateTechnologySchema): Promise<Technology | null> => {
        const response = await axiosClient.put(`/technologies/${technology.id}`, {
            name: technology.name
        });
        return technologyMapper.toDomain(response.data);
    },
    deleteTechnology: async (id: string): Promise<void> => {
        await axiosClient.delete(`/technologies/${id}`);
    }
};
