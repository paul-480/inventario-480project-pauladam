import { z } from "zod";

export const createClientSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().max(120),
    sector_id: z.string().uuid(),
});

export const updateClientSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(120).optional(),
    sector_id: z.string().uuid().optional(),
    is_active: z.boolean().optional(),
});

export type CreateClientSchema = z.infer<typeof createClientSchema>;
export type UpdateClientSchema = z.infer<typeof updateClientSchema>;
