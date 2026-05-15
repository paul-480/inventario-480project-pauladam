import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateProjectUseCase } from "./update-project.use-case"
import { mockProjectRepo, mockProject } from "../__mocks__/project.repository.mock"
import type { UpdateProjectSchema } from "@/infrastructure/project/project.schema"

const input: UpdateProjectSchema = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Updated Project',
    description: 'Updated description',
    start_date: '2024-06-01',
    is_active: true,
    client_id: '00000000-0000-0000-0000-000000000002',
}

describe('UpdateProjectUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateProject with the given input', async () => {
        vi.mocked(mockProjectRepo.updateProject).mockResolvedValueOnce(mockProject)
        await UpdateProjectUseCase(mockProjectRepo, input)
        expect(mockProjectRepo.updateProject).toHaveBeenCalledWith(input)
    })

    it('should return the updated project', async () => {
        vi.mocked(mockProjectRepo.updateProject).mockResolvedValueOnce(mockProject)
        const result = await UpdateProjectUseCase(mockProjectRepo, input)
        expect(result).toEqual(mockProject)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockProjectRepo.updateProject).mockResolvedValueOnce(null)
        const result = await UpdateProjectUseCase(mockProjectRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockProjectRepo.updateProject).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateProjectUseCase(mockProjectRepo, input)).rejects.toThrow('DB error')
    })
})
