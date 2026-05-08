import { AuthApiRepository } from "@/infrastructure/api/auth/auth.api.repository";
import { authMapper } from "@/infrastructure/auth/auth.mapper";
import { create } from "zustand";
import type { AuthStore } from "./auth.types";
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
        console.log("Iniciando login con:", email);
        get().send("REQUEST_AUTH");
        try {
            const token = await AuthApiRepository.login({ email, password });
            console.log("Token recibido:", token);
            if (token) {
                const decodedToken = authMapper.decodeToken(token);
                console.log("Token decodificado:", decodedToken);
                get().send( "LOGIN", { id: decodedToken.id , role: decodedToken.role });
                tokenService.save(token);
            } else {
                console.log("No se recibió token");
                get().send("AUTH_ERROR");
            }
        } catch (err) {
            console.error("Error en login:", err);
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
                console.error("Error decoding token:", e);
                tokenService.remove();
                get().send("LOGOUT");
            }
        }else {
            get().send("LOGOUT");
        }
    }
}));
