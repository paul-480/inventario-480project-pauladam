import type { Auth } from "@/domain/auth/auth.entity";

export default interface AuthRepository {
    login({ email, password }: { email: string; password: string }): Promise<Auth|null>;

}