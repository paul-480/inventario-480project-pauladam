import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateContactMainUseCase } from "./update-contact-main.use-case"
import { mockContactRepo } from "../__mocks__/client.repository.mock"

describe('UpdateContactMainUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateContactMainStatus with clientId and contactId', async () => {
        vi.mocked(mockContactRepo.updateContactMainStatus).mockResolvedValueOnce(undefined)
        await UpdateContactMainUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1')
        expect(mockContactRepo.updateContactMainStatus).toHaveBeenCalledWith('client-uuid-1', 'contact-uuid-1')
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockContactRepo.updateContactMainStatus).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateContactMainUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1')).rejects.toThrow('DB error')
    })
})
