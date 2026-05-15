import { describe, it, expect, vi, beforeEach } from "vitest"
import { CreateTimeEntryUseCase } from "./create-time-entry.use-case"
import { mockTimeEntryRepo, mockTimeEntry } from "../../project/__mocks__/project.repository.mock"
import type { CreateTimeEntrySchema } from "@/infrastructure/timeEntry/timeEntry.schema"

const input: CreateTimeEntrySchema = {
    project_id: '00000000-0000-0000-0000-000000000001',
    date: '2024-06-01',
    hour: 8,
    comment: 'Worked on feature X',
}

describe('CreateTimeEntryUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call createTimeEntry with userId and input', async () => {
        vi.mocked(mockTimeEntryRepo.createTimeEntry).mockResolvedValueOnce(mockTimeEntry)
        await CreateTimeEntryUseCase(mockTimeEntryRepo, 'user-uuid-1', input)
        expect(mockTimeEntryRepo.createTimeEntry).toHaveBeenCalledWith('user-uuid-1', input)
    })

    it('should return the created time entry', async () => {
        vi.mocked(mockTimeEntryRepo.createTimeEntry).mockResolvedValueOnce(mockTimeEntry)
        const result = await CreateTimeEntryUseCase(mockTimeEntryRepo, 'user-uuid-1', input)
        expect(result).toEqual(mockTimeEntry)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockTimeEntryRepo.createTimeEntry).mockResolvedValueOnce(null)
        const result = await CreateTimeEntryUseCase(mockTimeEntryRepo, 'user-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTimeEntryRepo.createTimeEntry).mockRejectedValueOnce(new Error('DB error'))
        await expect(CreateTimeEntryUseCase(mockTimeEntryRepo, 'user-uuid-1', input)).rejects.toThrow('DB error')
    })
})
