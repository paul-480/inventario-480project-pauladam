import z from "zod";

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    isActive: z.boolean(),
    role: z.string(),
});