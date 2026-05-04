import type { UserRepository } from "@/infrastructure/user/user.repository";
import { UserNotFoundError } from "@/domain/user/errors/user-not-found.error";
import type { User } from "@/domain/user/user.entity";
import { tokenService } from "@/infrastructure/api/auth/token.service";
import { authMapper } from "@/infrastructure/auth/auth.mapper";
import { GetUserByIdUseCase } from "./get-user-by-id.use-case";

export const GetMyUserUseCase = async (userRepository: UserRepository): Promise<User> => {
    const token = tokenService.get();
    if (!token) throw new UserNotFoundError("Me");
    const decodedToken = authMapper.decodeToken(token);
    const user = await GetUserByIdUseCase(userRepository, decodedToken.id);
    return user;
}