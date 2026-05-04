import { UserRole } from "../shared/user-role.vo";

export interface User {
    id:        string;
    name:      string;
    surname:   string;
    password:  string;
    email:     string;
    is_active: boolean;
    role:      UserRole;
}
