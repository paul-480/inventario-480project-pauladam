import { z } from "zod";

export const createSectorSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().max(100),
});

export const updateSectorSchema = z.object({
    id: z.string().uuid(),
    name: z.string().max(100),
});

export type CreateSectorSchema = z.infer<typeof createSectorSchema>;
export type UpdateSectorSchema = z.infer<typeof updateSectorSchema>;
