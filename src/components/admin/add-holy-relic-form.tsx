"use client";

import { addHolyRelic, adminSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "../ui/separator";

import ReactSelect from "react-select";

import { addRelic } from "@/src/actions/relics";
import { Beast, Character, Materials } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useToast } from "../ui/use-toast";

interface RelicInterface {
  characters?: Character[];
  materials?: Materials[];
}

function AddRelicForm({ characters, materials }: RelicInterface) {
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

  const materialOptions = materials?.map((material) => ({
    id: material.id,
    name: material.name,
    imageUrl: material.imageUrl,
    value: material.name,
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
  }));

  const form = useForm<z.infer<typeof addHolyRelic>>({
    resolver: zodResolver(addHolyRelic),
    defaultValues: {
      name: undefined,
      imageUrl: undefined,
      effect: undefined,
      beast: Beast.Hraesvelgr,
      attack: undefined,
      defense: undefined,
      hp: undefined,
      materials: [],
      characters: []
    },
  });

  const { toast } = useToast();
  const { update } = useSession();

  const onSubmit = (values: z.infer<typeof addHolyRelic>) => {
    startTransition(() => {
      console.log("Called")
      console.log(values);
      addRelic(values)
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
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between gap-5 items-center pb-10">
            <h1 className="text-3xl leading-tight font-extrabold pb-3">
              Add Relic
            </h1>
            <Button variant="outline" size="sm" asChild>
              <Link href={"/admin/relics"}>Go Back</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relic Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Name"
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
                  <FormLabel>Relic Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Image URL"
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
              name="effect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relic Effect</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Effect"
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
              name="beast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beast</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the relics beast" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={Beast.Hraesvelgr}>
                        Hraesvelgr (Bird)
                      </SelectItem>
                      <SelectItem value={Beast.Eikthyrnir}>
                        Eikthyrnir (Deer)
                      </SelectItem>
                      <SelectItem value={Beast.SkollAndHati}>
                        Skoll And Hati (Dogs)
                      </SelectItem>
                      <SelectItem value={Beast.Nidhoggr}>
                        Nidhoggr (Snake)
                      </SelectItem>
                      <SelectItem value={Beast.Ratatoskr}>Ratatoskr</SelectItem>
                      <SelectItem value={Beast.Collab}>Collab</SelectItem>
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
                  <FormLabel>Attack</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Attack Stat"
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
                  <FormLabel>Relic Defense Stat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic Defense Stat"
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
                  <FormLabel>Relic HP Stat</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Relic HP Stat"
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
                  <FormLabel>Materials</FormLabel>
                  <ReactSelect
                    name="materials"
                    isMulti
                    className="text-black bg-background"
                    options={materialOptions}
                    isSearchable={isSearchable}
                    isDisabled={isPending || !materials?.length}
                    onChange={(selectedOptions) => {
                      field.onChange(
                        selectedOptions.map((option) => ({
                          id: option.id,
                          name: option.name,
                          imageUrl: option.imageUrl,
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
                  <FormLabel>Characters</FormLabel>
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
          <Separator className="my-4 dark:bg-white bg-black" />

          <Button type="submit">Add Relic</Button>
        </form>
      </Form>
    </div>
  );
}

export default AddRelicForm;
