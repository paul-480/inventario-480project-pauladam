import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateContactUseCase } from "./update-contact.use-case"
import { mockContactRepo, mockContact } from "../__mocks__/client.repository.mock"
import type { UpdateContactSchema } from "@/infrastructure/contact/contact.schema"

const input: UpdateContactSchema = {
    full_name: 'Ana López Updated',
    email: 'ana.updated@techcorp.es',
    phone_number: '+34600000002',
    is_main: false,
    note: 'Updated note',
}

describe('UpdateContactUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateClientContact with all args', async () => {
        vi.mocked(mockContactRepo.updateClientContact).mockResolvedValueOnce(mockContact)
        await UpdateContactUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1', input)
        expect(mockContactRepo.updateClientContact).toHaveBeenCalledWith('client-uuid-1', 'contact-uuid-1', input)
    })

    it('should return the updated contact', async () => {
        vi.mocked(mockContactRepo.updateClientContact).mockResolvedValueOnce(mockContact)
        const result = await UpdateContactUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1', input)
        expect(result).toEqual(mockContact)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockContactRepo.updateClientContact).mockResolvedValueOnce(null)
        const result = await UpdateContactUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockContactRepo.updateClientContact).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateContactUseCase(mockContactRepo, 'client-uuid-1', 'contact-uuid-1', input)).rejects.toThrow('DB error')
    })
})
