"use client";

import { addMaterial } from "@/src/actions/materials";
import { Button } from "@/src/components/ui/button";

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
import ReactSelect from "react-select";
import { toast } from "sonner";


import { addRelicMaterials } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Food, Ingredient, Towns } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { foodSchema } from "@/src/schemas/admin/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { addFood, editFood } from "@/src/actions/food";
import Image from "next/image";

type props = {
    food: Food;
    ingredients: Ingredient[];
    foodIngredients: Food & {
        ingredients: Ingredient[]
    }
}

const EditFoodForm = ({ food, ingredients, foodIngredients} : props) => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);
  const router = useRouter();


  const ingredientOptions = ingredients?.map((ingredient) => ({
    name: ingredient.name,
    id: ingredient.id,
    imageUrl: ingredient.imageUrl ||"",
    location: ingredient.location,
    label: (
        <div className="flex flex-row gap-3 items-center">
            <Image 
            src={ingredient.imageUrl || ""}
            alt={ingredient.name ?? "Ingredient"}
            width={30}
            height={30}
            />
            {ingredient.name}
        </div>
    ),
    value: ingredient.id
  }))  || []


  const defaultSelectIngredients = foodIngredients?.ingredients.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
    imageUrl: ingredient.imageUrl ||"",
    label: (
        <div className="flex flex-row items-center gap-3">
<Image 
            src={ingredient.imageUrl || ""}
            alt={ingredient.name ?? "Ingredient"}
            width={30}
            height={30}
            />
            {ingredient.name}
        </div>
    ),
    value: ingredient.id
  })) || []


  const form = useForm<z.infer<typeof foodSchema>>({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      name: food.name,
      imageUrl: food.imageUrl,
      location: food.location,
      effect: food.effect ?? undefined,
      ingredients:  defaultSelectIngredients,
    },
  });



  const onSubmit = (values: z.infer<typeof foodSchema>) => {
    startTransition(() => {
        const formattedValues = {
            ...values,
            ingredients: values.ingredients?.map(ingredient => ({
                ...ingredient,
                imageUrl: ingredient.imageUrl || ''
            }))
    }
      editFood(formattedValues, food.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.error("An error has occured",{
              description: data.error,
              className: "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white"
            });
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            toast.success("Form submitted",{
       
              description: data.success,
              className: "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white"
      
            });
            setTimeout(() => {
              router.push('/dashboard/food')
            }, 1500)
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
              variant="outline"
              size="icon"
              className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
              asChild
            >
              <Link href={"/dashboard/gifts"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight font-bold text-white">
                Edit {food.name}
              </h1>
              <p>Add a new gift</p>
            </div>
          </div>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
      <CardHeader className="flex justify-between flex-row gap-5">
        <CardTitle>
          Gift Information
        </CardTitle>
    
      </CardHeader>
          <CardContent className="space-y-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gift Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                      type="text"
                      disabled={isPending}
                      className="border-purple-900 rounded-[5px] bg-purple-600 border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

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
                  <FormLabel>Gift Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="image URL"
                      type="text"
                      disabled={isPending}
                      className="border-purple-900 rounded-[5px] bg-purple-600 border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
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
                  <FormLabel>Gift Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Location"
                      type="text"
                      disabled={isPending}
                      className="border-purple-900 rounded-[5px] bg-purple-600 border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

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
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                      className="border-purple-900 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 "
                      >
                            <SelectValue placeholder="Select the role for the user!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-purple-600  text-white dark:bg-purple-800">
                        <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={Towns.Dalmally}>Dalmally</SelectItem>
                          
                          <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={Towns.LionesCastle}>Liones Castle</SelectItem>
      
                          <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={Towns.OrdanVillage}>Ordan Village</SelectItem>
                          
                          <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={Towns.PostTownTala}>Post Town Tala</SelectItem>
                          
                          <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={Towns.Vanya}>Vanya</SelectItem>
                          
                          <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={Towns.Vaziel}>Vaziel</SelectItem>
                        </SelectContent>
                      </Select>
                  <FormDescription>The food&apo;s location</FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Characters</FormLabel>
                      <ReactSelect
                        name="ingredients"
                        isMulti
                        className="text-black bg-blue"
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
          {/* <FormError message={error} />
              <FormSuccess message={success} /> */}
                        </Card>
                      <div className="flex flex-row gap-4 justify-end items-center">
              <Button
                type="button"
                className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 rounded-[5px] hover:bg-purple-600 border-[2px] flex flex-row items-center text-white  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >
                <Link href={"/dashboard/food"}>Cancel</Link>
              </Button>
              <Button
                type="submit"
className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 rounded-[5px] hover:bg-purple-600 border-[2px] flex flex-row items-center text-white  hover:text-white dark:bg-purple-700 transition-all duration-250"              >
                Save Changes
              </Button>
            </div>
        </form>
      </Form>
    </div>
  );
};

export default EditFoodForm;
