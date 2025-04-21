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
import { Card } from "@/src/components/ui/card";
import { ArrowLeft, MoveLeft } from "lucide-react";

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
    <>
      <div>
        <div className="flex justify-between flex-row items-center pb-5 gap-5">
          <div className="flex flex-row gap-2 items-center">
            <Button
              variant="outline"
              size="icon"
              className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
              asChild
            >
              <Link href={"/dashboard/materials"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight font-bold text-white">
                Edit Material
              </h1>
              <span className="text-gray-500 dark:text-gray-300">
                Update info for {materialsEdit[0].name}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 border-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Material Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Wind Source"
                        type="text"
                        className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
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
                    <FormLabel className="text-white">
                      Material Image URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="image URL"
                        type="text"
                        className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
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
                    <FormLabel className="text-white">
                      Material Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Location"
                        type="text"
                        className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
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
            <div className="flex flex-row gap-4 justify-end items-center">
              <Button
                type="button"
                className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 rounded-[5px] hover:bg-purple-600 border-[2px] flex flex-row items-center text-white  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >
                <Link href={"/dashboard/materials"}>Cancel</Link>
              </Button>
              <Button
                type="submit"
className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 rounded-[5px] hover:bg-purple-600 border-[2px] flex flex-row items-center text-white  hover:text-white dark:bg-purple-700 transition-all duration-250"              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default EditMaterialForm;
