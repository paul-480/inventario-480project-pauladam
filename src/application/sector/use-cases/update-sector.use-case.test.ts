import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateSectorUseCase } from "./update-sector.use-case"
import { mockSectorRepo, mockSector } from "../__mocks__/sector.repository.mock"
import type { UpdateSectorSchema } from "@/infrastructure/sector/sector.schema"

const input: UpdateSectorSchema = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'Technology Updated',
}

describe('UpdateSectorUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateSector with the given input', async () => {
        vi.mocked(mockSectorRepo.updateSector).mockResolvedValueOnce(mockSector)
        await UpdateSectorUseCase(mockSectorRepo, input)
        expect(mockSectorRepo.updateSector).toHaveBeenCalledWith(input)
    })

    it('should return the updated sector', async () => {
        vi.mocked(mockSectorRepo.updateSector).mockResolvedValueOnce(mockSector)
        const result = await UpdateSectorUseCase(mockSectorRepo, input)
        expect(result).toEqual(mockSector)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockSectorRepo.updateSector).mockResolvedValueOnce(null)
        const result = await UpdateSectorUseCase(mockSectorRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockSectorRepo.updateSector).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateSectorUseCase(mockSectorRepo, input)).rejects.toThrow('DB error')
    })
})
