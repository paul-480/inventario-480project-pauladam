import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeactivateProjectUserUseCase } from "./deactivate-project-user.use-case"
import { mockProjectUserRepo } from "../__mocks__/project.repository.mock"

describe('DeactivateProjectUserUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call deactivateProjectUser with all args (deactivate)', async () => {
        vi.mocked(mockProjectUserRepo.deactivateProjectUser).mockResolvedValueOnce(undefined)
        await DeactivateProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', 'user-uuid-1', false)
        expect(mockProjectUserRepo.deactivateProjectUser).toHaveBeenCalledWith('project-uuid-1', 'user-uuid-1', false)
    })

    it('should call deactivateProjectUser with isActive=true (reactivate)', async () => {
        vi.mocked(mockProjectUserRepo.deactivateProjectUser).mockResolvedValueOnce(undefined)
        await DeactivateProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', 'user-uuid-1', true)
        expect(mockProjectUserRepo.deactivateProjectUser).toHaveBeenCalledWith('project-uuid-1', 'user-uuid-1', true)
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockProjectUserRepo.deactivateProjectUser).mockRejectedValueOnce(new Error('DB error'))
        await expect(DeactivateProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', 'user-uuid-1', false)).rejects.toThrow('DB error')
    })
})
