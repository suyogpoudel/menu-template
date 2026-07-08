import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(1, "Category name is necessary")
    .max(255, "Category name is too long"),
});

export type CategoryData = z.infer<typeof categorySchema>;

export const updateCategorySchema = categorySchema.partial();

export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
