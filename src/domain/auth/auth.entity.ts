import type { DecodedToken } from "@/infrastructure/auth/token.types";
import { AuthMachine, type AuthEvent, type AuthState } from "./auth.machine";

export type UserRole = 'ROLE_ADMIN' | 'ROLE_EMPLOYEE';
export class Auth {
    private id: string | null = null;
    private role: UserRole | null = null;
    private state: AuthState = "UNAUTHENTICATED";
    

    isAuthenticated(): boolean {
        return this.state === "AUTHENTICATED";
    }

    setAuth(decodedToken: DecodedToken):void {
        this.id = decodedToken.id;
        this.role = decodedToken.role;
        this.state =  "AUTHENTICATED";
    }

    isAdmin(): boolean {
        return this.role === "ROLE_ADMIN";
    }

    getId(): string | null  {
        return this.state === "AUTHENTICATED" ? this.id : null;
    }
    isLoading(): boolean {
        return this.state === "LOADING";
    }
    isError(): boolean {
        return this.state === "ERROR";
    }


    transition(event: AuthEvent, payload?: { id: string, role: UserRole }): Auth {
        const nextState = AuthMachine[this.state][event];
        
        if (!nextState) {
            console.warn(`Transición inválida: ${this.state} -> ${event}`);
            return this; 
        }

        // Si el evento es un login exitoso, actualizamos los datos
        const newId = event === 'LOGIN' ? payload?.id : this.id;
        const newRole = event === 'LOGIN' ? payload?.role : this.role;

        const newAuth = new Auth();
        newAuth.state = nextState;
        newAuth.id = newId || null;
        newAuth.role = newRole || null;
        // Retornamos una NUEVA instancia para que React/Zustand detecten el cambio
        return newAuth;
    }

}