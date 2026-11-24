import z from "zod";

export const postSchema = z.object({
    title: z.string().trim().min(1, "cannot be empty"),
    description: z.string().trim().min(8, "At least 8 character")
});

export type postSchemType = z.infer<typeof postSchema>