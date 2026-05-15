import { describe, it, expect, vi, beforeEach } from "vitest"
import { GetMyUserUseCase } from "./get-my-user.use-case"
import { mockUserRepo, mockUser } from "../__mocks__/user.repository.mock"
import { UserNotFoundError } from "@/domain/user/errors/user-not-found.error"

vi.mock("@/infrastructure/api/auth/token.service", () => ({
    tokenService: { get: vi.fn() }
}))
vi.mock("@/infrastructure/auth/auth.mapper", () => ({
    authMapper: { decodeToken: vi.fn() }
}))

import { tokenService } from "@/infrastructure/api/auth/token.service"
import { authMapper } from "@/infrastructure/auth/auth.mapper"

const FAKE_TOKEN = "fake.jwt.token"
const DECODED = { id: 'user-uuid-1', role: 'ROLE_EMPLOYEE', username: 'juan@test.com', name: 'Juan', roles: [], exp: 9999999999, iat: 0 }

describe('GetMyUserUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should throw UserNotFoundError when no token exists', async () => {
        vi.mocked(tokenService.get).mockReturnValueOnce(null)
        await expect(GetMyUserUseCase(mockUserRepo)).rejects.toThrow(UserNotFoundError)
    })

    it('should decode token and fetch user by id', async () => {
        vi.mocked(tokenService.get).mockReturnValueOnce(FAKE_TOKEN)
        vi.mocked(authMapper.decodeToken).mockReturnValueOnce(DECODED as any)
        vi.mocked(mockUserRepo.getUserById).mockResolvedValueOnce(mockUser)
        const result = await GetMyUserUseCase(mockUserRepo)
        expect(authMapper.decodeToken).toHaveBeenCalledWith(FAKE_TOKEN)
        expect(mockUserRepo.getUserById).toHaveBeenCalledWith('user-uuid-1')
        expect(result).toEqual(mockUser)
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(tokenService.get).mockReturnValueOnce(FAKE_TOKEN)
        vi.mocked(authMapper.decodeToken).mockReturnValueOnce(DECODED as any)
        vi.mocked(mockUserRepo.getUserById).mockRejectedValueOnce(new Error('DB error'))
        await expect(GetMyUserUseCase(mockUserRepo)).rejects.toThrow('DB error')
    })
})
