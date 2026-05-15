import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeleteDevelopmentUseCase } from "./delete-development.use-case"
import { mockDevelopmentRepo } from "../__mocks__/project.repository.mock"

describe('DeleteDevelopmentUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call deleteProjectDevelopment with projectId and developmentId', async () => {
        vi.mocked(mockDevelopmentRepo.deleteProjectDevelopment).mockResolvedValueOnce(undefined)
        await DeleteDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', 'dev-uuid-1')
        expect(mockDevelopmentRepo.deleteProjectDevelopment).toHaveBeenCalledWith('project-uuid-1', 'dev-uuid-1')
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockDevelopmentRepo.deleteProjectDevelopment).mockRejectedValueOnce(new Error('DB error'))
        await expect(DeleteDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', 'dev-uuid-1')).rejects.toThrow('DB error')
    })
})
