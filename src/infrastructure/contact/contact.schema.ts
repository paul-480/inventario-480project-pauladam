import { z } from "zod";

export const createContactSchema = z.object({
    id: z.string().uuid().optional(),
    full_name: z.string(),
    phone_number: z.string().max(30).optional().nullable(),
    email: z.string().email(),
    note: z.string().max(100).optional().nullable(),
});

export const updateContactSchema = z.object({
    full_name: z.string(),
    phone_number: z.string().max(30).optional().nullable(),
    email: z.string().email(),
    is_main: z.boolean().optional().nullable(),
    note: z.string().max(100).optional().nullable(),
});

export type CreateContactSchema = z.infer<typeof createContactSchema>;
export type UpdateContactSchema = z.infer<typeof updateContactSchema>;
