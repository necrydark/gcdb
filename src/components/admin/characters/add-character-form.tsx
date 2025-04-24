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
  Game,
  GameEvent,
  Genders,
  Gift,
  HolyRelic,
  Meal,
  Race,
  Rarity,
} from "@prisma/client";
import cuid from "cuid";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
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
  // Foods?: Meal[];
  Associations?: Association[];
  AssociatedWith?: AssociationWith[];
  Characters?: Character[];
  // Relics?: HolyRelic[];
}

function AddCharacterForm({
  Gifts,
  // Foods,
  Associations,
  AssociatedWith,
  Characters,
}: // Relics,
FormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [slug, setSlug] = useState<string>();
  const [uniqueId, setUniqueId] = useState<string>(cuid());
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState("basic")


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

  // const FoodOptions = Foods?.map((food) => ({
  //   name: food.name,
  //   imageUrl: food.imageUrl,
  //   value: food.name,
  //   description: food.name,
  //   label: (
  //     <div>
  //       <Image src={food.imageUrl} alt={food.name} height={30} width={30} />
  //       {food.name}
  //     </div>
  //   ),
  // }));

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
      combatClass: undefined,
      attack: undefined,
      defense: undefined,
      hp: undefined,
      pierceRate: undefined,
      resistance: undefined,
      regeneration: undefined,
      critChance: undefined,
      critDamage: undefined,
      critResistance: undefined,
      critDefense: undefined,
      recoveryRate: undefined,
      lifesteal: undefined,
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
        ultimateId: undefined,
        name: undefined,
        jpName: undefined,
        imageUrl: undefined,
        description: undefined,
        extraInfo: undefined,
        characterId: undefined,
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

  const onSubmit = (values: z.infer<typeof addCharacterSchema>) => {
    values.id = uniqueId;
    values.slug = slug;
    startTransition(() => {
      addCharacter(values)
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
          }
        })
        .catch((err) => setError(err));
    });
  };

  function generateSlug() {
    const tag = form.getValues("tag");
    const slug = tag?.toLowerCase().split(" ").join("-");
    setSlug(slug);
  }

  function generateCUID() {
    setUniqueId(cuid());
  }

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
              <Link href={"/dashboard/relics"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
                Add Character
              </h1>
              <p className="text-gray-500 dark:text-gray-300">Add a new character</p>
            </div>
          </div>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid md:grid-cols-5 grid-cols-1 mb-8">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Character Details</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="associations">Associations</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <TabsContent value="basic" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Enter the basic information about the character.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>Character Information</div>
                    </CardContent>
                  </Card>
              </TabsContent>
          </form>
        </Form>
      </Tabs>
      {/* Character Form. */}

    </div>
  );
}

export default AddCharacterForm;

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
