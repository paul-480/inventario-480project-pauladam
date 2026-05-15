import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeleteContactUseCase } from "./delete-contact.use-case"
import { mockContactRepo } from "../__mocks__/client.repository.mock"

describe('DeleteContactUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call deleteClientContact with clientId and contactId', async () => {
        vi.mocked(mockContactRepo.deleteClientContact).mockResolvedValueOnce(undefined)
        await DeleteContactUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1')
        expect(mockContactRepo.deleteClientContact).toHaveBeenCalledWith('client-uuid-1', 'contact-uuid-1')
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockContactRepo.deleteClientContact).mockRejectedValueOnce(new Error('DB error'))
        await expect(DeleteContactUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1')).rejects.toThrow('DB error')
    })
})
