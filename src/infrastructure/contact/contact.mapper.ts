import type { Contact } from "@/domain/contact/contact.entity";
import { Uuid } from "@/domain/shared/uuid.vo";
import type { CreateContactSchema, UpdateContactSchema } from "./contact.schema";

export interface ContactResponseDto {
    id: string;
    full_name: string;
    phone_number: string | null;
    email: string;
    is_main: boolean | null;
    note: string | null;
}

export const contactMapper = {
    toDomain: (raw: ContactResponseDto): Contact => {
        return {
            id: new Uuid(raw.id),
            fullName: raw.full_name,
            phoneNumber: raw.phone_number,
            email: raw.email,
            isMain: raw.is_main,
            note: raw.note
        };
    },
    toDomainList: (raw: ContactResponseDto[]): Contact[] => 
        raw.map((contact: ContactResponseDto) => contactMapper.toDomain(contact)),
    toCreateSchema: (contact: Contact): CreateContactSchema => {
        return {
            id: contact.id.value,
            full_name: contact.fullName,
            phone_number: contact.phoneNumber,
            email: contact.email,
            note: contact.note
        };
    },
    toUpdateSchema: (contact: Partial<Contact> & { id: string }): UpdateContactSchema => {
        return {
            full_name: contact.fullName || '',
            phone_number: contact.phoneNumber,
            email: contact.email || '',
            is_main: contact.isMain,
            note: contact.note
        };
    }
};
