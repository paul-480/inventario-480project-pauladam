import { describe, it, expect, vi, beforeEach } from "vitest"
import { GetUserTimeEntriesUseCase } from "./get-user-time-entries.use-case"
import { mockTimeEntryRepo, mockTimeEntry } from "../../project/__mocks__/project.repository.mock"

describe('GetUserTimeEntriesUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call getUserTimeEntries with userId only', async () => {
        vi.mocked(mockTimeEntryRepo.getUserTimeEntries).mockResolvedValueOnce([mockTimeEntry])
        await GetUserTimeEntriesUseCase(mockTimeEntryRepo, 'user-uuid-1')
        expect(mockTimeEntryRepo.getUserTimeEntries).toHaveBeenCalledWith('user-uuid-1', undefined, undefined, undefined, undefined, undefined)
    })

    it('should pass all optional params to the repository', async () => {
        vi.mocked(mockTimeEntryRepo.getUserTimeEntries).mockResolvedValueOnce([mockTimeEntry])
        await GetUserTimeEntriesUseCase(mockTimeEntryRepo, 'user-uuid-1', '2024-01-01', '2024-12-31', 'project-uuid-1', 1, 20)
        expect(mockTimeEntryRepo.getUserTimeEntries).toHaveBeenCalledWith('user-uuid-1', '2024-01-01', '2024-12-31', 'project-uuid-1', 1, 20)
    })

    it('should return the list of time entries', async () => {
        vi.mocked(mockTimeEntryRepo.getUserTimeEntries).mockResolvedValueOnce([mockTimeEntry])
        const result = await GetUserTimeEntriesUseCase(mockTimeEntryRepo, 'user-uuid-1')
        expect(result).toEqual([mockTimeEntry])
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTimeEntryRepo.getUserTimeEntries).mockRejectedValueOnce(new Error('DB error'))
        await expect(GetUserTimeEntriesUseCase(mockTimeEntryRepo, 'user-uuid-1')).rejects.toThrow('DB error')
    })
})
