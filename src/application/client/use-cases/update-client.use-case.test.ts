import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateClientUseCase } from "./update-client.use-case"
import { mockClientRepo, mockClient } from "../__mocks__/client.repository.mock"
import type { UpdateClientSchema } from "@/infrastructure/client/client.schema"

const input: UpdateClientSchema = {
    id: '00000000-0000-0000-0000-000000000001',
    name: 'TechCorp Updated',
    sector_id: '00000000-0000-0000-0000-000000000002',
    is_active: true,
}

describe('UpdateClientUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateClient with the given input', async () => {
        vi.mocked(mockClientRepo.updateClient).mockResolvedValueOnce(mockClient)
        await UpdateClientUseCase(mockClientRepo, input)
        expect(mockClientRepo.updateClient).toHaveBeenCalledWith(input)
    })

    it('should return the updated client', async () => {
        vi.mocked(mockClientRepo.updateClient).mockResolvedValueOnce(mockClient)
        const result = await UpdateClientUseCase(mockClientRepo, input)
        expect(result).toEqual(mockClient)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockClientRepo.updateClient).mockResolvedValueOnce(null)
        const result = await UpdateClientUseCase(mockClientRepo, input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockClientRepo.updateClient).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateClientUseCase(mockClientRepo, input)).rejects.toThrow('DB error')
    })
})
