import { jwtDecode } from 'jwt-decode';
import type { DecodedToken } from './token.types';
import type { Auth } from '@/domain/auth/auth.entity';

export const authMapper = {
    decodeToken: (token: string): DecodedToken => {
        return jwtDecode<DecodedToken>(token);
    },

    mapToAuthEntity: (decodedToken: DecodedToken): Auth => {
        return {
            id: decodedToken.uuid,
            role: decodedToken.role 
        };
    }
};
