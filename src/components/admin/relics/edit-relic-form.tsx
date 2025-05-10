"use client";

import { addHolyRelic, adminSchema, editHolyRelic } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../../ui/separator";
import ReactSelect from "react-select";
import { addRelic, editRelic } from "@/src/actions/relics";
import { Beast, Character, HolyRelic, Material } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { ReactElement, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useToast } from "../../ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { ArrowLeft, CalendarIcon, MoveLeft } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { cn } from "@nextui-org/react";
import { format } from "date-fns";

interface RelicInterface {
  characters?: Character[] | null;
  materials?: Material[] | null;
  relic: HolyRelic;
  relicMaterials?: HolyRelic & {
    materials: Material[];
    characters: Character[];
  };
}



function EditRelicForm({ characters, materials, relic, relicMaterials }: RelicInterface) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);



//   <div className="flex flex-row gap-3 items-center">
//   <Image
//     src={material.imageUrl}
//     alt={material.name}
//     height={30}
//     width={30}
//   />
//   {material.name}
// </div>

  // Prepare material options for React Select
  const materialOptions = materials?.map((material) => ({
    id: material.id,
    name: material.name,
    imageUrl: material.imageUrl,
    label: (
          <div className="flex flex-row gap-3 items-center">
  <Image
    src={material.imageUrl}
    alt={material.name}
    height={30}
    width={30}
  />
  {material.name}
</div>
    ),
    value: material.id,
  })) || [];

  // Prepare default selected materials
  const defaultSelectedMaterials = relicMaterials?.materials.map((material) => ({
    id: material.id,
    name: material.name,
    imageUrl: material.imageUrl,
    label: (
          <div className="flex flex-row gap-3 items-center">
  <Image
    src={material.imageUrl}
    alt={material.name}
    height={30}
    width={30}
  />
  {material.name}
</div>
    ),
    value: material.id,
  })) || [];


  const characterOptions = characters?.map((character) => {
    const uniqueValue = character.id ? `${character.id}` : `${character.name || 'no-name'}-${character.tag || 'no-tag'}`; // Handle null name for uniqueValue
    const description = `${character.name || 'Unknown Character'} (${character.tag || 'No Tag'})`; // Handle null name for description
  
    return {
      name: character.name as string,
      characterId: character.id,
      imageUrl: character.imageUrl,
      slug: character.slug as string,
      tag: character.tag as string,
      value: uniqueValue,
      description: description,
      label: (
        <div className="flex flex-row gap-2 items-center">
          <Image
            src={character.imageUrl}
            alt={character.name ?? "Unknown Character"} // Use nullish coalescing for alt
            height={30}
            width={30}
          />
          <p>{character.name || 'Unknown Character'}</p> {/* Handle null name in label */}
          <p className="text-xs">{character.tag || 'No Tag'}</p>
        </div>
      ),
      id: character.id // Optionally include the original id
    };
  }) || [];
  
  const defaultSelectedCharacters = relicMaterials?.characters?.map((character) => {
      const uniqueValue = character.id ? `${character.id}` : `${character.name || 'no-name'}-${character.tag || 'no-tag'}`; // Handle null name for uniqueValue
      const description = `${character.name || 'Unknown Character'} (${character.tag || 'No Tag'})`; // Handle null name for description
  
      return {
        name: character.name as string,
        characterId: character.id,
        imageUrl: character.imageUrl,
        slug: character.slug as string,
        tag: character.tag as string,
        value: uniqueValue,
        description: description,
        label: (
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={character.imageUrl}
              alt={character.name ?? "Unknown Character"} // Use nullish coalescing for alt
              height={30}
              width={30}
            />
            <p>{character.name || 'Unknown Character'}</p> {/* Handle null name in label */}
            <p className="text-xs">{character.tag || 'No Tag'}</p>
          </div>
        ),
         id: character.id // Optionally include the original id
      };
    }) || [];
       

  console.log("Characters", characterOptions)
  console.log("Default Form Values", defaultSelectedCharacters)

  const form = useForm<z.infer<typeof editHolyRelic>>({
    resolver: zodResolver(editHolyRelic),
    defaultValues: {
        ...relic,
      materials: defaultSelectedMaterials,
      characters: defaultSelectedCharacters
    },
  });

  


  useEffect(() => {
    console.log("Form state errors:", form.formState.errors);
  }, [form.formState.errors]);

  
  const { toast } = useToast();
  const { update } = useSession();

  const onSubmit = (values: z.infer<typeof editHolyRelic>) => {
    startTransition(() => {
      const formattedValues = {
        ...values,
        materials: values.materials?.map(material => ({
          ...material,
          imageUrl: material.imageUrl || '' // Ensure imageUrl is always a string
        })),
        characters: values.characters?.map((char) => ({
          ...char,
          imageUrl: char.imageUrl || ""
        }))
      };
      editRelic(formattedValues, relic.id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "purple",
            });
          }

          if (data?.success) {
            update();

            setSuccess(data.success);
            toast({
              title: "Success!",
              description: data.success,
              variant: "purple",
            });
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
    <div>
    <div className="flex justify-between flex-row items-center pb-5 gap-5">
       <div className="flex gap-2 items-center">
       <Button variant="outline" size="icon" className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250" asChild>
                        <Link href={"/dashboard/relics"}>
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Link>
                    </Button>

       <div className="flex flex-col">
        <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
          Edit Relic
        </h1>
        <p className="text-gray-500 dark:text-gray-300">Update info for {relic.name}</p>
        </div>
       </div>
      </div>
    </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Card className="container mx-auto p-10 rounded-[5px] bg-purple-400 dark:bg-purple-700 border-0">
          <CardHeader>
            <CardTitle>
              Relic Information
            </CardTitle>
            <CardDescription className="text-gray-500 dark:text-gray-300">Update the info for this relic.</CardDescription>
            
          </CardHeader>
         <CardContent className="space-y-4">
         <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Relic Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Name"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

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
                  <FormLabel className="text-white">Relic Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Image URL"
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
              name="effect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Relic Effect</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Effect"
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
              name="beast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Beast</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="dark:bg-purple-800 bg-purple-600 rounded-[5px] text-white">
                        <SelectValue placeholder="Select the relics beast" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent className="dark:bg-purple-800 bg-purple-600 rounded-[5px] text-white">
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950 rounded-[5px]"
                      value={Beast.Hraesvelgr}>
                        Hraesvelgr (Bird)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950 rounded-[5px]"
                      
                      value={Beast.Eikthyrnir}>
                        Eikthyrnir (Deer)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950 rounded-[5px]"
                      
                      value={Beast.SkollAndHati}>
                        Skoll And Hati (Dogs)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950 rounded-[5px]"
                      
                      value={Beast.Nidhoggr}>
                        Nidhoggr (Snake)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950 rounded-[5px]"
                      
                      value={Beast.Ratatoskr}>Ratatoskr</SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950 rounded-[5px]"
                      
                      value={Beast.Collab}>Collab</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="attack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Attack</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Attack Stat"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="defense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Relic Defense Stat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Defense Stat"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{" "}
            <FormField
              control={form.control}
              name="hp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Relic HP Stat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic HP Stat"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
          <FormField
              control={form.control}
              name="releaseDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Character Added Date</FormLabel>
                  <Popover>
                    <PopoverTrigger className="bg-purple-600 dark:bg-purple-800 rounded-[5px]" asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {" "}
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="bg-purple-600 dark:bg-purple-800 text-white"
                        disabled={(releaseDate: Date) =>
                          releaseDate > new Date() ||
                          releaseDate < new Date("1900-01-01") ||
                          isPending
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="materials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Materials</FormLabel>
                  <ReactSelect
                    name="materials"
                    isMulti
                    className="text-black bg-background"
                    options={materialOptions}
                    isSearchable={isSearchable}
                    value={field.value}
                    isDisabled={isPending || !materials?.length}
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions.map((option) => ({
                          ...option
                        }))
                      );
                    }}
                    placeholder={
                      (materials?.length ?? 0) >= 1
                        ? "Select materials!"
                        : "No materials Available!"
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="characters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Characters</FormLabel>
                  <ReactSelect
                    name="characters"
                    isMulti
                    className="text-black bg-background"
                    options={characterOptions}
                    isSearchable={isSearchable}
                    value={field.value}
                    isDisabled={isPending || !characters?.length}
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions.map((option) => ({
                          ...option
                        }))
                      );
                    }}
                    placeholder={
                      (characters?.length ?? 0) >= 1
                        ? "Select characters!"
                        : "No characters Available!"
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
              <Button type="button" className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >
                <Link href={"/dashboard/relics"}>Cancel</Link>
              </Button>
              <Button type="submit" className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >Save Changes</Button>
              </div>
        </form>
      </Form>
    </div>

  );
}

export default EditRelicForm;
