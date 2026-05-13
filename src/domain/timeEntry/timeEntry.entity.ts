import type { Uuid } from "../shared/uuid.vo";

export interface TimeEntryProject {
    id: Uuid;
    name: string;
}

export interface TimeEntry {
    id: Uuid;
    date: string;
    hour: number;
    comment: string | null;
    project: TimeEntryProject;
    userId?: Uuid;
}

export interface ProjectTimeEntry {
    id: Uuid;
    name: string;
    surname: string;
    date: string;
    hour: number;
    comment: string | null;
}
