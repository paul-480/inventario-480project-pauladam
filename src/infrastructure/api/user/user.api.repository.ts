import type { Role } from "@/domain/shared/common.types";
import type { User } from "@/domain/user/user.entity";
import { axiosClient } from "../axios.client";
import type { UserRepository } from "../../user/user.repository";
import type { CreateUserSchema, UpdateUserSchema } from "@/infrastructure/user/user.schema";
import { axiosUserClient } from "./axios.user.client";

export const UserApiRepository: UserRepository = {

    getUserById: async (id: string): Promise<User | null> => {
        const response = await axiosUserClient.get(`/${id}`);
        return response.data;
    },
    getUsers: async (page: number, limit: number, isActive?: boolean, role?: Role): Promise<User[]> => {
        const response = await axiosUserClient.get(`?page=${page}&limit=${limit}&isActive=${isActive}&role=${role}`);
        return response.data;
    },
    createUser: async (user: CreateUserSchema): Promise<User | null> => {
        const response = await axiosUserClient.post("", user);
        return response.data;
    },
    updateUser: async (user: UpdateUserSchema): Promise<User | null> => {
        const response = await axiosUserClient.put("", user);
        return response.data;
    },
    deleteUser: async (id: string): Promise<null> => {
        const response = await axiosUserClient.delete(`/${id}`);
        return response.data;
    }
}