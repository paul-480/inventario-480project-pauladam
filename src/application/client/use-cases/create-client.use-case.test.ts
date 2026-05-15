import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateClientUseCase } from "./create-client.use-case"
import type { CreateClientSchema } from "@/infrastructure/client/client.schema"
import { mockClientRepo, mockClient } from "../__mocks__/client.repository.mock"

const input: CreateClientSchema = {
    name: 'TechCorp',
    sector_id: 'sector-uuid-1',
}

describe('CreateClientUseCase', () => {

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call createClient on the repository with the given input', async () => {
        vi.mocked(mockClientRepo.createClient).mockResolvedValueOnce(mockClient)
        await CreateClientUseCase(mockClientRepo, input)
        expect(mockClientRepo.createClient).toHaveBeenCalledOnce()
        expect(mockClientRepo.createClient).toHaveBeenCalledWith(input)
    })

    it('should return the created client', async () => {
        vi.mocked(mockClientRepo.createClient).mockResolvedValueOnce(mockClient)
        const result = await CreateClientUseCase(mockClientRepo, input)
        expect(result).toEqual(mockClient)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockClientRepo.createClient).mockResolvedValueOnce(null)
        const result = await CreateClientUseCase(mockClientRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors thrown by the repository', async () => {
        vi.mocked(mockClientRepo.createClient).mockRejectedValueOnce(new Error('DB error'))
        await expect(CreateClientUseCase(mockClientRepo, input)).rejects.toThrow('DB error')
    })
})
