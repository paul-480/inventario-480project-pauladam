export interface Entries {
    total_hours: number;
    data:        TimeEntry[];
}

export interface TimeEntry {
    id:              string;
    project_user_id: string;
    date:            Date;
    hour:            number;
    comment:         string;
    project:         Project;
}

export interface Project {
    id:   string;
    name: string;
}
