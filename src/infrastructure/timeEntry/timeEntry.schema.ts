import { z } from "zod";

export const createTimeEntrySchema = z.object({
    id: z.string().uuid().optional(),
    project_id: z.string().uuid(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
    hour: z.number().min(0.25).max(24),
    comment: z.string().max(50).optional(),
});

export const updateTimeEntrySchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    hour: z.number().min(0.25).max(24),
    comment: z.string().max(50).optional(),
});

export type CreateTimeEntrySchema = z.infer<typeof createTimeEntrySchema>;
export type UpdateTimeEntrySchema = z.infer<typeof updateTimeEntrySchema>;
