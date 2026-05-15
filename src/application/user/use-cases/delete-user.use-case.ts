import type { UserRepository } from "@/infrastructure/user/user.repository";

export const DeleteUserUseCase = async (
    userRepository: UserRepository,
    id: string
): Promise<void> => {
    await userRepository.deleteUser(id);
};
