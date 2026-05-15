import type { TimeEntryRepository } from "@/infrastructure/timeEntry/timeEntry.repository";
import type { ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import type { UpdateTimeEntrySchema } from "@/infrastructure/timeEntry/timeEntry.schema";

export const UpdateProjectTimeEntryUseCase = async (
    timeEntryRepository: TimeEntryRepository,
    projectId: string,
    entryId: string,
    entry: UpdateTimeEntrySchema
): Promise<ProjectTimeEntry | null> => {
    return await timeEntryRepository.updateProjectTimeEntry(projectId, entryId, entry);
};
