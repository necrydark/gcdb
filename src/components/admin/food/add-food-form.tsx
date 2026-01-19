"use client";

import { Button } from "@/src/components/ui/button";

import { addFood } from "@/src/actions/food";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { foodSchema } from "@/src/schemas/admin/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ingredient, Towns } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { toast } from "sonner";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface FoodInterface {
  ingredients: Ingredient[];
}

const AddFoodForm = ({ ingredients }: FoodInterface) => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);
  const router = useRouter();

  const ingredientOptions = ingredients?.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
    imageUrl: ingredient.imageUrl,
    value: ingredient.name,
    label: (
      <div className="flex flex-row gap-3 items-center">
        <Image
          src={ingredient.imageUrl || ""}
          alt={ingredient.name}
          width={30}
          height={30}
        />
        {ingredient.name}
      </div>
    ),
  }));

  const form = useForm<z.infer<typeof foodSchema>>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      location: "Vanya",
      effect: "",
      ingredients: [],
    },
  });

  const onSubmit = (values: z.infer<typeof foodSchema>) => {
    startTransition(() => {
      addFood(values)
        .then((data) => {
          console.log("Data from food", data);
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
              router.push("/dashboard/food");
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
            type="button"
            variant="gradient"
            className=" border-[2px]  hover:text-white  transition-all duration-250"
            asChild
          >
            <Link href={"/dashboard/food"}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div className="flex flex-col">
            <h1 className="text-2xl leading-tight font-bold text-white">
              Add Food
            </h1>
            <p>Add a new food</p>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="container mx-auto p-10 bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px]">
            <CardHeader className="flex justify-between flex-row gap-5">
              <CardTitle>Food Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Name"
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
                      <FormLabel>Food Image URL</FormLabel>
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
              </div>
              <FormField
                control={form.control}
                name="effect"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food Effect</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Effect"
                        type="text"
                        disabled={isPending}
                        className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Town</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950 ">
                            <SelectValue placeholder="Select the location for the food!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border rounded-[5px] text-white">
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Towns.Dalmally}
                          >
                            Dalmally
                          </SelectItem>

                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Towns.LionesCastle}
                          >
                            Liones Castle
                          </SelectItem>

                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Towns.OrdanVillage}
                          >
                            Ordan Village
                          </SelectItem>

                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Towns.PostTownTala}
                          >
                            Post Town Tala
                          </SelectItem>

                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Towns.Vanya}
                          >
                            Vanya
                          </SelectItem>

                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Towns.Vaziel}
                          >
                            Vaziel
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The food&apos;s location
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Ingredients</FormLabel>
                      <ReactSelect
                        name="ingredients"
                        isMulti
                        className="text-black"
                        options={ingredientOptions}
                        isSearchable={isSearchable}
                        isDisabled={isPending || !ingredients?.length}
                        onChange={(selectedOptions: any) => {
                          field.onChange(
                            selectedOptions.map((option: any) => ({
                              id: option.id,
                              name: option.name,
                              imageUrl: option.imageUrl,
                            }))
                          );
                        }}
                        placeholder={
                          (ingredients?.length ?? 0) >= 1
                            ? "Select ingredients!"
                            : "No ingredients Available!"
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex flex-row gap-4 justify-end items-center">
            <Button
              type="button"
              variant={"gradient"}
              className=" rounded-[5px]  border-[2px] flex flex-row items-center text-white  hover:text-white  transition-all duration-250"
            >
              <Link href={"/dashboard/food"}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              variant={"gradient"}
              className=" rounded-[5px]  border-[2px] flex flex-row items-center text-white  hover:text-white  transition-all duration-250"
            >
              Add Food
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddFoodForm;
