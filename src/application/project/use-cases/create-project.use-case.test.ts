import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateProjectUseCase } from "./create-project.use-case"
import { mockProjectRepo, mockProject } from "../__mocks__/project.repository.mock"
import type { CreateProjectSchema } from "@/infrastructure/project/project.schema"

const input: CreateProjectSchema = {
    name: 'Test Project',
    description: 'A test project',
    start_date: '2024-01-01',
    client_id: '00000000-0000-0000-0000-000000000002',
}

describe('CreateProjectUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call createProject with the given input', async () => {
        vi.mocked(mockProjectRepo.createProject).mockResolvedValueOnce(mockProject)
        await CreateProjectUseCase(mockProjectRepo, input)
        expect(mockProjectRepo.createProject).toHaveBeenCalledWith(input)
    })

    it('should return the created project', async () => {
        vi.mocked(mockProjectRepo.createProject).mockResolvedValueOnce(mockProject)
        const result = await CreateProjectUseCase(mockProjectRepo, input)
        expect(result).toEqual(mockProject)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockProjectRepo.createProject).mockResolvedValueOnce(null)
        const result = await CreateProjectUseCase(mockProjectRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockProjectRepo.createProject).mockRejectedValueOnce(new Error('DB error'))
        await expect(CreateProjectUseCase(mockProjectRepo, input)).rejects.toThrow('DB error')
    })
})
