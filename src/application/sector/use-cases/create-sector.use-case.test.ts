import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateSectorUseCase } from "./create-sector.use-case"
import { mockSectorRepo, mockSector } from "../__mocks__/sector.repository.mock"
import type { CreateSectorSchema } from "@/infrastructure/sector/sector.schema"

const input: CreateSectorSchema = {
    name: 'Technology',
}

describe('CreateSectorUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call createSector with the given input', async () => {
        vi.mocked(mockSectorRepo.createSector).mockResolvedValueOnce(mockSector)
        await CreateSectorUseCase(mockSectorRepo, input)
        expect(mockSectorRepo.createSector).toHaveBeenCalledWith(input)
    })

    it('should return the created sector', async () => {
        vi.mocked(mockSectorRepo.createSector).mockResolvedValueOnce(mockSector)
        const result = await CreateSectorUseCase(mockSectorRepo, input)
        expect(result).toEqual(mockSector)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockSectorRepo.createSector).mockResolvedValueOnce(null)
        const result = await CreateSectorUseCase(mockSectorRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockSectorRepo.createSector).mockRejectedValueOnce(new Error('DB error'))
        await expect(CreateSectorUseCase(mockSectorRepo, input)).rejects.toThrow('DB error')
    })
})
