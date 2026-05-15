import { describe, it, expect, vi, beforeEach } from "vitest"
import { GetClientByIdUseCase } from "./get-client-by-id.use-case"
import { mockClientRepo, mockClient } from "../__mocks__/client.repository.mock"

describe('GetClientByIdUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call getClientById with the given id', async () => {
        vi.mocked(mockClientRepo.getClientById).mockResolvedValueOnce(mockClient)
        await GetClientByIdUseCase(mockClientRepo, 'client-uuid-1')
        expect(mockClientRepo.getClientById).toHaveBeenCalledWith('client-uuid-1')
    })

    it('should return the client when found', async () => {
        vi.mocked(mockClientRepo.getClientById).mockResolvedValueOnce(mockClient)
        const result = await GetClientByIdUseCase(mockClientRepo, 'client-uuid-1')
        expect(result).toEqual(mockClient)
    })

    it('should return null when client is not found', async () => {
        vi.mocked(mockClientRepo.getClientById).mockResolvedValueOnce(null)
        const result = await GetClientByIdUseCase(mockClientRepo, 'nonexistent-id')
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockClientRepo.getClientById).mockRejectedValueOnce(new Error('DB error'))
        await expect(GetClientByIdUseCase(mockClientRepo, 'client-uuid-1')).rejects.toThrow('DB error')
    })
})
