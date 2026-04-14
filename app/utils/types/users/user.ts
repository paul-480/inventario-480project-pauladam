import type { UUID } from "crypto";
import type { UserProject } from "../projects/project";

export type userRole = 'EMPLOYEE'| 'ADMIN';

export interface User {
/**
 * @format uuid-v7
 * @example "018f3b2a-71a8-7e72-886a-d5147f9dc808"
 */
    id: string;
    name:      string;
    surname:   string;
    email:     string;
    isActive: boolean;
    role:      userRole;
    projects:  UserProject[];
}