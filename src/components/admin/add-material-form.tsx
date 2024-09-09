"use client";

import { addMaterial } from "@/src/actions/materials";
import { Button } from "@/src/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

import { useToast } from "@/src/components/ui/use-toast";
import { addRelicMaterials } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColour, UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const AddMaterialForm = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addRelicMaterials>>({
    resolver: zodResolver(addRelicMaterials),
    defaultValues: {
      name: undefined,
      imageUrl: undefined,
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof addRelicMaterials>) => {
    startTransition(() => {
      addMaterial(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "destructive",
            });
          }

          if (data.success) {
            update();
            form.setValue("name", undefined);
            form.setValue("imageUrl", undefined);
            setSuccess(data.success);
            toast({
              title: "Success!",
              description: data.success,
              variant: "default",
            });
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between flex-row gap-5">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Add Material
        </h1>
        <Button variant="outline" size="sm" asChild>
          <Link href={"/admin/relics/materials"}>Go Back</Link>
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Wind Source"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="image URL"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <FormError message={error} />
              <FormSuccess message={success} /> */}
          <Button type="submit">Add Material</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddMaterialForm;
