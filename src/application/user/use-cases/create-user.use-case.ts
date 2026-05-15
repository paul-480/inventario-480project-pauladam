import type { UserRepository } from "@/infrastructure/user/user.repository";
import type { CreateUserSchema } from "@/infrastructure/user/user.schema";
import type { User } from "@/domain/user/user.entity";

export const CreateUserUseCase = async (
    userRepository: UserRepository,
    user: CreateUserSchema
): Promise<User | null> => {
    return await userRepository.createUser(user);
};
