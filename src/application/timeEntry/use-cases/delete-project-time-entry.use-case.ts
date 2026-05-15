import type { TimeEntryRepository } from "@/infrastructure/timeEntry/timeEntry.repository";

export const DeleteProjectTimeEntryUseCase = async (
    timeEntryRepository: TimeEntryRepository,
    projectId: string,
    entryId: string
): Promise<void> => {
    return await timeEntryRepository.deleteProjectTimeEntry(projectId, entryId);
};
