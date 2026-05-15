import { describe, it, expect, vi, beforeEach } from "vitest"
import { getAllUsersUseCase } from "./get-all-users.use-case"
import { mockUserRepo, mockUser } from "../__mocks__/user.repository.mock"
import { UserNotFoundError } from "@/domain/user/errors/user-not-found.error"

describe('getAllUsersUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return users from the repository', async () => {
        vi.mocked(mockUserRepo.getUsers).mockResolvedValueOnce([mockUser])
        const result = await getAllUsersUseCase(mockUserRepo)
        expect(mockUserRepo.getUsers).toHaveBeenCalledWith(1, 100)
        expect(result).toEqual([mockUser])
    })

    it('should throw UserNotFoundError when repository returns empty array (falsy)', async () => {
        vi.mocked(mockUserRepo.getUsers).mockResolvedValueOnce(null as any)
        await expect(getAllUsersUseCase(mockUserRepo)).rejects.toThrow(UserNotFoundError)
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockUserRepo.getUsers).mockRejectedValueOnce(new Error('DB error'))
        await expect(getAllUsersUseCase(mockUserRepo)).rejects.toThrow('DB error')
    })
})
