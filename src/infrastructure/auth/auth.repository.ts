

export default interface AuthRepository {
 
    login({ email, password }: { email: string; password: string }): Promise<string|null>;
    logout(): Promise<void>;
}