
import type { User } from "@/domain/user/user.entity";
import type { UserRepository } from "../../user/user.repository";
import type { CreateUserSchema } from "@/infrastructure/user/user.schema";
import { userMaper } from "@/infrastructure/user/user.maper";
import type { UserRoleValue } from "@/domain/shared/user-role.vo";
import { axiosClient } from "../axios.client";

export const UserApiRepository: UserRepository = {

    getUserById: async (id: string): Promise<User | null> => {
        const response = await axiosClient.get(`/users/${id}`);
        if (!response.data) return null;
        return userMaper.toDomain(response.data);
    },
    getUsers: async (page: number, limit: number, isActive?: boolean, role?: UserRoleValue): Promise<User[]> => {
        const response = await axiosClient.get(`/users?page=${page}&limit=${limit} ${isActive !== undefined ? `&isActive=${isActive}` : ''} ${role !== undefined ? `&role=${role}` : ''}`);
        return userMaper.toDomainList(response.data);
    },
    createUser: async (user: CreateUserSchema): Promise<User | null> => {
        const response = await axiosClient.post("/users ", user);
        return userMaper.toDomain(response.data);
    },
    updateUser: async (user: CreateUserSchema): Promise<User | null> => {
        const response = await axiosClient.put(`/users/${user.id}`, user);
        return userMaper.toDomain(response.data);
    },
    deleteUser: async (id: string): Promise<null> => {
        const response = await axiosClient.delete(`/users/${id}`);
        return response.data;
    }
}