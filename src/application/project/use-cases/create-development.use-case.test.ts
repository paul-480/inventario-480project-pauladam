import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateDevelopmentUseCase } from "./create-development.use-case"
import { mockDevelopmentRepo, mockDevelopment } from "../__mocks__/project.repository.mock"
import type { CreateDevelopmentSchema } from "@/infrastructure/development/development.schema"

const input: CreateDevelopmentSchema = {
    technology_id: '00000000-0000-0000-0000-000000000001',
    name: 'Frontend',
    description: 'React frontend app',
    url_repository: 'https://github.com/org/repo',
}

describe('CreateDevelopmentUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call createProjectDevelopment with projectId and input', async () => {
        vi.mocked(mockDevelopmentRepo.createProjectDevelopment).mockResolvedValueOnce(mockDevelopment)
        await CreateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', input)
        expect(mockDevelopmentRepo.createProjectDevelopment).toHaveBeenCalledWith('project-uuid-1', input)
    })

    it('should return the created development', async () => {
        vi.mocked(mockDevelopmentRepo.createProjectDevelopment).mockResolvedValueOnce(mockDevelopment)
        const result = await CreateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', input)
        expect(result).toEqual(mockDevelopment)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockDevelopmentRepo.createProjectDevelopment).mockResolvedValueOnce(null)
        const result = await CreateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockDevelopmentRepo.createProjectDevelopment).mockRejectedValueOnce(new Error('DB error'))
        await expect(CreateDevelopmentUseCase(mockDevelopmentRepo, 'project-uuid-1', input)).rejects.toThrow('DB error')
    })
})
