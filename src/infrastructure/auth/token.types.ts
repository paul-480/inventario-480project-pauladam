// Esta interfaz refleja lo que viene en el JWT
export interface DecodedToken {
  uuid: string;
  email: string;
  role: role; // Los valores que defines en tu dominio
  exp: number;
  iat: number;
}
type role = 'ADMIN' | 'EMPLOYEE';