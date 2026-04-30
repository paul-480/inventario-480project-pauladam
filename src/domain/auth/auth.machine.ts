export type AuthState = "AUTHENTICATED" | "UNAUTHENTICATED" | "LOADING" | "ERROR";

export type AuthEvent = "REQUEST_AUTH" | "LOGIN" | "LOGOUT" | "AUTH_ERROR";
type MachineConfig = Record<AuthState, Partial<Record<AuthEvent, AuthState>>>;

export const AuthMachine: MachineConfig = {
    "UNAUTHENTICATED": {
        "REQUEST_AUTH": "LOADING",
        "LOGIN": "AUTHENTICATED",
    },
    "LOADING": {
        "LOGIN": "AUTHENTICATED",
        "LOGOUT": "UNAUTHENTICATED",
        "AUTH_ERROR": "ERROR"
    },
    "AUTHENTICATED": {
        "LOGOUT": "UNAUTHENTICATED",
    },
    "ERROR": {
        "REQUEST_AUTH": "LOADING",
    }
}
    