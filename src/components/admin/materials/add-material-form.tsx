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

import { toast } from "sonner";

import { addRelicMaterials } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const AddMaterialForm = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof addRelicMaterials>>({
    resolver: zodResolver(addRelicMaterials),
    defaultValues: {
      name: undefined,
      imageUrl: undefined,
      location: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof addRelicMaterials>) => {
    startTransition(() => {
      addMaterial(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.error("An error has occured", {
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
              router.push("/dashboard/materials");
            }, 1500);
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between flex-row items-center pb-5 gap-5">
        <div className="flex flex-row gap-2 items-center">
          <Button
            size="icon"
            variant="gradient"
            className=" border-[2px]  hover:text-white  transition-all duration-250"
            asChild
          >
            <Link href={"/dashboard/materials"}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl leading-tight font-bold text-white">
              Add Material
            </h1>
            <p>Add a new material</p>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="container mx-auto p-10 bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px]">
            <CardHeader className="flex justify-between flex-row gap-5">
              <CardTitle>Material Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                        className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                        className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                        className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            {/* <FormError message={error} />
              <FormSuccess message={success} /> */}
          </Card>
          <div className="flex flex-row gap-4 justify-end items-center">
            <Button
              type="button"
              variant={"gradient"}
              className=" rounded-[5px]  border-[2px] flex flex-row items-center text-white  hover:text-white  transition-all duration-250"
            >
              <Link href={"/dashboard/materials"}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              variant={"gradient"}
              className=" rounded-[5px]  border-[2px] flex flex-row items-center text-white  hover:text-white  transition-all duration-250"
            >
              Add Material
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddMaterialForm;
