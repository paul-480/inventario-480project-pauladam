import { describe, it, expect, vi, beforeEach } from "vitest"
import { GetProjectByIdUseCase } from "./get-project-by-id.use-case"
import { mockProjectRepo, mockProject } from "../__mocks__/project.repository.mock"

describe('GetProjectByIdUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call getProjectById with the given id', async () => {
        vi.mocked(mockProjectRepo.getProjectById).mockResolvedValueOnce(mockProject)
        await GetProjectByIdUseCase(mockProjectRepo, 'project-uuid-1')
        expect(mockProjectRepo.getProjectById).toHaveBeenCalledWith('project-uuid-1')
    })

    it('should return the project when found', async () => {
        vi.mocked(mockProjectRepo.getProjectById).mockResolvedValueOnce(mockProject)
        const result = await GetProjectByIdUseCase(mockProjectRepo, 'project-uuid-1')
        expect(result).toEqual(mockProject)
    })

    it('should return null when project is not found', async () => {
        vi.mocked(mockProjectRepo.getProjectById).mockResolvedValueOnce(null)
        const result = await GetProjectByIdUseCase(mockProjectRepo, 'nonexistent-id')
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockProjectRepo.getProjectById).mockRejectedValueOnce(new Error('DB error'))
        await expect(GetProjectByIdUseCase(mockProjectRepo, 'project-uuid-1')).rejects.toThrow('DB error')
    })
})
