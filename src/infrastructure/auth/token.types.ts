// Esta interfaz refleja lo que viene en el JWT
export interface DecodedToken {
  id: string;
  email: string;
  role: role;
  exp: number;
  iat: number;
}
type role = 'ADMIN' | 'EMPLOYEE';