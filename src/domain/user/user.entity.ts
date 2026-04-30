import type { UserRole } from "../auth/auth.entity";

export interface User {
    id:        string;
    name:      string;
    surname:   string;
    password:  string;
    email:     string;
    is_active: boolean;
    role:      UserRole;
}
