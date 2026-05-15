import { describe, it, expect, vi, beforeEach } from "vitest"
import { GetProjectTimeEntriesUseCase } from "./get-project-time-entries.use-case"
import { mockTimeEntryRepo, mockProjectTimeEntry } from "../__mocks__/project.repository.mock"

describe('GetProjectTimeEntriesUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call getProjectTimeEntries with projectId only', async () => {
        vi.mocked(mockTimeEntryRepo.getProjectTimeEntries).mockResolvedValueOnce([mockProjectTimeEntry])
        await GetProjectTimeEntriesUseCase(mockTimeEntryRepo, 'project-uuid-1')
        expect(mockTimeEntryRepo.getProjectTimeEntries).toHaveBeenCalledWith('project-uuid-1', undefined)
    })

    it('should pass optional params to the repository', async () => {
        const params = { from: '2024-01-01', to: '2024-12-31', page: 1, limit: 20 }
        vi.mocked(mockTimeEntryRepo.getProjectTimeEntries).mockResolvedValueOnce([mockProjectTimeEntry])
        await GetProjectTimeEntriesUseCase(mockTimeEntryRepo, 'project-uuid-1', params)
        expect(mockTimeEntryRepo.getProjectTimeEntries).toHaveBeenCalledWith('project-uuid-1', params)
    })

    it('should return the list of time entries', async () => {
        vi.mocked(mockTimeEntryRepo.getProjectTimeEntries).mockResolvedValueOnce([mockProjectTimeEntry])
        const result = await GetProjectTimeEntriesUseCase(mockTimeEntryRepo, 'project-uuid-1')
        expect(result).toEqual([mockProjectTimeEntry])
    })

    it('should return empty array when no entries exist', async () => {
        vi.mocked(mockTimeEntryRepo.getProjectTimeEntries).mockResolvedValueOnce([])
        const result = await GetProjectTimeEntriesUseCase(mockTimeEntryRepo, 'project-uuid-1')
        expect(result).toEqual([])
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTimeEntryRepo.getProjectTimeEntries).mockRejectedValueOnce(new Error('DB error'))
        await expect(GetProjectTimeEntriesUseCase(mockTimeEntryRepo, 'project-uuid-1')).rejects.toThrow('DB error')
    })
})
