"use client";

import { addCharacter } from "@/src/actions/add-character";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { UploadButton } from "@/src/lib/uploadthing";
import { cn } from "@/src/lib/utils";
import { addCharacterSchema, addNewUserSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Association,
  AssociationWith,
  Attribute,
  Beast,
  Character,
  Crossovers,
  Food,
  Game,
  GameEvent,
  Genders,
  Gift,
  HolyRelic,
  Race,
  Rarity,
  StatLevel,
} from "@prisma/client";

import { Trash } from "lucide-react";
import cuid from "cuid";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import * as z from "zod";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Separator } from "@/src/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

interface FormProps {
  Gifts?: Gift[];
  Foods?: Food[];
  Associations?: Association[];
  AssociatedWith?: AssociationWith[];
  Characters?: Character[];
  Relics?: HolyRelic[];
}

interface AssociatedWithFormData {
  characterId: string;
  slug: string | null;
  tag: string | null;
  bonus: string;
  // Include display fields for convenience
  name: string | null;
  imageUrl: string;
}

// interface AssociatedWithOptions {
//   value: string; // Using character ID as value
//   label: JSX.ReactElement; // Your custom label with image
//   characterId: string;
//   imageUrl: string;
//   slug: string | null;
//   tag: string | null;
//   name: string | null;
// }

