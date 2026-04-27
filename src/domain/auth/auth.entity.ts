import type { DecodedToken } from "@/infrastructure/auth/token.types";
import { AuthMachine, type AuthEvent, type AuthState } from "./authMachine";

export class Auth {
    private id: string | null = null;
    private state: AuthState = "UNAUTHENTICATED";
    

    isAuthenticated(): boolean {
        return this.state === "AUTHENTICATED" || this.state === "AUTHENTICATED_ADMIN";
    }

    setAuth(decodedToken: DecodedToken):void {
        this.id = decodedToken.id;
        this.state = decodedToken.role === 'ADMIN' ? "AUTHENTICATED_ADMIN" : "AUTHENTICATED";
    }

    isAdmin(): boolean {
        return this.state === "AUTHENTICATED_ADMIN";
    }

    getId(): string | null  {
        return this.id;
    }
    isLoading(): boolean {
        return this.state === "LOADING";
    }
    isError(): boolean {
        return this.state === "ERROR";
    }

    isExpired(): boolean {
        return this.state === "EXPIRED";
    }

    transition(event: AuthEvent, payload?: { id: string}): Auth {
        const nextState = AuthMachine[this.state][event];
        
        if (!nextState) {
            console.warn(`Transición inválida: ${this.state} -> ${event}`);
            return this; 
        }

        // Si el evento es un login exitoso, actualizamos los datos
        const newId = (event === 'LOGIN' || event === 'ADMIN_LOGIN') ? payload?.id : this.id;
        
        const newAuth = new Auth();
        newAuth.state = nextState;
        newAuth.id = newId || null;
        // Retornamos una NUEVA instancia para que React/Zustand detecten el cambio
        return newAuth;
    }

}