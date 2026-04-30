import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "@/application/auth/auth.types";

export const authMapper = {
    decodeToken: (token: string): DecodedToken => {
        return jwtDecode<DecodedToken>(token);
    },


};
