"use client";

import { addRelic } from "@/src/actions/relics";
import { addHolyRelic } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@nextui-org/react";
import {
  Beast,
  Character,
  Material,
  RelicEnhanceMaterial,
} from "@prisma/client";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";

interface RelicInterface {
  characters?: Character[];
  materials?: Material[];
  enhanceMaterials: RelicEnhanceMaterial[];
}

function AddRelicForm({
  characters,
  materials,
  enhanceMaterials,
}: RelicInterface) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);
  const [isEnhancable, setIsEnhancable] = useState(false);

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
        {character.name} {character.tag}
      </div>
    ),
  }));

  const enhanceMaterialsOptions = enhanceMaterials?.map((enhanceMaterial) => ({
    id: enhanceMaterial.id,
    name: enhanceMaterial.name,
    imageUrl: enhanceMaterial.imageUrl,
    value: enhanceMaterial.name,
    label: (
      <div className="flex flex-row gap-3 items-center">
        <Image
          src={enhanceMaterial.imageUrl}
          alt={enhanceMaterial.name}
          height={30}
          width={30}
        />
        {enhanceMaterial.name}
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
      releaseDate: undefined,
      materials: [],
      characters: [],
      enhancable: false,
      enhanceAttack: undefined,
      enhanceDefense: undefined,
      enhanceHp: undefined,
      enhanceMaterials: [],
    },
  });

  const { update } = useSession();
  const router = useRouter();

  const enhanceChange = () => {
    setIsEnhancable(!isEnhancable);
  };

  const onSubmit = (values: z.infer<typeof addHolyRelic>) => {
    values.enhancable = isEnhancable;
    startTransition(() => {
      addRelic(values)
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
              router.push("/dashboard/relics");
            }, 1500);
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
            <Button
              size="icon"
              variant="gradient"
              className=" border-[2px]  hover:text-white  transition-all duration-250"
              asChild
            >
              <Link href={"/dashboard/relics"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
                Add Relic
              </h1>
              <p>Add a new relic</p>
            </div>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="container rounded-[5px] mx-auto p-10 bg-purple-400 dark:bg-purple-700 border-0">
            <CardHeader>
              <CardTitle>Relic Information</CardTitle>
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
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                      <FormLabel className="text-white">
                        Relic Image URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                      <FormLabel className="text-white">Relic Effect</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                      <FormLabel className="text-white">Beast</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950 ">
                            <SelectValue placeholder="Select the relics beast" />
                          </SelectTrigger>
                        </FormControl>
                        <FormMessage />

                        <SelectContent className="bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border rounded-[5px] text-white">
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Beast.Hraesvelgr}
                          >
                            Hraesvelgr (Bird)
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Beast.Eikthyrnir}
                          >
                            Eikthyrnir (Deer)
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Beast.SkollAndHati}
                          >
                            Skoll And Hati (Dogs)
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Beast.Nidhoggr}
                          >
                            Nidhoggr (Snake)
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Beast.Ratatoskr}
                          >
                            Ratatoskr
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={Beast.Collab}
                          >
                            Collab
                          </SelectItem>
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
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                      <FormLabel className="text-white">
                        Relic Defense Stat
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                      <FormLabel className="text-white">
                        Relic HP Stat
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
              <div>
                <FormField
                  control={form.control}
                  name="releaseDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Relic Added Date</FormLabel>
                      <Popover>
                        <PopoverTrigger
                          className="bg-background border-border border-[2px] w-full rounded-[5px]"
                          asChild
                        >
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left !border-purple-900  font-normal",
                              !field.value && "text-white"
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
                            className="bg-background border-border rounded-[12px]  text-white"
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
                        className="text-black"
                        options={materialOptions}
                        isSearchable={isSearchable}
                        isDisabled={isPending || !materials?.length}
                        onChange={(selectedOptions: any) => {
                          field.onChange(
                            selectedOptions.map((option: any) => ({
                              id: option.id,
                              name: option.name,
                              imageUrl: option.imageUrl,
                            }))
                          );
                          console.log(selectedOptions);
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
                        className="text-black bg-blue"
                        options={characterOptions}
                        isSearchable={isSearchable}
                        isDisabled={isPending || !characters?.length}
                        onChange={(selectedOptions: any) => {
                          field.onChange(
                            selectedOptions.map((option: any) => ({
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
              <FormField
                control={form.control}
                name="enhancable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Enhancable</FormLabel>
                      <FormDescription>
                        Select if a relic is enhancable or not.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={isEnhancable}
                        onCheckedChange={enhanceChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {isEnhancable == true && (
                <>
                  <FormField
                    control={form.control}
                    name="enhanceMaterials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">
                          Enhance Materials
                        </FormLabel>
                        <ReactSelect
                          name="enhanceMaterials"
                          isMulti
                          className="text-black"
                          options={enhanceMaterialsOptions}
                          isSearchable={isSearchable}
                          isDisabled={isPending || !enhanceMaterials?.length}
                          onChange={(selectedOptions: any) => {
                            field.onChange(
                              selectedOptions.map((option: any) => ({
                                id: option.id,
                                name: option.name,
                                imageUrl: option.imageUrl,
                              }))
                            );
                            console.log(selectedOptions);
                          }}
                          placeholder={
                            (enhanceMaterials?.length ?? 0) >= 1
                              ? "Select materials!"
                              : "No enhnace materials Available!"
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="enhanceAttack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Enhance Attack
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                              placeholder="Enhance Attack"
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
                      name="enhanceDefense"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Enhance Defense
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                              placeholder="Enhance Defense"
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
                      name="enhanceHp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Enhance HP
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                              placeholder="Enhance HP"
                              type="text"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <div className="flex flex-row gap-4 justify-end items-center">
            <Button
              type="button"
              variant={"gradient"}
              className="text-white rounded-[5px]  border-[2px] flex flex-row items-center  hover:text-white  transition-all duration-250"
            >
              <Link href={"/dashboard/relics"}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              variant={"gradient"}
              className="text-white rounded-[5px]  border-[2px] flex flex-row items-center  hover:text-white  transition-all duration-250"
            >
              Add Relic
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddRelicForm;
