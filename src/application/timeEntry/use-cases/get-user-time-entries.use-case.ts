import type { TimeEntryRepository } from "@/infrastructure/timeEntry/timeEntry.repository";
import type { TimeEntry } from "@/domain/timeEntry/timeEntry.entity";

export const GetUserTimeEntriesUseCase = async (
    timeEntryRepository: TimeEntryRepository,
    userId: string,
    from?: string,
    to?: string,
    projectId?: string,
    page?: number,
    limit?: number
): Promise<TimeEntry[]> => {
    return await timeEntryRepository.getUserTimeEntries(userId, from, to, projectId, page, limit);
};
