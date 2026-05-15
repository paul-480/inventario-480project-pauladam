import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateTechnologyUseCase } from "./update-technology.use-case"
import { mockTechnologyRepo, mockTechnology } from "../__mocks__/technology.repository.mock"
import type { UpdateTechnologySchema } from "@/infrastructure/technology/technology.schema"

const input: UpdateTechnologySchema = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'React Updated',
}

describe('UpdateTechnologyUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateTechnology with the given input', async () => {
        vi.mocked(mockTechnologyRepo.updateTechnology).mockResolvedValueOnce(mockTechnology)
        await UpdateTechnologyUseCase(mockTechnologyRepo, input)
        expect(mockTechnologyRepo.updateTechnology).toHaveBeenCalledWith(input)
    })

    it('should return the updated technology', async () => {
        vi.mocked(mockTechnologyRepo.updateTechnology).mockResolvedValueOnce(mockTechnology)
        const result = await UpdateTechnologyUseCase(mockTechnologyRepo, input)
        expect(result).toEqual(mockTechnology)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockTechnologyRepo.updateTechnology).mockResolvedValueOnce(null)
        const result = await UpdateTechnologyUseCase(mockTechnologyRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTechnologyRepo.updateTechnology).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateTechnologyUseCase(mockTechnologyRepo, input)).rejects.toThrow('DB error')
    })
})
