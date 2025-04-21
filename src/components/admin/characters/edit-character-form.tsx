"use client";

import { editCharacter } from "@/src/actions/edit-character";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { cn } from "@/src/lib/utils";
import { addNewUserSchema, editCharacterSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Association,
  AssociationWith,
  Attribute,
  Beast,
  Character,
  CharacterUltimate,
  Crossovers,
  Game,
  GameEvent,
  Genders,
  Gift,
  Meal,
  Race,
  Rarity,
  Skill,
  SkillRank,
} from "@prisma/client";
import cuid from "cuid";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import * as z from "zod";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

interface FormProps {
  Gifts?: Gift[];
  Foods?: Meal[];
  Associations?: Association[];
  AssociatedWith?: AssociationWith[];
  Characters?: Character[];
  CharacterEdit?: Character;
  UltimateEdit?: CharacterUltimate;
  SkillsEdit?: Skill[];
  RanksEdit?: SkillRank[];
}

function EditCharacterForm({
  Gifts,
  Foods,
  Associations,
  AssociatedWith,
  Characters,
  CharacterEdit,
  UltimateEdit,
  SkillsEdit,
  RanksEdit,
}: FormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [slug, setSlug] = useState<string>();
  const [uniqueId, setUniqueId] = useState<string>(cuid());
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);

  const character = CharacterEdit;
  const ultimate = UltimateEdit;
  const skills = SkillsEdit;
  const ranks = RanksEdit;

  const GiftOptions = Gifts?.map((gift) => ({
    name: gift.name,
    imageUrl: gift.imageUrl,
    description: gift.description,
    value: gift.name,
    label: (
      <div>
        <Image src={gift.imageUrl} alt={gift.name} height={30} width={30} />
        {gift.name}
      </div>
    ),
  }));

  const FoodOptions = Foods?.map((food) => ({
    name: food.name,
    imageUrl: food.imageUrl,
    value: food.name,
    description: food.name,
    label: (
      <div>
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
    label: (
      <div>
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

  const AssociatedWithOptions = Characters?.map((character) => ({
    name: character.name,
    characterId: character.id,
    imageUrl: character.imageUrl,
    slug: character.slug,
    value: character.name,
    description: character.name,
    label: (
      <div>
        <Image
          src={character.imageUrl}
          alt={character?.name ?? ""}
          height={30}
          width={30}
        />
        {character.name}
      </div>
    ),
  }));

  const form = useForm<z.infer<typeof editCharacterSchema>>({
    resolver: zodResolver(editCharacterSchema),
    defaultValues: {
      id: character?.id || undefined,
      name: character?.name || undefined,
      tag: character?.tag || undefined,
      jpName: character?.jpName || undefined,
      jpTag: character?.jpTag || undefined,
      slug: character?.slug || undefined,
      imageUrl: character?.imageUrl || undefined,
      releaseDate: character?.releaseDate || undefined,
      game: character?.game || Game.Base,
      crossover: character?.Crossover || Crossovers.NotCrossover,
      race: character?.race || Race.Demon,
      attribute: character?.attribute || Attribute.HP,
      rarity: character?.rarity || Rarity.R,
      // combatClass: character?.combatClass || undefined,
      // attack: character?.attack || undefined,
      // defense: character?.defense || undefined,
      // hp: character?.hp || undefined,
      // pierceRate: character?.pierceRate || undefined,
      // resistance: character?.resistance || undefined,
      // regeneration: character?.regeneration || undefined,
      // critChance: character?.critChance || undefined,
      // critDamage: character?.critDamage || undefined,
      // critResistance: character?.critResistance || undefined,
      // critDefense: character?.critDefense || undefined,
      // recoveryRate: character?.recoveryRate || undefined,
      // lifesteal: character?.lifesteal || undefined,
      gender: character?.gender || Genders.Male,
      bloodType: character?.bloodType || undefined,
      age: character?.age || undefined,
      birthday: character?.birthday ? character.birthday.toString() : undefined,
      height: character?.height || undefined,
      weight: character?.weight || undefined,
      passiveName: character?.passiveName || undefined,
      passiveImageUrl: character?.passiveImageUrl || undefined,
      passiveJpName: character?.passiveJpName || undefined,
      passiveCCNeeded: character?.passiveCCNeeded || undefined,
      passiveDescription: character?.passiveDescription || undefined,
      // gifts: [
      //   {
      //     name: "Gift of the Sun",
      //     imageUrl: undefined,
      //     description: "Heals for 20% of damage dealt.",
      //     characterId: undefined,
      //   },
      // ],
      // food: [
      //   {
      //     name: "Sweet Meat Pie",
      //     imageUrl: undefined,
      //     mealId: 1,
      //     characterId: undefined,
      //   },
      // ],
      skills: [
        {
          id: (skills && skills[0].id) || undefined,
          name: (skills && skills[0].name) || undefined,
          jpName: (skills && skills[0].jpName) || undefined,
          imageUrl: (skills && skills[0].imageUrl) || undefined,
          skillRanks: [
            {
              id: ranks?.[0]?.id,
              rank: ranks?.[0]?.rank ?? 1,
              description: ranks?.[0]?.description ?? "",
              type: ranks?.[0]?.type ?? "",
            },
            {
              id: ranks?.[1]?.id,
              rank: ranks?.[1]?.rank ?? 2,
              description: ranks?.[1]?.description ?? "",
              type: ranks?.[1]?.type ?? "",
            },
            {
              id: ranks?.[2]?.id,
              rank: ranks?.[2]?.rank ?? 3,
              description: ranks?.[2]?.description ?? "",
              type: ranks?.[2]?.type ?? "",
            },
          ],
        },
        {
          id: (skills && skills[0].id) || undefined,
          name: (skills && skills[1].name) || undefined,
          jpName: (skills && skills[1].jpName) || undefined,
          imageUrl: (skills && skills[1].imageUrl) || undefined,
          skillRanks: [
            {
              id: ranks?.[3]?.id,
              rank: ranks?.[3]?.rank ?? 1,
              description: ranks?.[3]?.description ?? "",
              type: ranks?.[3]?.type ?? "",
            },
            {
              id: ranks?.[4]?.id,
              rank: ranks?.[4]?.rank ?? 2,
              description: ranks?.[4]?.description ?? "",
              type: ranks?.[4]?.type ?? "",
            },
            {
              id: ranks?.[5]?.id,
              rank: ranks?.[5]?.rank ?? 3,
              description: ranks?.[5]?.description ?? "",
              type: ranks?.[5]?.type ?? "",
            },
          ],
        },
      ],
      characterUltimate: {
        ultimateId: ultimate?.id || undefined,
        name: ultimate?.name || undefined,
        jpName: ultimate?.jpName || undefined,
        imageUrl: ultimate?.imageUrl || undefined,
        description: ultimate?.description || undefined,
        extraInfo: ultimate?.extraInfo
          ? JSON.stringify(ultimate.extraInfo)
          : undefined,
        characterId: character?.id || undefined,
      },
      // associations: [
      //   {
      //     name: undefined,
      //     imageUrl: undefined,
      //     characterId: undefined,
      //     tag: undefined,
      //   },
      // ],
      // associationsWith: [
      //   {
      //     slug: undefined,
      //     bonus: undefined,
      //     characterId: undefined,
      //     tag: undefined,
      //   },
      // ],
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
    fields: skillFields,
    append: appendSkill,
    remove: removeSkill,
  } = useFieldArray({
    control: form.control,
    name: "skills",
  });

  const { toast } = useToast();
  const { update } = useSession();

  const onSubmit = (values: z.infer<typeof editCharacterSchema>) => {
    values.id = uniqueId;
    values.slug = slug;
    startTransition(() => {
      editCharacter(values)
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
            console.log("Submitted");
            update();
            form.reset();
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

  // function generateSlug() {
  //   const tag = form.getValues("tag");
  //   const slug = tag?.toLowerCase().split(" ").join("-");
  //   setSlug(slug);
  // }

  // function generateCUID() {
  //   setUniqueId(cuid());
  // }

  return (
    <div className="container mx-auto p-10">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-between gap-5 items-center pb-10">
            <h1 className="text-3xl leading-tight font-extrabold pb-3">
              Edit Character - {character?.name}
            </h1>
            <Button variant="outline" size="sm" asChild>
              <Link href={"/dashboard/characters"}>Go Back</Link>
            </Button>
          </div>
          <h2 className="text-3xl leading-tight font-extrabold pb-3">
            Important Info
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Character ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="CUID"
                      type="text"
                      disabled={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Queen Diane"
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
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Queen Diane"
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
              name="jpName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Japanese Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Queen Diane"
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
              name="jpTag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Japanese Tag</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Queen Diane"
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
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Queen Diane"
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
              name="releaseDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Character Added Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
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
          <div className="grid grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Queen Diane"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="game"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a game!" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={Game.Base}>Base</SelectItem>
                      <SelectItem value={Game.AOT}>Attack On Titan</SelectItem>
                      <SelectItem value={Game.KOF}>King Of Fighters</SelectItem>
                      <SelectItem value={Game.Mave}>MAVE:</SelectItem>
                      <SelectItem value={Game.Mushoku}>
                        Mushoku Tensei
                      </SelectItem>
                      <SelectItem value={Game.Overlord}>Overlord</SelectItem>
                      <SelectItem value={Game.ReZero}>Re:Zero</SelectItem>
                      <SelectItem value={Game.ShieldHero}>
                        Shield Hero
                      </SelectItem>
                      <SelectItem value={Game.StrangerThings}>
                        Stranger Things
                      </SelectItem>
                      <SelectItem value={Game.TOG}>Tower Of God</SelectItem>
                      <SelectItem value={Game.Tensura}>Tensura</SelectItem>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select if the unit is a crossover or not." />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={Crossovers.NotCrossover}>
                        Not Crossover
                      </SelectItem>
                      <SelectItem value={Crossovers.Crossover}>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select if the unit is an event unit or not." />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={GameEvent.None}>None</SelectItem>
                      <SelectItem value={GameEvent.Summer}>Summer</SelectItem>
                      <SelectItem value={GameEvent.Christmas}>
                        Christmas
                      </SelectItem>
                      <SelectItem value={GameEvent.Valentine}>
                        Valetine
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select the units race." />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={Race.Demon}>Demon</SelectItem>
                      <SelectItem value={Race.Fairy}>Fairy</SelectItem>
                      <SelectItem value={Race.Giant}>Giant</SelectItem>
                      <SelectItem value={Race.Goddess}>Goddess</SelectItem>
                      <SelectItem value={Race.Human}>Human</SelectItem>
                      <SelectItem value={Race.HumanGiant}>
                        Human / Giant
                      </SelectItem>
                      <SelectItem value={Race.Unknown}>Unknown</SelectItem>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select the units attribute." />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={Attribute.HP}>HP</SelectItem>
                      <SelectItem value={Attribute.Speed}>Speed</SelectItem>
                      <SelectItem value={Attribute.Strength}>
                        Strength
                      </SelectItem>
                      <SelectItem value={Attribute.Dark}>Dark</SelectItem>
                      <SelectItem value={Attribute.Light}>Light</SelectItem>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select the units rarity." />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={Rarity.R}>R</SelectItem>
                      <SelectItem value={Rarity.SR}>SR</SelectItem>
                      <SelectItem value={Rarity.SSR}>SSR</SelectItem>
                      <SelectItem value={Rarity.UR}>UR</SelectItem>
                      <SelectItem value={Rarity.LR}>LR</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-4 dark:bg-white bg-black" />
          <h2 className="text-3xl leading-tight font-extrabold pb-3">
            Basic Info
          </h2>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            <FormField
              control={form.control}
              name="combatClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Combat Class</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1"
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="attack"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attack</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1"
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Defense</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1"
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HP</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="1"
                      type="number"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pierceRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pierce Rate</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="resistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resistance</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="regeneration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regeneration</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="critChance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Critical Chance</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="critDamage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crit Damage</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="critResistance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crit Resistance</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="critDefense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Crit Defense</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="recoveryRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recovery Rate</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
              name="lifesteal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Life Steal</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select the units gender." />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />

                    <SelectContent>
                      <SelectItem value={Genders.Male}>Male</SelectItem>
                      <SelectItem value={Genders.Female}>Female</SelectItem>
                      <SelectItem value={Genders.Unknown}>Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood Type</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="100"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
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
                      placeholder="21"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Birthday</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Unknown"
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
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="183"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>CM</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="62"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>KG</FormDescription>
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
                      placeholder="Vaizel"
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
              name="CV"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CV</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>Voice Actors Name</FormDescription>
                </FormItem>
              )}
            />
          </div>

          <Separator className="my-4 dark:bg-white bg-black" />

          <h2 className="text-3xl leading-tight font-extrabold pb-3">
            Passive
          </h2>
          <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passiveImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passive Image URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Passive Image URL"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passiveJpName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passive JP Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Passive JP Name"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
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
                      placeholder="Passive CC Needed"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
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
                    placeholder="Passive Description"
                    className="resize-none"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator className="my-4 dark:bg-white bg-black" />

          <h2 className="text-3xl leading-tight font-extrabold pb-3">Skills</h2>
          <div>
            <div>
              {[0, 1].map((skillIndex) => (
                <div key={skillIndex}>
                  <h4 className="text-3xl leading-tight font-extrabold py-3">
                    Skill {skillIndex + 1}
                  </h4>
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name={`skills.${skillIndex}.id`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill ID</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              disabled
                              placeholder="Skill ID"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`skills.${skillIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Skill Name" />
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
                            <Input {...field} placeholder="Image URL" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <h5 className="text-2xl leading-tight font-bold py-3">
                    Skill Ranks
                  </h5>
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                    {[0, 1, 2].map((rankIndex) => (
                      <div className="flex flex-col gap-4" key={rankIndex}>
                        <h6>Rank {rankIndex + 1}</h6>
                        <FormField
                          control={form.control}
                          name={`skills.${skillIndex}.skillRanks.${rankIndex}.id`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Skill Rank ID</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="number"
                                  placeholder="ID"
                                  disabled
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
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
                                  value={rankIndex + 1}
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
                                <Input
                                  {...field}
                                  placeholder="Rank Description"
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
                                <Input {...field} placeholder="Rank Type" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <Separator className="my-4 dark:bg-white bg-black" />
              <h4 className="text-3xl leading-tight font-extrabold py-3">
                Ultimate
              </h4>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
                <FormField
                  control={form.control}
                  name="characterUltimate.ultimateId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ultimate ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ultimate ID"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="characterUltimate.characterId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Character ID</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ultimate ID"
                          type="text"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
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
                          className="resize-none mt-2"
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
                          className="resize-none mt-2"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <Separator className="my-4 dark:bg-white bg-black" />

          <Button type="submit">Edit Character</Button>
        </form>
      </Form>
    </div>
  );
}

export default EditCharacterForm;

{
  /* More Info (Associations / Meals / Gifts / etc) */
}
{
  /* <Separator className="my-4 dark:bg-white bg-black" /> */
}

{
  /* <h2 className="text-3xl leading-tight font-extrabold pb-3">
              More Info
            </h2> */
}
{
  /* <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
              <FormField
                control={form.control}
                name="gifts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gifts</FormLabel>
                    <ReactSelect
                      isMulti
                      options={GiftOptions}
                      isSearchable={isSearchable}
                      isDisabled={
                        isPending ||
                        Gifts?.length === undefined ||
                        Gifts.length <= 0
                      }
                      onChange={(selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((option) => option.name)
                        )
                      }
                      defaultValue={GiftOptions?.[0]}
                      placeholder={
                        (Gifts?.length ?? 0) > 1
                          ? "Select gifts!"
                          : "No Gifts Available!"
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="food"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meals</FormLabel>
                    <ReactSelect
                      isMulti
                      options={FoodOptions}
                      isSearchable={isSearchable}
                      isDisabled={
                        isPending ||
                        Foods?.length === undefined ||
                        Foods.length <= 0
                      }
                      onChange={(selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((option) => option.name)
                        )
                      }
                      defaultValue={FoodOptions?.[0]}
                      placeholder={
                        (Foods?.length ?? 0) > 1
                          ? "Select Meals!"
                          : "No Meals Available!"
                      }
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="associations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Associations</FormLabel>
                    <ReactSelect
                      isMulti
                      options={AssociationsOptions}
                      isSearchable={isSearchable}
                      isDisabled={
                        isPending ||
                        Characters?.length === undefined ||
                        Characters.length <= 0
                      }
                      onChange={(selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((option) => option.name)
                        )
                      }
                      defaultValue={AssociationsOptions?.[0]}
                      placeholder={
                        (Characters?.length ?? 0) > 1
                          ? "Select Associations!"
                          : "No Characters Available!"
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="associationsWith"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Associations With</FormLabel>
                    <ReactSelect
                      isMulti
                      options={AssociatedWithOptions}
                      isSearchable={isSearchable}
                      isDisabled={
                        isPending ||
                        Characters?.length === undefined ||
                        Characters.length <= 0
                      }
                      onChange={(selectedOptions) =>
                        field.onChange(
                          selectedOptions.map((option) => option.name)
                        )
                      }
                      defaultValue={AssociatedWithOptions?.[0]}
                      placeholder={
                        (Characters?.length ?? 0) > 1
                          ? "Select Associations!"
                          : "No Characters Available!"
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */
}
