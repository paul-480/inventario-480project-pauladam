import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateContactUseCase } from "./create-contact.use-case"
import { mockContactRepo, mockContact } from "../__mocks__/client.repository.mock"
import type { CreateContactSchema } from "@/infrastructure/contact/contact.schema"

const input: CreateContactSchema = {
    full_name: 'Ana López',
    email: 'ana@techcorp.es',
    phone_number: '+34600000001',
    note: null,
}

describe('CreateContactUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call createClientContact with clientId and contact input', async () => {
        vi.mocked(mockContactRepo.createClientContact).mockResolvedValueOnce(mockContact)
        await CreateContactUseCase(mockContactRepo, 'client-uuid-1', input)
        expect(mockContactRepo.createClientContact).toHaveBeenCalledWith('client-uuid-1', input)
    })

    it('should return the created contact', async () => {
        vi.mocked(mockContactRepo.createClientContact).mockResolvedValueOnce(mockContact)
        const result = await CreateContactUseCase(mockContactRepo, 'client-uuid-1', input)
        expect(result).toEqual(mockContact)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockContactRepo.createClientContact).mockResolvedValueOnce(null)
        const result = await CreateContactUseCase(mockContactRepo, 'client-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockContactRepo.createClientContact).mockRejectedValueOnce(new Error('DB error'))
        await expect(CreateContactUseCase(mockContactRepo, 'client-uuid-1', input)).rejects.toThrow('DB error')
    })
})
