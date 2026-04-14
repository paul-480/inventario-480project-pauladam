
export interface UserProject {
    id: string;
    name: string;
    description: string;
    is_active: boolean;
    client: Client;
    team_members: number;
}
export interface Client{
    id: String;
    name: String;
}