import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateTechnologyUseCase } from "./create-technology.use-case"
import { mockTechnologyRepo, mockTechnology } from "../__mocks__/technology.repository.mock"
import type { CreateTechnologySchema } from "@/infrastructure/technology/technology.schema"

const input: CreateTechnologySchema = {
    name: 'React',
}

describe('CreateTechnologyUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call createTechnology with the given input', async () => {
        vi.mocked(mockTechnologyRepo.createTechnology).mockResolvedValueOnce(mockTechnology)
        await CreateTechnologyUseCase(mockTechnologyRepo, input)
        expect(mockTechnologyRepo.createTechnology).toHaveBeenCalledWith(input)
    })

    it('should return the created technology', async () => {
        vi.mocked(mockTechnologyRepo.createTechnology).mockResolvedValueOnce(mockTechnology)
        const result = await CreateTechnologyUseCase(mockTechnologyRepo, input)
        expect(result).toEqual(mockTechnology)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockTechnologyRepo.createTechnology).mockResolvedValueOnce(null)
        const result = await CreateTechnologyUseCase(mockTechnologyRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTechnologyRepo.createTechnology).mockRejectedValueOnce(new Error('DB error'))
        await expect(CreateTechnologyUseCase(mockTechnologyRepo, input)).rejects.toThrow('DB error')
    })
})
