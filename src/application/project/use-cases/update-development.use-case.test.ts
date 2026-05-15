import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateDevelopmentUseCase } from "./update-development.use-case"
import { mockDevelopmentRepo, mockDevelopment } from "../__mocks__/project.repository.mock"
import type { UpdateDevelopmentSchema } from "@/infrastructure/development/development.schema"

const input: UpdateDevelopmentSchema = {
    name: 'Frontend Updated',
    description: 'Updated React frontend',
    technology_id: '00000000-0000-0000-0000-000000000001',
    url_repository: 'https://github.com/org/repo-updated',
}

describe('UpdateDevelopmentUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateProjectDevelopment with all args', async () => {
        vi.mocked(mockDevelopmentRepo.updateProjectDevelopment).mockResolvedValueOnce(mockDevelopment)
        await UpdateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', 'dev-uuid-1', input)
        expect(mockDevelopmentRepo.updateProjectDevelopment).toHaveBeenCalledWith('project-uuid-1', 'dev-uuid-1', input)
    })

    it('should return the updated development', async () => {
        vi.mocked(mockDevelopmentRepo.updateProjectDevelopment).mockResolvedValueOnce(mockDevelopment)
        const result = await UpdateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', 'dev-uuid-1', input)
        expect(result).toEqual(mockDevelopment)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockDevelopmentRepo.updateProjectDevelopment).mockResolvedValueOnce(null)
        const result = await UpdateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', 'dev-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockDevelopmentRepo.updateProjectDevelopment).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', 'dev-uuid-1', input)).rejects.toThrow('DB error')
    })
})
