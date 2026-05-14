import type { TimeEntry, ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import type { CreateTimeEntrySchema, UpdateTimeEntrySchema } from "./timeEntry.schema";

export interface TimeEntryRepository {
    getUserTimeEntries(userId: string, from?: string, to?: string, projectId?: string, page?: number, limit?: number): Promise<TimeEntry[]>;
    createTimeEntry(userId: string, entry: CreateTimeEntrySchema): Promise<TimeEntry | null>;
    getProjectTimeEntries(projectId: string, params?: {
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
    }): Promise<ProjectTimeEntry[]>;
    updateProjectTimeEntry(projectId: string, entryId: string, entry: UpdateTimeEntrySchema): Promise<ProjectTimeEntry | null>;
    deleteProjectTimeEntry(projectId: string, entryId: string): Promise<void>;
}
