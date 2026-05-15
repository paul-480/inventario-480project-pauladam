import { describe, it, expect, vi, beforeEach } from "vitest"
import { GetSectorByIdUseCase } from "./get-sector-by-id.use-case"
import { mockSectorRepo, mockSector } from "../__mocks__/sector.repository.mock"

describe('GetSectorByIdUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call getSectorById with the given id', async () => {
        vi.mocked(mockSectorRepo.getSectorById).mockResolvedValueOnce(mockSector)
        await GetSectorByIdUseCase(mockSectorRepo, 'sector-uuid-1')
        expect(mockSectorRepo.getSectorById).toHaveBeenCalledWith('sector-uuid-1')
    })

    it('should return the sector when found', async () => {
        vi.mocked(mockSectorRepo.getSectorById).mockResolvedValueOnce(mockSector)
        const result = await GetSectorByIdUseCase(mockSectorRepo, 'sector-uuid-1')
        expect(result).toEqual(mockSector)
    })

    it('should return null when sector is not found', async () => {
        vi.mocked(mockSectorRepo.getSectorById).mockResolvedValueOnce(null)
        const result = await GetSectorByIdUseCase(mockSectorRepo, 'nonexistent-id')
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockSectorRepo.getSectorById).mockRejectedValueOnce(new Error('DB error'))
        await expect(GetSectorByIdUseCase(mockSectorRepo, 'sector-uuid-1')).rejects.toThrow('DB error')
    })
})
