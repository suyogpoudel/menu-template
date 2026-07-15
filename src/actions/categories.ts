"use server";

import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import {
  CategoryData,
  categorySchema,
  UpdateCategoryData,
  updateCategorySchema,
} from "@/validations/menu";
import { and, asc, desc, eq, gt, ilike, lt, ne } from "drizzle-orm";

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
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.message,
    };

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

export const updateCategory = async (data: UpdateCategoryData, id: number) => {
  const parsed = updateCategorySchema.safeParse(data);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.message,
    };

  const categoryName = (parsed.data.name ?? "").trim();
  if (!categoryName) {
    return {
      success: false,
      error: "Category name is required.",
    };
  }

  const [requiredCategory] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id));

  if (!requiredCategory)
    return {
      success: false,
      error: "Required category was not found.",
    };

  try {
    const [existingCategory] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(and(ilike(categories.name, categoryName), ne(categories.id, id)))
      .limit(1);

    if (existingCategory) {
      return {
        success: false,
        error: "A category with this name already exists.",
      };
    }

    const slug = generateSlugs(categoryName);

    await db
      .update(categories)
      .set({
        name: categoryName,
        slug,
      })
      .where(eq(categories.id, id));

    return { success: true, message: "Category updated successfully" };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to update category";

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const reorderCategory = async (id: number, direction: "up" | "down") => {
  try {
    const [currentCategory] = await db
      .select({ id: categories.id, order: categories.order })
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);

    if (!currentCategory) {
      return { success: false, error: "Category not found." };
    }

    const currentOrder = currentCategory.order;

    const swapQuery = db
      .select({ id: categories.id, order: categories.order })
      .from(categories);

    if (direction === "up") {
      swapQuery
        .where(lt(categories.order, currentOrder))
        .orderBy(desc(categories.order));
    } else {
      swapQuery
        .where(gt(categories.order, currentOrder))
        .orderBy(asc(categories.order));
    }

    const [neighborCategory] = await swapQuery.limit(1);

    if (!neighborCategory) {
      return { success: true, message: "Already at the ordering limit." };
    }

    await db.transaction(async (tx) => {
      await tx
        .update(categories)
        .set({ order: neighborCategory.order })
        .where(eq(categories.id, currentCategory.id));
      await tx
        .update(categories)
        .set({ order: currentOrder })
        .where(eq(categories.id, neighborCategory.id));
    });

    return { success: true, message: "Order updated successfully." };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to change order";

    return {
      success: false,
      error: errorMessage,
    };
  }
};

export const deleteCategory = async (id: number) => {
  const [requiredCategory] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id));

  if (!requiredCategory)
    return {
      success: false,
      error: "Category not found",
    };

  try {
    await db.delete(categories).where(eq(categories.id, id));

    return { success: true, message: "Category deleted successfully." };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete category";

    return {
      success: false,
      error: errorMessage,
    };
  }
};
