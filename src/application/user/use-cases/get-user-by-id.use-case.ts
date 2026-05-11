import type { UserRepository } from "@/infrastructure/user/user.repository";
import { UserNotFoundError } from "@/domain/user/errors/user-not-found.error";

export const GetUserByIdUseCase = async (userRepository: UserRepository, id: string) => {
    const user = await userRepository.getUserById(id);
    if (!user) throw new UserNotFoundError(id);
    return user;
}