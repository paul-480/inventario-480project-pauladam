import { useCallback, useState } from "react";
import { UserApiRepository } from "@/infrastructure/api/user/user.api.repository";
import { AdminChangePasswordUseCase, ChangePasswordUseCase } from "@/application/user/use-cases/change-password.use-case";

const repository = UserApiRepository;

export function useChangePassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const changePassword = useCallback(async (id: string, currentPassword: string, newPassword: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await ChangePasswordUseCase(repository, { id, current_password: currentPassword, new_password: newPassword });
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error al cambiar la contraseña"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const adminChangePassword = useCallback(async (id: string, newPassword: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await AdminChangePasswordUseCase(repository, { id, new_password: newPassword });
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Error al cambiar la contraseña"));
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { changePassword, adminChangePassword, loading, error };
}
