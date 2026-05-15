import { describe, it, expect, vi, beforeEach } from "vitest"
import { DeleteProjectTimeEntryUseCase } from "./delete-project-time-entry.use-case"
import { mockTimeEntryRepo } from "../../project/__mocks__/project.repository.mock"

describe('DeleteProjectTimeEntryUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call deleteProjectTimeEntry with projectId and entryId', async () => {
        vi.mocked(mockTimeEntryRepo.deleteProjectTimeEntry).mockResolvedValueOnce(undefined)
        await DeleteProjectTimeEntryUseCase(mockTimeEntryRepo, 'project-uuid-1', 'entry-uuid-1')
        expect(mockTimeEntryRepo.deleteProjectTimeEntry).toHaveBeenCalledWith('project-uuid-1', 'entry-uuid-1')
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTimeEntryRepo.deleteProjectTimeEntry).mockRejectedValueOnce(new Error('DB error'))
        await expect(DeleteProjectTimeEntryUseCase(mockTimeEntryRepo, 'project-uuid-1', 'entry-uuid-1')).rejects.toThrow('DB error')
    })
})
