import type { UserRole } from "../auth/auth.entity";

export interface User {
    id:        string;
    name:      string;
    surname:   string;
    email:     string;
    is_active: boolean;
    role:      UserRole;
}
