import { AuthApiRepository } from "@/infrastructure/api/auth/auth.api.repository";
import { authMapper } from "@/infrastructure/auth/auth.mapper";
import { create } from "zustand";
import type { AuthStore } from "./auth-store.types";
import { Auth } from "@/domain/auth/auth.entity";
import { tokenService } from "@/infrastructure/api/auth/token.service";



export const useAuthStore = create<AuthStore>((set, get) => ({
    auth: new Auth(),
    send: (event, payload) => {
        const currentState = get().auth;
        const newAuth = currentState.transition(event, payload);
        set({ auth: newAuth });
    },
    login: async (email, password) => {
        get().send("REQUEST_AUTH");
        try {
            const token = await AuthApiRepository.login({ email, password });
            if (token) {
                const decodedToken = authMapper.decodeToken(token);
                const isAdmin = decodedToken.role === "ADMIN";
                get().send(isAdmin ? "ADMIN_LOGIN" : "LOGIN", { id: decodedToken.id });
                tokenService.save(token);
            } else {
                get().send("AUTH_ERROR");
            }
        } catch (err) {
            get().send("AUTH_ERROR");
            throw err;
        }
    },
    logout: () => {
        tokenService.remove();
        get().send("LOGOUT");
    },
    checkAuth:  () => {
        get().send("REQUEST_AUTH");
        const token = tokenService.get();
        if (token) {
            try {
                const decoded = authMapper.decodeToken(token);
                const auth = new Auth();
                auth.setAuth(decoded);
                set({ auth });
            } catch (e) {
                tokenService.remove();
                get().send("TOKEN_EXPIRED");
            }
        }else {
            get().send("LOGOUT");
        }
    }
}));
