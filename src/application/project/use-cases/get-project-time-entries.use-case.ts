import type { TimeEntryRepository } from "@/infrastructure/timeEntry/timeEntry.repository";
import type { ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity";

export const GetProjectTimeEntriesUseCase = async (
    timeEntryRepository: TimeEntryRepository,
    projectId: string,
    params?: {
        from?: string;
        to?: string;
        app_user_id?: string;
        min_hour?: number;
        max_hour?: number;
        has_comment?: boolean;
        sort_by?: string;
        sort_order?: string;
        page?: number;
        limit?: number;
    }
): Promise<ProjectTimeEntry[]> => {
    return await timeEntryRepository.getProjectTimeEntries(projectId, params);
};
