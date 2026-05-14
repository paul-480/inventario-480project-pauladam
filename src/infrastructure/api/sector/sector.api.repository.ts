import type { Sector } from "@/domain/sector/sector.entity";
import type { SectorRepository } from "@/infrastructure/sector/sector.repository";
import type { CreateSectorSchema, UpdateSectorSchema } from "@/infrastructure/sector/sector.schema";
import { sectorMapper } from "@/infrastructure/sector/sector.mapper";
import { axiosClient } from "../axios.client";

export const SectorApiRepository: SectorRepository = {
    getSectorById: async (id: string): Promise<Sector | null> => {
        const response = await axiosClient.get(`/sectors/${id}`);
        if (!response.data) return null;
        return sectorMapper.toDomain(response.data);
    },
    getSectors: async (): Promise<Sector[]> => {
        const response = await axiosClient.get("/sectors");
        return sectorMapper.toDomainList(response.data);
    },
    createSector: async (sector: CreateSectorSchema): Promise<Sector | null> => {
        const response = await axiosClient.post("/sectors", sector);
        if (!response.data?.id) return null;
        return sectorMapper.toDomain(response.data);
    },
    updateSector: async (sector: UpdateSectorSchema): Promise<Sector | null> => {
        const response = await axiosClient.put(`/sectors/${sector.id}`, {
            name: sector.name
        });
        return sectorMapper.toDomain(response.data);
    },
    deleteSector: async (id: string): Promise<void> => {
        await axiosClient.delete(`/sectors/${id}`);
    }
};
