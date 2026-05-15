import type { UserRepository } from "@/infrastructure/user/user.repository";
import type { User } from "@/domain/user/user.entity";
import type { UpdateUserSchema } from "@/infrastructure/user/user.schema";

export const UpdateUserUseCase = async (
    userRepository: UserRepository,
    payload: UpdateUserSchema
): Promise<User | null> => {
    return await userRepository.updateUser(payload);
};
