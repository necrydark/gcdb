"use client";

import { addMaterial, updateMaterial } from "@/src/actions/materials";
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
import { Material, ProfileColour, UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface FormProps {
  materialsEdit: Material[];
}

const EditMaterialForm = ({ materialsEdit }: FormProps) => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addRelicMaterials>>({
    resolver: zodResolver(addRelicMaterials),
    defaultValues: {
      name: materialsEdit[0].name ?? undefined,
      imageUrl: materialsEdit[0].imageUrl ?? undefined,
      location: materialsEdit[0].location ?? undefined,
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof addRelicMaterials>) => {
    startTransition(() => {
      updateMaterial(values, materialsEdit[0].id)
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
            form.reset();
            setSuccess(data.success);
            toast({
              title: "Success!",
              description: data.success,
              variant: "default",
            });
            router.back();
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
          <Link href={"/admin/materials"}>Go Back</Link>
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
             <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material Location</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Location"
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
          <Button type="submit">Update Material</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditMaterialForm;
