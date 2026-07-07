"use server";

import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { CategoryData, categorySchema } from "@/validations/menu";
import { desc, ilike } from "drizzle-orm";

const generateSlugs = (text: string): string => {
  return (
    text
      .toLowerCase()
      .trim()
      // Replace spaces and special characters with hyphens
      .replace(/[^a-z0-9\s-]/g, "") // Removes anything that isn't a letter, number, space, or hyphen
      .replace(/\s+/g, "-") // Replaces spaces (one or more) with a single hyphen
      .replace(/-+/g, "-")
  );
};

export const createCategory = async (data: CategoryData) => {
  const parsed = categorySchema.safeParse(data);

  if (!parsed.success) throw new Error(parsed.error.message);

  const category = parsed.data;

  try {
    const [existingCategory] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(ilike(categories.name, category.name.trim()))
      .limit(1);

    if (existingCategory) {
      return {
        success: false,
        error: "A category with this name already exists.",
      };
    }

    const slug = generateSlugs(category.name);

    const [highestOrderCategory] = await db
      .select({ order: categories.order })
      .from(categories)
      .orderBy(desc(categories.order))
      .limit(1);

    const nextOrder = highestOrderCategory ? highestOrderCategory.order + 1 : 1;

    await db.insert(categories).values({
      name: category.name,
      order: nextOrder,
      slug,
    });

    return { success: true, message: "Category created successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create category";

    return {
      success: false,
      error: errorMessage,
    };
  }
};
