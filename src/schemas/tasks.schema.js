import { z } from 'zod';

export const createTaskSchema = z.object({
    projectId: z
        .string({
            required_error: "Project ID is required",
        }), // Se pone el campo projectId de primero
    title: z
        .string({
            required_error: "Title is required",
        }),
    description: z
        .string({
            required_error: "Description is required",
        }),
    date: z.string().datetime().optional(),
});
