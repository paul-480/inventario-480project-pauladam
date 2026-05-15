import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateProjectTimeEntryUseCase } from "./update-project-time-entry.use-case"
import { mockTimeEntryRepo, mockProjectTimeEntry } from "../../project/__mocks__/project.repository.mock"
import type { UpdateTimeEntrySchema } from "@/infrastructure/timeEntry/timeEntry.schema"

const input: UpdateTimeEntrySchema = {
    date: '2024-06-02',
    hour: 6,
    comment: 'Updated comment',
}

describe('UpdateProjectTimeEntryUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateProjectTimeEntry with all args', async () => {
        vi.mocked(mockTimeEntryRepo.updateProjectTimeEntry).mockResolvedValueOnce(mockProjectTimeEntry)
        await UpdateProjectTimeEntryUseCase(mockTimeEntryRepo, 'project-uuid-1', 'entry-uuid-1', input)
        expect(mockTimeEntryRepo.updateProjectTimeEntry).toHaveBeenCalledWith('project-uuid-1', 'entry-uuid-1', input)
    })

    it('should return the updated time entry', async () => {
        vi.mocked(mockTimeEntryRepo.updateProjectTimeEntry).mockResolvedValueOnce(mockProjectTimeEntry)
        const result = await UpdateProjectTimeEntryUseCase(mockTimeEntryRepo, 'project-uuid-1', 'entry-uuid-1', input)
        expect(result).toEqual(mockProjectTimeEntry)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockTimeEntryRepo.updateProjectTimeEntry).mockResolvedValueOnce(null)
        const result = await UpdateProjectTimeEntryUseCase(mockTimeEntryRepo, 'project-uuid-1', 'entry-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockTimeEntryRepo.updateProjectTimeEntry).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateProjectTimeEntryUseCase(mockTimeEntryRepo, 'project-uuid-1', 'entry-uuid-1', input)).rejects.toThrow('DB error')
    })
})
