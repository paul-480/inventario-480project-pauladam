import type { TimeEntry, ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import { Uuid } from "@/domain/shared/uuid.vo";
import type { CreateTimeEntrySchema } from "./timeEntry.schema";

export interface TimeEntryResponseDto {
    id: string;
    date: string;
    hour: number;
    comment: string | null;
    project: {
        id: string;
        name: string;
    };
}

export interface ProjectTimeEntryResponseDto {
    id: string;
    name: string;
    surname: string;
    date: string;
    hour: number;
    comment: string | null;
}

export const timeEntryMapper = {
    toDomain: (raw: TimeEntryResponseDto): TimeEntry => {
        return {
            id: new Uuid(raw.id),
            date: raw.date,
            hour: Number(raw.hour),
            comment: raw.comment,
            project: {
                id: new Uuid(raw.project.id),
                name: raw.project.name
            }
        };
    },
    toDomainList: (raw: TimeEntryResponseDto[]): TimeEntry[] => 
        raw.map((entry: TimeEntryResponseDto) => timeEntryMapper.toDomain(entry)),
    toProjectTimeEntryDomain: (raw: ProjectTimeEntryResponseDto): ProjectTimeEntry => {
        return {
            id: new Uuid(raw.id),
            name: raw.name,
            surname: raw.surname,
            date: raw.date,
            hour: Number(raw.hour),
            comment: raw.comment
        };
    },
    toProjectTimeEntryDomainList: (raw: ProjectTimeEntryResponseDto[]): ProjectTimeEntry[] => 
        raw.map((entry: ProjectTimeEntryResponseDto) => timeEntryMapper.toProjectTimeEntryDomain(entry)),
    toCreateSchema: (entry: Omit<TimeEntry, 'id'> & { id?: Uuid, projectId: string }): CreateTimeEntrySchema => {
        return {
            project_id: entry.projectId,
            date: entry.date,
            hour: entry.hour,
            comment: entry.comment || undefined
        };
    }
};
