import type { Role } from "@/domain/shared/common.types";
import type { User } from "@/domain/user/user.entity";
import { axiosClient } from "../axios.client";
import type { UserRepository } from "../../user/user.repository";

export const UserApiRepository: UserRepository = {
    getUserById: async (id: string): Promise<User | null> => {
        const response = await axiosClient.get(`/users/${id}`);
        return response.data;
    },
    getUsers: function (page: number, limit: number, isActive?: boolean, role?: Role): Promise<User[]> {
        throw new Error("Function not implemented.");
    },
    createUser: function (user: User): Promise<User | null> {
        throw new Error("Function not implemented.");
    },
    updateUser: function (user: User): Promise<User | null> {
        throw new Error("Function not implemented.");
    },
    deleteUser: function (id: string): Promise<null> {
        throw new Error("Function not implemented.");
    }
}