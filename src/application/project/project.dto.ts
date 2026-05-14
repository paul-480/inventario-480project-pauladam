export interface CreateProjectDto {
    id?: string;
    name: string;
    description?: string | null;
    start_date?: string | null;
    client_id: string;
}

export interface UpdateProjectDto {
    id: string;
    name: string;
    description?: string | null;
    start_date?: string | null;
    is_active: boolean;
    client_id: string;
}

export interface ProjectResponseDto {
    id: string;
    name: string;
    description: string | null;
    start_date: string | null;
    is_active: boolean;
    client: {
        id: string;
        name: string;
    };
    team_members?: number;
    permissions?: {
        can_edit: boolean;
        can_delete: boolean;
    };
}
