
import type { User } from "@/domain/user/user.entity";
import type { UserRepository } from "../../user/user.repository";
import type { AdminChangePasswordSchema, ChangePasswordSchema, CreateUserSchema, UpdateUserSchema } from "@/infrastructure/user/user.schema";
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
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (isActive !== undefined) params.append('is_active', String(isActive));
        if (role !== undefined) params.append('role', role);
        const response = await axiosClient.get(`/users?${params.toString()}`);
        return userMaper.toDomainList(response.data);
    },
    createUser: async (user: CreateUserSchema): Promise<User | null> => {
        const response = await axiosClient.post("/users", user);
        if (!response.data?.id) return null;
        return userMaper.toDomain(response.data);
    },
    updateUser: async (user: UpdateUserSchema): Promise<User | null> => {
        const response = await axiosClient.put(`/users/${user.id}`, {
            name: user.name,
            surname: user.surname,
            email: user.email,
            is_active: user.is_active,
            role: user.role,
        });
        if (!response.data?.id) {
            const refetched = await axiosClient.get(`/users/${user.id}`);
            if (!refetched.data) return null;
            return userMaper.toDomain(refetched.data);
        }
        return userMaper.toDomain(response.data);
    },
    deleteUser: async (id: string): Promise<null> => {
        const response = await axiosClient.delete(`/users/${id}`);
        return response.data;
    },
    getUsersByProjectId: async (projectId: string): Promise<User[]> => {
        const response = await axiosClient.get(`/projects/${projectId}/users`);
        return response.data.map((raw: any) => ({
            id: raw.app_user_id,
            name: raw.name,
            surname: raw.surname,
            email: "", // El endpoint no devuelve email
            role: raw.role.name,
            isActive: raw.is_user_active
        }));
    },
    changePassword: async (payload: ChangePasswordSchema): Promise<void> => {
        await axiosClient.patch(`/users/${payload.id}/password-change`, {
            current_password: payload.current_password,
            new_password: payload.new_password,
        });
    },
    adminChangePassword: async (payload: AdminChangePasswordSchema): Promise<void> => {
        await axiosClient.patch(`/users/${payload.id}/admin-password`, {
            new_password: payload.new_password,
        });
    },
}