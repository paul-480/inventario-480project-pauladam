import { UserRole } from "../shared/user-role.vo";

export interface User {
    id:        string;
    name:      string;
    surname:   string;
    email:     string;
    isActive: boolean;
    role:      UserRole;
}
