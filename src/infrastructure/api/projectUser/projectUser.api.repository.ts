import type { ProjectUser } from "@/domain/projectUser/projectUser.entity";
import type { ProjectUserRepository, AddProjectUserSchema } from "@/infrastructure/projectUser/projectUser.repository";
import { projectUserMapper } from "@/infrastructure/projectUser/projectUser.mapper";
import { axiosClient } from "../axios.client";

export const ProjectUserApiRepository: ProjectUserRepository = {
    getProjectUsers: async (projectId: string): Promise<ProjectUser[]> => {
        const response = await axiosClient.get(`/projects/${projectId}/users`);
        return projectUserMapper.toDomainList(response.data);
    },
    addProjectUser: async (projectId: string, user: AddProjectUserSchema): Promise<ProjectUser | null> => {
        const response = await axiosClient.post(`/projects/${projectId}/users`, user);
        if (!response.data?.app_user_id || !response.data?.role) return null;
        return projectUserMapper.toDomain(response.data);
    },
    updateProjectUsers: async (projectId: string, user: AddProjectUserSchema): Promise<ProjectUser | null> => {
        const response = await axiosClient.put(`/projects/${projectId}/users`, user);
        if (!response.data?.app_user_id) {
            const refetched = await axiosClient.get(`/projects/${projectId}/users`);
            const found = (refetched.data as any[])?.find((u: any) => u.app_user_id === user.app_user_id);
            return found ? projectUserMapper.toDomain(found) : null;
        }
        return projectUserMapper.toDomain(response.data);
    },
    deactivateProjectUser: async (projectId: string, appUserId: string, isActive: boolean): Promise<void> => {
        await axiosClient.patch(`/projects/${projectId}/users/${appUserId}`, { is_active: isActive });
    }
};
