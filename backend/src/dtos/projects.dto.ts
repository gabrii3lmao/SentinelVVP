import z from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(255, "Project name must be less than 255 characters"),
});



export type CreateProjectInput = z.infer<typeof createProjectSchema>;