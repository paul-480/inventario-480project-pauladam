import type { Uuid } from "../shared/uuid.vo";

export interface Contact {
    id: Uuid;
    fullName: string;
    phoneNumber: string | null;
    email: string;
    isMain: boolean | null;
    note: string | null;
}
