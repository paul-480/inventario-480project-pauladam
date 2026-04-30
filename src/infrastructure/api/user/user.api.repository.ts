import type { Role } from "@/domain/shared/common.types";
import type { User } from "@/domain/user/user.entity";
import { axiosClient } from "../axios.client";
import type { UserRepository } from "../../user/user.repository";

export const UserApiRepository: UserRepository = {
    getUserById: async (id: string): Promise<User | null> => {
        const response = await axiosClient.get(`/users/${id}`);
        return response.data;
    },
    getUsers: async (page: number,   limit: number, isActive?: boolean, role?: Role): Promise<User[]> => {
        const response = await axiosClient.get(`/users?page=${page}&limit=${limit}&isActive=${isActive}&role=${role}`);
        return response.data;
    },
    createUser: async (user: User): Promise<User | null> => {
        const response = await axiosClient.post(`/users`, user);
        return response.data;
    },
    updateUser: function (user: User): Promise<User | null> {
        throw new Error("Function not implemented.");
    },
    deleteUser: function (id: string): Promise<null> {
        throw new Error("Function not implemented.");
    }
}