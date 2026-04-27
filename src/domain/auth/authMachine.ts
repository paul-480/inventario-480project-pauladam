import { Auth } from "./auth.entity";

export type AuthState =
    | "AUTHENTICATED"
    | "UNAUTHENTICATED"
    | "LOADING"
    | "EXPIRED"
    | "ERROR"
    | "AUTHENTICATED_ADMIN";

export type AuthEvent =
    |  "INIT"
    |  "REQUEST_AUTH"
    |  "LOGIN"
    |  "ADMIN_LOGIN"
    |  "LOGOUT" 
    |  "TOKEN_EXPIRED" 
    |  "AUTH_ERROR" 


export const AuthMachine:any = {
    "UNAUTHENTICATED": {
        "REQUEST_AUTH": "LOADING",
        "LOGIN": "AUTHENTICATED",
        "ADMIN_LOGIN": "AUTHENTICATED_ADMIN"
    },"LOADING": {
        "LOGIN": "AUTHENTICATED",
        "ADMIN_LOGIN": "AUTHENTICATED_ADMIN",
        "LOGOUT": "UNAUTHENTICATED",
        "AUTH_ERROR": "ERROR"
    },"AUTHENTICATED": {
        "LOGOUT": "UNAUTHENTICATED",
        "TOKEN_EXPIRED": "EXPIRED",
        "REQUEST_AUTH": "LOADING"
    },"AUTHENTICATED_ADMIN": {
        "LOGOUT": "UNAUTHENTICATED",
        "TOKEN_EXPIRED": "EXPIRED"
    },"EXPIRED": {
        "REQUEST_AUTH": "LOADING"
    },"ERROR": {
        "REQUEST_AUTH": "LOADING",
        "LOGOUT": "UNAUTHENTICATED"
    }
}
    