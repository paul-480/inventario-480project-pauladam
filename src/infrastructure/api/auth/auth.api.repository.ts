import type AuthRepository from "@/infrastructure/auth/auth.repository";
import { axiosClient } from "../axios.client";
import { tokenService } from "./token.service";


export const AuthApiRepository: AuthRepository = {
    login: async ({ email, password }) => {
        try {
            const response = await axiosClient.post('/login', { email, password });
            const { token } = response.data;
            tokenService.save(token);
            return token;
        } catch (error) {
            console.error('Login failed:', error);
            return Promise.reject(error);
        }
    },
    logout: async () => {
        tokenService.remove();
        }
};