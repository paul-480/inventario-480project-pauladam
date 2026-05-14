import type { UserRepository } from "@/infrastructure/user/user.repository";
import type { User } from "@/domain/user/user.entity";

export const GetProjectUsersUseCase = async (
    userRepository: UserRepository,
    projectId: string
): Promise<User[]> => {
    return await userRepository.getUsersByProjectId(projectId);
};
