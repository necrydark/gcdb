"use client";

import { toast } from "sonner";
import { addIngredient } from "@/src/actions/food";
import { ingredientSchema } from "@/src/schemas/admin/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AdminFormLayout } from "@/src/components/admin/shared/admin-form-layout";
import { FormFieldWrapper } from "@/src/components/admin/shared/form-field-wrapper";
import { FormActions } from "@/src/components/admin/shared/form-actions";
import {
  Form,
} from "@/src/components/ui/form";

const AddIngredientForm = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof ingredientSchema>>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      location: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ingredientSchema>) => {
    startTransition(() => {
      addIngredient(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.error("An error has occurred", {
              description: data.error,
              className:
                "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white",
            });
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            toast.success("Form submitted", {
              description: data.success,
              className:
                "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white",
            });
            setTimeout(() => {
              router.push("/dashboard/ingredients");
            }, 1500);
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <AdminFormLayout 
      title="Ingredient Information"
      description="Fill in the details below to add a new ingredient"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormFieldWrapper
            control={form.control}
            name="name"
            label="Ingredient Name"
            placeholder="Sugar"
            required
            disabled={isPending}
          />
          
          <FormFieldWrapper
            control={form.control}
            name="imageUrl"
            label="Ingredient Image URL"
            placeholder="https://example.com/image.jpg"
            type="url"
            disabled={isPending}
          />
          
          <FormFieldWrapper
            control={form.control}
            name="location"
            label="Ingredient Location"
            placeholder="Kitchen, Market, etc."
            disabled={isPending}
          />

          <FormActions
            onCancelHref="/dashboard/ingredients"
            onCancelLabel="Cancel"
            onSubmitLabel="Add Ingredient"
            isSubmitting={isPending}
          />
        </form>
      </Form>
    </AdminFormLayout>
  );
};

export default AddIngredientForm;