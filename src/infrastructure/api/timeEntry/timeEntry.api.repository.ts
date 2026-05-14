import type { TimeEntry, ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import type { TimeEntryRepository } from "@/infrastructure/timeEntry/timeEntry.repository";
import type { CreateTimeEntrySchema, UpdateTimeEntrySchema } from "@/infrastructure/timeEntry/timeEntry.schema";
import { timeEntryMapper } from "@/infrastructure/timeEntry/timeEntry.mapper";
import { axiosClient } from "../axios.client";

export const TimeEntryApiRepository: TimeEntryRepository = {
    getUserTimeEntries: async (userId: string, from?: string, to?: string, projectId?: string, page: number = 1, limit: number = 20): Promise<TimeEntry[]> => {
        const params = new URLSearchParams();
        if (from) params.append('from', from);
        if (to) params.append('to', to);
        if (projectId) params.append('project_id', projectId);
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        
        const response = await axiosClient.get(`/users/${userId}/time-entries?${params.toString()}`);
        const raw = Array.isArray(response.data) ? response.data : (response.data?.data ?? []);
        return timeEntryMapper.toDomainList(raw);
    },
    createTimeEntry: async (userId: string, entry: CreateTimeEntrySchema): Promise<TimeEntry | null> => {
        const response = await axiosClient.post(`/users/${userId}/time-entries`, entry);
        if (!response.data?.id || !response.data?.project) return null;
        return timeEntryMapper.toDomain(response.data);
    },
    getProjectTimeEntries: async (projectId: string, params?: {
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
    }): Promise<ProjectTimeEntry[]> => {
        const queryParams = new URLSearchParams();
        if (params?.from) queryParams.append('from', params.from);
        if (params?.to) queryParams.append('to', params.to);
        if (params?.app_user_id) queryParams.append('app_user_id', params.app_user_id);
        if (params?.min_hour !== undefined) queryParams.append('min_hour', params.min_hour.toString());
        if (params?.max_hour !== undefined) queryParams.append('max_hour', params.max_hour.toString());
        if (params?.has_comment !== undefined) queryParams.append('has_comment', params.has_comment.toString());
        if (params?.sort_by) queryParams.append('sort_by', params.sort_by);
        if (params?.sort_order) queryParams.append('sort_order', params.sort_order);
        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        
        const query = queryParams.toString() ? `?${queryParams.toString()}` : '';
        const response = await axiosClient.get(`/projects/${projectId}/time-entries${query}`);
        return timeEntryMapper.toProjectTimeEntryDomainList(response.data);
    },
    updateProjectTimeEntry: async (projectId: string, entryId: string, entry: UpdateTimeEntrySchema): Promise<ProjectTimeEntry | null> => {
        const response = await axiosClient.put(`/projects/${projectId}/time-entries/${entryId}`, entry);
        return timeEntryMapper.toProjectTimeEntryDomain(response.data);
    },
    deleteProjectTimeEntry: async (projectId: string, entryId: string): Promise<void> => {
        await axiosClient.delete(`/projects/${projectId}/time-entries/${entryId}`);
    }
};
