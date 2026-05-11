import type { UserRepository } from "@/infrastructure/user/user.repository";
import { UserNotFoundError } from "@/domain/user/errors/user-not-found.error";
import type { User } from "@/domain/user/user.entity";


export const getAllUsersUseCase = async (userRepository: UserRepository): Promise<User[]> => {
    const Users = await userRepository.getUsers(1, 100);
    if (!Users) throw new UserNotFoundError("Users");
    return Users;
}