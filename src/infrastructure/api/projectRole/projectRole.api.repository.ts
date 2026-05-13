import type { ProjectRole } from "@/domain/projectRole/projectRole.entity";
import type { ProjectRoleRepository } from "@/infrastructure/projectRole/projectRole.repository";
import { projectRoleMapper } from "@/infrastructure/projectRole/projectRole.mapper";
import { axiosClient } from "../axios.client";

export const ProjectRoleApiRepository: ProjectRoleRepository = {
    getProjectRoles: async (): Promise<ProjectRole[]> => {
        const response = await axiosClient.get("/project-roles");
        return projectRoleMapper.toDomainList(response.data);
    }
};
