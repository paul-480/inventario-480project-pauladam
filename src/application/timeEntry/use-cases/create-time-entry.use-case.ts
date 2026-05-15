import type { TimeEntryRepository } from "@/infrastructure/timeEntry/timeEntry.repository";
import type { TimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import type { CreateTimeEntrySchema } from "@/infrastructure/timeEntry/timeEntry.schema";

export const CreateTimeEntryUseCase = async (
    timeEntryRepository: TimeEntryRepository,
    userId: string,
    entry: CreateTimeEntrySchema
): Promise<TimeEntry | null> => {
    return await timeEntryRepository.createTimeEntry(userId, entry);
};
