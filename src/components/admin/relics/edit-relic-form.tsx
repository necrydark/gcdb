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
import React, { useState, useTransition } from "react";
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
import { Card } from "../../ui/card";
import { ArrowLeft, MoveLeft } from "lucide-react";

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


  const characterOptions = characters?.map((character) => ({
    name: character.name,
    characterId: character.id,
    imageUrl: character.imageUrl,
    slug: character.slug,
    value: character.name,
    description: character.name,
    label: (
      <div className="flex flex-row gap-3 items-center">
        <Image
          src={character.imageUrl}
          alt={character.name ?? ""}
          height={30}
          width={30}
        />
        {character.name}
      </div>
    ),
  }));


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


  const form = useForm<z.infer<typeof editHolyRelic>>({
    resolver: zodResolver(editHolyRelic),
    defaultValues: {
        ...relic,
      materials: defaultSelectedMaterials,
      characters: []
    },
  });

  relicMaterials?.materials.map((material) => console.log(material.name))
  



  const { toast } = useToast();
  const { update } = useSession();

  const onSubmit = (values: z.infer<typeof editHolyRelic>) => {
    startTransition(() => {
      const formattedValues = {
        ...values,
        materials: values.materials?.map(material => ({
          ...material,
          imageUrl: material.imageUrl || '' // Ensure imageUrl is always a string
        }))
      };
      editRelic(formattedValues, relic.id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "destructive",
            });
          }

          if (data?.success) {
            update();

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
    <>
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
      <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 border-0">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col pb-10">
            <h1 className="text-3xl leading-tight text-white font-extrabold">
              Relic Information
            </h1>
            <p className="text-gray-500 dark:text-gray-300">Update the info for this relic.</p>
            
          </div>
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
                      <SelectTrigger className="dark:bg-purple-800 bg-purple-600 text-white">
                        <SelectValue placeholder="Select the relics beast" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent className="dark:bg-purple-800 bg-purple-600 text-white">
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950"
                      value={Beast.Hraesvelgr}>
                        Hraesvelgr (Bird)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950"
                      
                      value={Beast.Eikthyrnir}>
                        Eikthyrnir (Deer)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950"
                      
                      value={Beast.SkollAndHati}>
                        Skoll And Hati (Dogs)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950"
                      
                      value={Beast.Nidhoggr}>
                        Nidhoggr (Snake)
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950"
                      
                      value={Beast.Ratatoskr}>Ratatoskr</SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-700 dark:hover:bg-purple-950"
                      
                      value={Beast.Collab}>Collab</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
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
                    isDisabled={isPending || !characters?.length}
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions.map((option) => ({
                          id: option.characterId,
                          name: option.name,
                          imageUrl: option.imageUrl,
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

          <div className="flex flex-row gap-4 justify-end items-center">
              <Button type="button"                   className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >
                <Link href={"/dashboard/relics"}>Cancel</Link>
              </Button>
              <Button type="submit"                   className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >Save Changes</Button>
              </div>
        </form>
      </Form>
      </Card>
    </>

  );
}

export default EditRelicForm;
