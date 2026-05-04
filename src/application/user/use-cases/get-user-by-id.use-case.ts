import type { UserRepository } from "@/infrastructure/user/user.repository";
import { userMaper } from "@/infrastructure/user/user.maper";
import type { UserResponseDto } from "@/application/user/user.dto";
import { UserNotFoundError } from "@/domain/user/errors/user-not-found.error";

export const GetUserByIdUseCase = async (userRepository: UserRepository, id: string) => {
    const userResponseDto = await userRepository.getUserById(id);
    if (!userResponseDto) throw new UserNotFoundError(id);
    return userMaper.toDomain(userResponseDto as UserResponseDto);
}