import type { Development } from "@/domain/development/development.entity";
import type { DevelopmentRepository } from "@/infrastructure/development/development.repository";
import type { CreateDevelopmentSchema, UpdateDevelopmentSchema } from "@/infrastructure/development/development.schema";
import { developmentMapper } from "@/infrastructure/development/development.mapper";
import { axiosClient } from "../axios.client";

export const DevelopmentApiRepository: DevelopmentRepository = {
    getProjectDevelopments: async (projectId: string): Promise<Development[]> => {
        const response = await axiosClient.get(`/projects/${projectId}/developments`);
        return developmentMapper.toDomainList(response.data);
    },
    createProjectDevelopment: async (projectId: string, development: CreateDevelopmentSchema): Promise<Development | null> => {
        const response = await axiosClient.post(`/projects/${projectId}/developments`, development);
        if (!response.data?.id || !response.data?.technology) return null;
        return developmentMapper.toDomain(response.data);
    },
    updateProjectDevelopment: async (projectId: string, developmentId: string, development: UpdateDevelopmentSchema): Promise<Development | null> => {
        const response = await axiosClient.put(`/projects/${projectId}/developments/${developmentId}`, development);
        return developmentMapper.toDomain(response.data);
    },
    deleteProjectDevelopment: async (projectId: string, developmentId: string): Promise<void> => {
        await axiosClient.delete(`/projects/${projectId}/developments/${developmentId}`);
    }
};
