import { z } from "zod";

export const developmentLinkSchema = z.object({
    environment: z.enum(["STAGE", "PREPRODUCTION", "PRODUCTION"]),
    url: z.url()
});

export const createDevelopmentSchema = z.object({
    id: z.uuid().optional(),
    technology_id: z.uuid(),
    name: z.string().max(100),
    description: z.string().max(150),
    url_repository: z.url()
});

export const updateDevelopmentSchema = z.object({
    name: z.string().max(100),
    description: z.string().max(150),
    technology_id: z.uuid(),
    url_repository: z.url(),
    links: z.array(developmentLinkSchema).optional()
});

export type DevelopmentLinkSchema = z.infer<typeof developmentLinkSchema>;
export type CreateDevelopmentSchema = z.infer<typeof createDevelopmentSchema>;
export type UpdateDevelopmentSchema = z.infer<typeof updateDevelopmentSchema>;
