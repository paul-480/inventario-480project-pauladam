import type AuthRepository from "@/infrastructure/auth/auth.repository";
import { axiosClient } from "../axios.client";


export const AuthApiRepository: AuthRepository = {
    login: async ({ email, password }) => {
        try {axiosClient.post('/login', { email, password });
            const response = await axiosClient.post('/login', { email, password });
            const { token } = response.data;
            return token;
        } catch (error) {
            console.error('Login failed:', error);
            return Promise.reject(error);
        }
    },
    logout: async () => {
        localStorage.removeItem('token');
    }
};