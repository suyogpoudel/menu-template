"use client";

import { CategoryData, categorySchema } from "@/validations/menu";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategory } from "@/actions/categories";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AddCategoryForm = () => {
  const form = useForm<CategoryData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryData) => {
    const result = await createCategory(data);

    if (result.success) {
      toast.success(result.message);
      form.reset();
    } else {
      toast.error(result.error);
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel htmlFor="name" className="text-sm px-2">
                Name
              </FieldLabel>

              <Input id="name" {...field} placeholder="Enter category name" />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Adding....." : "Add Category"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default AddCategoryForm;
