import { z } from "zod";

export const createTechnologySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string(),
});

export const updateTechnologySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
});

export type CreateTechnologySchema = z.infer<typeof createTechnologySchema>;
export type UpdateTechnologySchema = z.infer<typeof updateTechnologySchema>;
