import type { UserRepository } from "@/infrastructure/user/user.repository";
import type { AdminChangePasswordSchema, ChangePasswordSchema } from "@/infrastructure/user/user.schema";

export const ChangePasswordUseCase = async (
    userRepository: UserRepository,
    payload: ChangePasswordSchema
): Promise<void> => {
    await userRepository.changePassword(payload);
};

export const AdminChangePasswordUseCase = async (
    userRepository: UserRepository,
    payload: AdminChangePasswordSchema
): Promise<void> => {
    await userRepository.adminChangePassword(payload);
};
