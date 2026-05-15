import { describe, it, expect, vi, beforeEach } from "vitest"
import { GetTechnologyByIdUseCase } from "./get-technology-by-id.use-case"
import { mockTechnologyRepo, mockTechnology } from "../__mocks__/technology.repository.mock"

describe('GetTechnologyByIdUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call getTechnologyById with the given id', async () => {
        vi.mocked(mockTechnologyRepo.getTechnologyById).mockResolvedValueOnce(mockTechnology)
        await GetTechnologyByIdUseCase(mockTechnologyRepo, 'tech-uuid-1')
        expect(mockTechnologyRepo.getTechnologyById).toHaveBeenCalledWith('tech-uuid-1')
    })

    it('should return the technology when found', async () => {
        vi.mocked(mockTechnologyRepo.getTechnologyById).mockResolvedValueOnce(mockTechnology)
        const result = await GetTechnologyByIdUseCase(mockTechnologyRepo, 'tech-uuid-1')
        expect(result).toEqual(mockTechnology)
    })

    it('should return null when technology is not found', async () => {
        vi.mocked(mockTechnologyRepo.getTechnologyById).mockResolvedValueOnce(null)
        const result = await GetTechnologyByIdUseCase(mockTechnologyRepo, 'nonexistent-id')
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTechnologyRepo.getTechnologyById).mockRejectedValueOnce(new Error('DB error'))
        await expect(GetTechnologyByIdUseCase(mockTechnologyRepo, 'tech-uuid-1')).rejects.toThrow('DB error')
    })
})