function AddCharacterForm({
  Gifts,
  Foods,
  Associations,
  AssociatedWith,
  Characters,
  Relics
}:
FormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [slug, setSlug] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);
  const [open, setOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false)
  const [relicValue, setRelicValue] = useState("")
  const [giftValue, setGiftValue] = useState("")
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState("basic");
  


  const GiftOptions = Gifts?.map((gift) => ({
    id: gift.id,
    name: gift.name,
    imageUrl: gift.imageUrl,
    description: gift.description,
    value: gift.name,
    label: (
      <div className="flex flex-row gap-3 items-center">
        <Image src={gift.imageUrl} alt={gift.name} height={30} width={30} />
        {gift.name}
      </div>
    ),
  }));

  const FoodOptions = Foods?.map((food) => ({
    id: food.id,
    name: food.name,
    imageUrl: food.imageUrl,
    value: food.name,
    description: food.name,
    label: (
      <div className="flex flex-row gap-3 items-center">
        <Image src={food.imageUrl} alt={food.name} height={30} width={30} />
        {food.name}
      </div>
    ),
  }));

  const AssociationsOptions = Characters?.map((character) => ({
    name: character.name,
    characterId: character.id,
    imageUrl: character.imageUrl,
    slug: character.slug,
    value: character.name,
    description: character.name,
    tag: character.tag,
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

  // const AssociatedWithOptions: AssociatedWithOptions[] | undefined = Characters?.map((character) => ({
  //   name: character.name ?? "",
  //   characterId: character.id,
  //   imageUrl: character.imageUrl,
  //   slug: character.slug  ?? "",
  //   value: character.name ?? "",
  //   description: character.name ?? "",
  //   tag: character.tag ?? "",
  //   label: (
  //     <div className="flex flex-row gap-3 items-center">
  //       <Image
  //         src={character.imageUrl}
  //         alt={character?.name ?? ""}
  //         height={30}
  //         width={30}
  //       />
  //       {character.name}
  //     </div>
  //   ),
  // }));

  const form = useForm<z.infer<typeof addCharacterSchema>>({
    resolver: zodResolver(addCharacterSchema),
    defaultValues: {
      id: undefined,
      name: undefined,
      tag: undefined,
      jpName: undefined,
      jpTag: undefined,
      slug: undefined,
      imageUrl: undefined,
      releaseDate: undefined,
      game: Game.Base,
      crossover: Crossovers.NotCrossover,
      race: Race.Human,
      attribute: Attribute.HP,
      rarity: Rarity.SSR,
      stats: [
        {
          level: StatLevel.LEVEL_100,
          attack: undefined,
          combatClass: undefined,
          critChance: undefined,
          critDamage: undefined,
           critDefense: undefined,
           critResistance: undefined,
           defense: undefined,
           hp: undefined,
           lifesteal: undefined,
           pierceRate: undefined,
           recoveryRate: undefined,
           regeneration: undefined,
           resistance: undefined,
        }
      ],
      gender: Genders.Male,
      bloodType: undefined,
      age: undefined,
      birthday: undefined,
      height: undefined,
      weight: undefined,
      passiveName: undefined,
      passiveImageUrl: undefined,
      passiveJpName: undefined,
      passiveCCNeeded: undefined,
      passiveDescription: undefined,
      holyRelicId: undefined,
      gifts: undefined,
      food: [],
      skills: [
        {
          name: "",
          jpName: "",
          imageUrl: "",
          skillRanks: [
            { rank: 1, description: "", type: "" },
            { rank: 2, description: "", type: "" },
            { rank: 3, description: "", type: "" },
          ],
        },
        {
          name: "",
          jpName: "",
          imageUrl: "",
          skillRanks: [
            { rank: 1, description: "", type: "" },
            { rank: 2, description: "", type: "" },
            { rank: 3, description: "", type: "" },
          ],
        },
      ],
      characterUltimate: {
        name: undefined,
        jpName: undefined,
        imageUrl: undefined,
        description: undefined,
        extraInfo: undefined,
        characterId: undefined,
      },
      associations: [],
      associationsWith: [],
      // holyRelic: [
      //   {
      //     name: undefined,
      //     effect: undefined,
      //     characterId: undefined,
      //   },
      // ],
      event: GameEvent.None,
      
    },
  });

  const {
      fields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "associationsWith",
  });

  const {
    fields: statFields,
    append: statAppend,
    remove: statRemove
  } = useFieldArray({
    control: form.control,
    name: "stats"
  });

const max_stats = 3;

  const handleAddStat = () => {
    if(statFields.length < max_stats) {
      statAppend({
        level: StatLevel.LEVEL_100,
        combatClass: 0,
        attack: 0,
        defense: 0,
        hp: 0,
        pierceRate: 0.00,
        resistance: 0.00,
        regeneration: 0.00,
        critChance: 0.00,
        critDamage: 0.00,
        critResistance: 0.00,
        critDefense: 0.00,
        recoveryRate: 0.00,
        lifesteal: 0.00,
      })
    }
  }

  const handleRemoveStat = (idx: number) => {
    statRemove(idx);
  }

  const { toast } = useToast();
  const { update } = useSession();

  const onSubmit = (values: z.infer<typeof addCharacterSchema>) => {
    console.log("called")
    values.slug = slug;
    startTransition(() => {
      addCharacter(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "purple",
            });
          }
          if (data.success) {
            update();
            form.reset();
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
    console.log("error?")
  };

  function generateSlug() {
    const tag = form.getValues("tag");
    const slug = tag?.toLowerCase().split(" ").join("-");
    setSlug(slug);
  }

  // const handleAssociationWithSelect = (selectedOptions: any) => {
  //   const currentCharacterIds = fields.map(field => (field as AssociatedWithFormData).characterId);
  //   const selectedCharacterIds = selectedOptions.map((option: AssociatedWithOptions) => option.characterId);

  //   fields.forEach((field, idx) => {
  //     if(!selectedCharacterIds.includes((field as AssociatedWithFormData).characterId)) {
  //       remove(idx);
  //     }
  //   });

  //   selectedOptions.forEach((option: AssociatedWithOptions) => {
  //     if(!currentCharacterIds.includes(option.characterId)) {
  //       append({
  //         characterId: option.characterId,
  //         slug: option.slug ?? "",
  //         tag: option.tag ?? "",
  //         bonus: '', // Initialize bonus as empty
  //         name: option.name ?? "", // Include display fields
  //         imageUrl: option.imageUrl,
  //       }) 
  //     }
  //   })
  // }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <div className="flex justify-between flex-row items-center pb-5 gap-5">
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="icon"
              className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
              asChild
            >
              <Link href={"/dashboard/characters"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
                Add Character
              </h1>
              <p className="text-gray-300">
                Add a new character
              </p>
            </div>
          </div>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid md:grid-cols-5 grid-cols-1 mb-8 h-full">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Character Details</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="basic" className="space-y-6">
              <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Enter the basic information about the character.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>English Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Character name"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jpName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Japanese Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Japanese name"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="tag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>English Tag</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Character tag"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jpTag"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Japanese Tag</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Japanese tag"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center  flex-row gap-6">
                          <FormLabel>Slug</FormLabel>
                          <Button
                                onClick={generateSlug}
                                type="button"
                                className=" bg-transparent hover:bg-transparent !p-0 h-full text-white rounded-[5px]"
                              >
                                Generate Slug
                              </Button>
                          </div>
                          <FormControl>
                         
                              <Input
                                {...field}
                                placeholder="character-slug"
                                type="text"
                                disabled={isPending}
                                value={slug || ""}
                                onChange={generateSlug}
                                className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              />
                         
                          </FormControl>
                          <FormDescription>
                            URL-friendly version of the name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://example.com/image.jpg"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="race"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Race</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-purple-900 focus:ring-0 focus-visible:ring-0 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 ">
                                <SelectValue placeholder="Select the units race." />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent className="bg-purple-600 rounded-[5px] text-white dark:bg-purple-800">
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Race.Demon}
                              >
                                Demon
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Race.Fairy}
                              >
                                Fairy
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Race.Giant}
                              >
                                Giant
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Race.Goddess}
                              >
                                Goddess
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Race.Human}
                              >
                                Human
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Race.HumanGiant}
                              >
                                Human / Giant
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Race.Unknown}
                              >
                                Unknown
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="attribute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attribute</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0">
                                <SelectValue placeholder="Select the units attribute." />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent className="bg-purple-600 rounded-[5px]  text-white dark:bg-purple-800">
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Attribute.HP}
                              >
                                HP
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Attribute.Speed}
                              >
                                Speed
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Attribute.Strength}
                              >
                                Strength
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Attribute.Dark}
                              >
                                Dark
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Attribute.Light}
                              >
                                Light
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rarity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rarity</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0">
                                <SelectValue placeholder="Select the units rarity." />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent className="bg-purple-600 rounded-[5px]  text-white dark:bg-purple-800">
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Rarity.R}
                              >
                                R
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Rarity.SR}
                              >
                                SR
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Rarity.SSR}
                              >
                                SSR
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Rarity.UR}
                              >
                                UR
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Rarity.LR}
                              >
                                LR
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="game"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Race</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-purple-900 focus:ring-0 focus-visible:ring-0 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 ">
                                <SelectValue placeholder="Select the units game." />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent className="bg-purple-600 rounded-[5px] text-white dark:bg-purple-800">
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.Base}
                              >
                                Base
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.AOT}
                              >
                                Attack On Titan
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.KOF}
                              >
                                King Of Fighters
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.Mave}
                              >
                                MAVE:
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.Mushoku}
                              >
                                Mushoku Tensei
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.Overlord}
                              >
                                Overlord
                              </SelectItem>

                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.ReZero}
                              >
                                Re:Zero
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.ShieldHero}
                              >
                                Shield Hero
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.StrangerThings}
                              >
                                Stranger Things
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.TOG}
                              >
                                Tower Of God
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Game.Tensura}
                              >
                                Tensura
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="crossover"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Crossover</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0">
                                <SelectValue placeholder="Select if the unit is a crossover or not." />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent className="bg-purple-600 rounded-[5px]  text-white dark:bg-purple-800">
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Crossovers.NotCrossover}
                              >
                                Not Crossover
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Crossovers.Crossover}
                              >
                                Crossover
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="event"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0">
                                <SelectValue placeholder="Select the units event." />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent className="bg-purple-600 rounded-[5px]  text-white dark:bg-purple-800">
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={GameEvent.None}
                              >
                                None
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={GameEvent.Summer}
                              >
                                Summer
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={GameEvent.Christmas}
                              >
                                Christmas
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={GameEvent.Valentine}
                              >
                                Valentine
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="releaseDate"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormLabel>Character Release Date</FormLabel>
                          <Popover>
                            <PopoverTrigger
                              className="bg-purple-600 dark:bg-purple-800 border-purple-900 border-[2px] w-full rounded-[5px]"
                              asChild
                            >
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "pl-3 w-full text-left font-normal",
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                className="bg-purple-600 dark:bg-purple-800 rounded-[12px]  text-white"
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
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="space-y-6">
            <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle>Character Details</CardTitle>
                  <CardDescription>
                  Enter additional details about the character.
                  </CardDescription>
                </CardHeader> 
                <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Type</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="A, B, AB, O, etc."
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Character age"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birthday</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="January 1"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="height"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Height</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="175cm"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="70kg"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
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
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Character location"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0">
                                <SelectValue placeholder="Select the units gender." />
                              </SelectTrigger>
                            </FormControl>
                            <FormMessage />

                            <SelectContent className="bg-purple-600 rounded-[5px]  text-white dark:bg-purple-800">
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Genders.Male}
                              >
                                Male
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Genders.Female}
                              >
                                Female
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Genders.Unknown}
                              >
                                Unknown
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="CV"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Voice Actor (CV)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Voice actor"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator />
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <FormField
                      control={form.control}
                      name="passiveName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passive Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Passive Name"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                            <FormField
                      control={form.control}
                      name="passiveJpName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passive Name (Japanese)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Japanese Passive Name"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <FormField
                      control={form.control}
                      name="passiveImageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passive Image URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://example.com/example.jpg"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                            <FormField
                      control={form.control}
                      name="passiveCCNeeded"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passive CC Needed</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="CC Needed to unlock"
                              type="text"
                              disabled={isPending}
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                          control={form.control}
                          name="passiveDescription"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Passive Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Description of the passive skill."
                                                          disabled={isPending}
                          className="border-purple-900 resize-none h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="stats" className="space-y-6">
           <Card className="container rounded-[5px] mx-auto p-10 bg-purple-400 dark:bg-purple-700 border-0">
                  <CardHeader>
                    <CardTitle>
                      Charater Skills
                    </CardTitle>
                    <CardDescription>Enter the characters skills and ranks.</CardDescription>
                  </CardHeader>
                  <CardContent >
                    {statFields.map((field, idx) => (
                      <div className="p-4 space-y-6" key={idx}>
                      <div className="flex flex-row justify-between items-center gap-4">
                      <h3 className="text-md font-medium">Stat {idx + 1}</h3>
                        {statFields.length > 1 && (
                <Button type="button" 
              className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
                
                onClick={() => handleRemoveStat(idx)}>
                  <Trash className="h-4 mr-2 w-4 " />
                  Remove Stat
                </Button>
              )}
                      </div>
                        <FormField
                control={form.control}
                name={`stats.${idx}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-purple-900 focus:ring-0 focus-visible:ring-0 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 ">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-purple-600 rounded-[5px] text-white dark:bg-purple-800">
                        {/* Map over your StatLevel enum */}
                        <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={StatLevel.LEVEL_1}
                              >
                                Level 1
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={StatLevel.LEVEL_100}
                              >
                                Level 100
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={StatLevel.SUPER_AWAKENING}
                              >
                                Super Awakening
                              </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
         <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
         <FormField
                control={form.control}
                name={`stats.${idx}.combatClass`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Combat Class</FormLabel>
                    <FormControl>
                      <Input type="number"
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      
                      {...field} onChange={event => field.onChange(parseInt(event.target.value, 10))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                   <FormField
                control={form.control}
                name={`stats.${idx}.attack`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attack</FormLabel>
                    <FormControl>
                      <Input type="number" {...field}
                      
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      onChange={event => field.onChange(parseInt(event.target.value, 10))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
         </div>
         <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
         <FormField
                control={form.control}
                name={`stats.${idx}.defense`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Defense</FormLabel>
                    <FormControl>
                      <Input type="number" {...field}
                      
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      onChange={event => field.onChange(parseInt(event.target.value, 10))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem> 
                )}
              />
                  <FormField
                control={form.control}
                name={`stats.${idx}.hp`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>HP</FormLabel>
                    <FormControl>
                      <Input type="number" 
                      
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      {...field} onChange={event => field.onChange(parseInt(event.target.value, 10))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
         </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <FormField
                    control={form.control}
                    name={`stats.${idx}.pierceRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pierce Rate</FormLabel>
                        <FormControl>
                          <Input type="number" 
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`stats.${idx}.resistance`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resistance</FormLabel>
                        <FormControl>
                          <Input type="number" 
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <FormField
                    control={form.control}
                    name={`stats.${idx}.regeneration`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regeneration</FormLabel>
                        <FormControl>
                          <Input type="number"
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`stats.${idx}.critChance`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crit Chance</FormLabel>
                        <FormControl>
                          <Input type="number" 
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <FormField
                    control={form.control}
                    name={`stats.${idx}.critDamage`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crit Damage</FormLabel>
                        <FormControl>
                          <Input type="number" 
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`stats.${idx}.critResistance`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crit Resistance</FormLabel>
                        <FormControl>
                          <Input type="number" 
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <FormField
                    control={form.control}
                    name={`stats.${idx}.critDefense`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Crit Defense</FormLabel>
                        <FormControl>
                          <Input type="number" 
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`stats.${idx}.recoveryRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recovery Rate</FormLabel>
                        <FormControl>
                          <Input type="number" 
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                              step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <FormField
                    control={form.control}
                    name={`stats.${idx}.lifesteal`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lifesteal</FormLabel>
                        <FormControl>
                          <Input type="number"   
                              className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                          
                          step="0.01" {...field} onChange={event => field.onChange(parseFloat(event.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
      
              </div>
          
                      </div>
                    ))}
                    <div className="flex justify-end">
                    <Button type={"button"}
              className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
                    
                    onClick={handleAddStat}
                    disabled={isPending || statFields.length >= max_stats}>
                      Add Stat ({statFields.length}/{max_stats})
                    </Button>
                    </div>
                  </CardContent>
                  </Card>
            </TabsContent>
            <TabsContent value="skills" className="space-y-6">
              <Card className="container rounded-[5px] mx-auto p-10 bg-purple-400 dark:bg-purple-700 border-0">
                  <CardHeader>
                    <CardTitle>
                      Charater Skills
                    </CardTitle>
                    <CardDescription>Enter the characters skills and ranks.</CardDescription>
                  </CardHeader>
                  <CardContent>
                  {[0, 1].map((skillIndex) => (
                <div className="p-4 " key={skillIndex}>
                    <h3  className="text-lg font-medium">
                    Skill {skillIndex + 1}

                    </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name={`skills.${skillIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Skill Name"
                            
                                                   disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                          />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`skills.${skillIndex}.jpName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Japanese Skill Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Japanese Skill Name"
                                                    disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`skills.${skillIndex}.imageUrl`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Image URL"
                            disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                          />
                          </FormControl>
                        </FormItem>
                        
                      )}
                    />
                  </div>

                  <h4 className="text-md font-medium mt-4 mb-2">
                    Skill Ranks
                  </h4>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                    {[0, 1, 2].map((rankIndex) => (
                      <div className="flex flex-col gap-4" key={rankIndex}>
                        <h6>Rank {rankIndex + 1}</h6>
                        <FormField
                          control={form.control}
                          name={`skills.${skillIndex}.skillRanks.${rankIndex}.rank`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rank</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="Rank"
                                                              disabled
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  value={rankIndex + 1}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name={`skills.${skillIndex}.skillRanks.${rankIndex}.type`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rank Type</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Rank Type" 
                                                            disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`skills.${skillIndex}.skillRanks.${rankIndex}.description`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rank Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Rank Description"
                                                          disabled={isPending}
                          className="border-purple-900 resize-none h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
               <Separator className="my-4 bg-white" />
              <div className="space-y-4">
              <h4 className="text-3xl leading-tight font-extrabold py-3">
                Ultimate
              </h4>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
          
                <FormField
                  control={form.control}
                  name="characterUltimate.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ultimate Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ultimate Name"
                          type="text"
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="characterUltimate.jpName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ultimate JP Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ultimate JP Name"
                          type="text"
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="characterUltimate.imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ultimate Image URL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ultimate Image URL"
                          type="text"
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="characterUltimate.description"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Ultimate Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ultimate Description"
                          className="border-purple-900 resize-none h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "

                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="characterUltimate.extraInfo"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Extra Info</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Extra Info"
                          className="border-purple-900 resize-none h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "

                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              </div>
                  </CardContent>
        
              </Card>

            </TabsContent>
            <TabsContent value="extras" className="space-y-6">
             <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
              <CardHeader>
                <CardTitle>Extra Info</CardTitle>
                <CardDescription>Select the characters extra info</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">

<FormField
  control={form.control}
  name="gifts" // This name must match your addCharacterSchema field name
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-white">Gift</FormLabel>
      <ReactSelect
        {...field} // Spread field props
        className="text-black"
        options={Gifts?.map(gift => ({
          value: gift.id, // Use the unique ID as the value for ReactSelect
          label: gift.name, // Use the name as the displayed label
          imageUrl: gift.imageUrl, // Include other properties in options
          description: gift.description,
        })) || []}
        isSearchable={isSearchable}
        isDisabled={isPending || !Gifts?.length}
        onChange={(selectedOption: any) => {
          if (selectedOption) {
            // Transform the selected option to match your schema's expected format
            field.onChange({
              id: selectedOption.value,
              name: selectedOption.label, // Use label for name
              imageUrl: selectedOption.imageUrl,
              description: selectedOption.description,
            });
          } else {
            // Handle clearing the selection
            field.onChange(null);
          }
          console.log(selectedOption); // Keep console log for debugging
        }}
        // Map the form's current value back to ReactSelect's expected value format
        value={
          field.value // Check if the form value exists
          ? {
              value: field.value.id,
              label: field.value.name,
              imageUrl: field.value.imageUrl,
              description: field.value.description,
            }
          : null // Use null for no selection in single select
        }
        placeholder={
          (Gifts?.length ?? 0) >= 1
            ? "Select gift!"
            : "No gifts Available!"
        }
      />
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={form.control}
  name="food" // This name must match your addCharacterSchema field name
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-white">Food(s)</FormLabel>
      <ReactSelect
        {...field} // Spread field props
        isMulti
        className="text-black"
        options={Foods?.map(food => ({
          value: food.id, // Use the unique ID as the value
          label: food.name, // Use the name as the displayed label
          imageUrl: food.imageUrl, // Include other properties
        })) || []}
        isSearchable={isSearchable}
        isDisabled={isPending || !Foods?.length}
        onChange={(selectedOptions: any) => {
          // Map selected options to the format expected by your schema
          const transformedValue = selectedOptions.map((option: any) => ({
            id: option.value,
            name: option.label, // Use label for name
            imageUrl: option.imageUrl,
          }));
          field.onChange(transformedValue); // Pass the array to react-hook-form
          console.log(selectedOptions); // Keep console log
        }}
        // Map the form's current array value back to ReactSelect's expected value format
        value={
           field.value?.map(formFood => ({
             value: formFood.name,
             label: formFood.name,
             imageUrl: formFood.imageUrl,
           })) || [] // Use an empty array for no selections in multi-select
         }
        placeholder={
          (Foods?.length ?? 0) >= 1
            ? "Select foods!"
            : "No foods Available!"
        }
      />
      <FormMessage />
    </FormItem>
  )}
/>

              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">

<FormField
  control={form.control}
  name="associations" // This name must match your addCharacterSchema field name
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-white">Association(s)</FormLabel>
      <ReactSelect
        {...field} // Spread field props
        isMulti
        className="text-black"
        options={AssociationsOptions?.map(assoc => ({
           value: assoc.characterId, // Use characterId as the unique value
           label: assoc.name || '', // Ensure label is string, handle null
           slug: assoc.slug || '', // Ensure slug is string, handle null
           tag: assoc.tag || '',   // Ensure tag is string, handle null
           imageUrl: assoc.imageUrl, // Include other properties
        })) || []}
        isSearchable={isSearchable}
        isDisabled={isPending || !AssociationsOptions?.length}
        onChange={(selectedOptions: any) => {
          // Map selected options to the format expected by your schema
          const transformedValue = selectedOptions.map((option: any) => ({
            charaterId: option.value, // Use option.value for characterId
            name: option.label, // Use option.label for name (which is now string)
            slug: option.slug,   // Use option.slug (which is now string)
            tag: option.tag,     // Use option.tag (which is now string)
            imageUrl: option.imageUrl,
          }));
          field.onChange(transformedValue); // Pass the array to react-hook-form
        }}
        // Map the form's current array value back to ReactSelect's expected value format
        value={
           field.value?.map(formAssoc => ({
             value: formAssoc.characterId, // Map back using characterId
             label: formAssoc.name || '', // Ensure label is string
             slug: formAssoc.slug || '', // Ensure slug is string
             tag: formAssoc.tag || '',   // Ensure tag is string
             imageUrl: formAssoc.imageUrl,
           })) || []
         }
        placeholder={
          (AssociationsOptions?.length ?? 0) >= 1
            ? "Select Associations!"
            : "No associations Available!"
        }
      />
      <FormMessage />
    </FormItem>
  )}
/>

                <div className="flex flex-col space-y-4">
                  {/* <FormField
                  control={form.control}
                  name="associationsWith"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Associations With</FormLabel>
                      <ReactSelect
                        name="associationsWithSelect"
                        isMulti
                        className="text-black"
                        options={AssociatedWithOptions}
                        isSearchable={isSearchable}
                        isDisabled={isPending || !AssociatedWithOptions?.length}
                        onChange={handleAssociationWithSelect}
                        value={fields.map(field =>
                AssociatedWithOptions?.find(opt => opt.characterId === (field as AssociatedWithFormData).characterId)
              ).filter(Boolean)}
                        placeholder={
                          (AssociatedWithOptions?.length ?? 0) >= 1
                            ? "Select Associations with!"
                            : "No associations Available!"
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                {fields.length > 0 && (
                  <div>
                  <h3 className="text-white mb-2">Bonuses for associations with:</h3>
                  {fields.map((field, idx) => (
                      <div key={field.id} className="flex flex-rows gap-3 items-center mb-2">
                      <Image 
                      src={(field as AssociatedWithFormData).imageUrl}
                      alt={(field as AssociatedWithFormData)?.name ?? ""}
                      />
                 <FormField
                control={form.control}
                name={`associationsWith.${idx}.bonus`} // Dynamic name for bonus input
                render={({ field: bonusField }) => (
                  <FormItem className="flex-grow"> {/* Add flex-grow to make input fill space */}
                      <FormLabel className="text-white">Character Bonus</FormLabel>

                     <input
                      type="text"
                      className="border text-black p-1 rounded w-full" // Make input full width
                      placeholder={`Bonus for ${ (field as AssociatedWithFormData).name || (field as AssociatedWithFormData).tag}`}
                      {...bonusField} // Spread the react-hook-form field props
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant={"purple"} 
               type="button" 
               
               onClick={() => remove(idx)}>
                
                Remove
              </Button>
                      </div>
                  ))}
                  </div>
                )}
                </div>
              </div>
              </CardContent>
             </Card>
            </TabsContent>
            <div className="flex flex-row gap-4 justify-end items-center">
            <Button
              type="button"
              className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
            >
              <Link href={"/dashboard/characters"}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
            >
              {isPending ? (
                <>Saving Character...</>
              ): (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Character
                </>
              )}
            </Button>
          </div>
          </form>
        </Form>
      </Tabs>
      {/* Character Form. */}
    </div>
  );
}

export default AddCharacterForm;
