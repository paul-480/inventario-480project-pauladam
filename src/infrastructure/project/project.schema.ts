import z from "zod";
import type { CreateProjectDto, UpdateProjectDto } from "../../application/project/project.dto";

export const projectSchema = z.object({
    id: z.uuid(),
    name: z.string().max(150),
    description: z.string().nullable().optional(),
    start_date: z.string().nullable().optional(),
    is_active: z.boolean(),
    client: z.object({
        id: z.uuid(),
        name: z.string()
    }),
    team_members: z.number().optional(),
    permissions: z.object({
        can_edit: z.boolean(),
        can_delete: z.boolean()
    }).optional()
});

export type ProjectSchema = z.infer<typeof projectSchema>;

export const CreateProjectSchema = z.object({
    id: z.uuid().optional(),
    name: z.string().max(150),
    description: z.string().nullable().optional(),
    start_date: z.string().nullable().optional(),
    client_id: z.uuid()
}) satisfies z.ZodType<CreateProjectDto>;

export type CreateProjectSchema = z.infer<typeof CreateProjectSchema>;

export const UpdateProjectSchema = z.object({
    id: z.uuid(),
    name: z.string().max(150),
    description: z.string().nullable().optional(),
    start_date: z.string().nullable().optional(),
    is_active: z.boolean(),
    client_id: z.uuid()
}) satisfies z.ZodType<UpdateProjectDto>;

export type UpdateProjectSchema = z.infer<typeof UpdateProjectSchema>;
