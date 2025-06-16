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
import { toast } from "sonner";

import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Separator } from "@/src/components/ui/separator";
import { cn } from "@/src/lib/utils";
import { characterSchema } from "@/src/schemas/character/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Attribute,
  BonusType,
  Character,
  CharacterAssociation,
  CharacterFriendshipReward,
  CharacterUltimate,
  CombinedCharacterUltimate,
  CrossoverType,
  Food,
  FriendshipRewardType,
  Game,
  GameEvent,
  Gender,
  Gift,
  Grace,
  PassiveSkill,
  Race,
  Rarity,
  Skill,
  SkillRank,
  Stat,
  StatLevel,
  Talent,
  Unity
} from "@prisma/client";
import cuid from "cuid";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon, Plus, Save, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Switch } from "../../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";



interface FormProps {
  Character?: Character & {
    stats: Stat[]; 
    ultimate: CharacterUltimate | null; 
    skills: (Skill & { skillRanks: SkillRank[]; })[]; 
    food: Food[]; 
    gift: Gift[]; 
    unity: Unity | null;
    talent: Talent | null;
    grace: Grace | null;
    passiveSkill: PassiveSkill | null; 
    combinedUltimate: CombinedCharacterUltimate | null; 
    characterFriendshipRewards: (CharacterFriendshipReward & {
      friendshipLevel: {
        rewardType: string;
        id: string;
        level: number;
        requiredAffinity: number;
      };
    })[];
    associationsAsMain: CharacterAssociation[];
    associationsAsAssociated: CharacterAssociation[];
  };
  Gifts?: Gift[];
  Foods?: Food[]
  SkillsEdit?: Skill[];
  UltimateEdit?: CharacterUltimate;
  RanksEdit?: SkillRank[];
  FriendshipLevels?: { id: string; level: number; }[];
  Characters: Character[],
}

function EditCharacterForm({
  Character,
  SkillsEdit,
  UltimateEdit,
  RanksEdit,
  Gifts,
  Foods,
  FriendshipLevels,
  Characters
}: FormProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [uniqueId, setUniqueId] = useState<string>(cuid());
  const [isPending, startTransition] = useTransition();
  const [isSearchable, setIsSearchable] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const [hasUnity, setHasUnity] = useState(false);
  const [hasTalent, setHasTalent] = useState(false);
  const [hasCombinedUltimate, setHasCombinedUltimate] = useState(false);
  const [slug, setSlug] = useState<string>(Character?.slug as string);


  // const character = CharacterEdit;
  const ultimate = UltimateEdit;
  const skills = SkillsEdit;
  const ranks = RanksEdit;

  const raceOptions = Object.values(Race).map((race) => ({
    value: race, // The actual enum value (e.g., RaceType.Demon)
    label: race
      .replace(/([A-Z])/g, " $1")
      .trim()
      .replace(" ", " / "), // Pretty label (e.g., "HumanGiant" -> "Human / Giant")
  }));

  const changeUnity = () => {
    setHasUnity(!hasUnity)
  }

  const changeTalent = () => {
    setHasTalent(!hasTalent);
  }

  const changeCombinedUltimate = () => {
    setHasCombinedUltimate(!hasCombinedUltimate);
  }


  // Prepare default selected materials
  const formDefaultRaces = Character?.race || [Race.Human];

  const GiftOptions = Gifts?.map((gift) => ({
    name: gift.name,
    imageUrl: gift.imageUrl,
    description: gift.description,
    value: gift.id,
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
    value: food.id,
    description: food.name,
    label: (
      <div>
        <Image src={food.imageUrl} alt={food.name} height={30} width={30} />
        {food.name}
      </div>
    ),
  }));


  const BonusTypeOptions = Object.values(BonusType).map((type) => {
    let label = type
      .replace(/_/g, " ") // Replace underscores with spaces
      .toLowerCase(); // Convert the entire string to lowercase
  
    // Capitalize the first letter of each word
    label = label.split(" ").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(" ");
  
    return {
      value: type,
      label: label,
    };
  });

  const friendshipLevelMap = new Map(
    Character?.characterFriendshipRewards?.map(reward => [
      reward.friendshipLevelId,
      reward.friendshipLevel // this comes from `include`
    ]) || []
  );




  

  console.log(Character);

  const form = useForm<z.infer<typeof characterSchema>>({
    resolver: zodResolver(characterSchema),
    defaultValues: {
      id: Character?.id || undefined,
      name: Character?.name || undefined,
      tag: Character?.tag || undefined,
      jpName: Character?.jpName || undefined,
      jpTag: Character?.jpTag || undefined,
      slug: Character?.slug || undefined,
      imageUrl: Character?.imageUrl || undefined,
      releaseDate: Character?.releaseDate || undefined,
      game: Character?.game || Game.Base,
      crossover: Character?.Crossover || CrossoverType.NotCrossover,
      races: formDefaultRaces,
      attribute: Character?.attribute || Attribute.HP,
      rarity: Character?.rarity || Rarity.R,
      gender: Character?.gender || Gender.Male,
      bloodType: Character?.bloodType || undefined,
      age: Character?.age || undefined,
      birthday: Character?.birthday ? Character.birthday.toString() : undefined,
      height: Character?.height || undefined,
      weight: Character?.weight || undefined,
      CV: Character?.cv || undefined,
      stats: Character?.stats ?? [],
      gifts: Character?.gift ?? [],
      food: Character?.food ?? [],
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
        ultimateId: ultimate?.id ?? undefined,
        name: ultimate?.name ?? undefined,
        jpName: ultimate?.jpName ?? undefined,
        imageUrl: ultimate?.imageUrl ?? undefined,
        description: ultimate?.description ?? undefined,
        extraInfo: ultimate?.extraInfo,
      },
      combinedCharacterUltimate: {
        name: Character?.combinedUltimate?.name,
        jpName: Character?.combinedUltimate?.jpName,
        imageUrl: Character?.combinedUltimate?.imageUrl,
        description: Character?.combinedUltimate?.description,
        extraInfo: Character?.combinedUltimate?.extraInfo,
        characterId: Character?.combinedUltimate?.characterId ?? "",
      },
      characterUnity: {
        name: Character?.unity?.name,
        jpName: Character?.unity?.jpName,
        imageUrl: Character?.unity?.imageUrl,
        description: Character?.unity?.description,
        uniqueDisplay: Character?.unity?.uniqueDisplay

      },
      characterTalent: {
        name: Character?.talent?.name,
        jpName: Character?.talent?.jpName,
        imageUrl: Character?.talent?.imageUrl,
        description: Character?.talent?.description,
        uniqueDisplay: Character?.talent?.uniqueDisplay
      },
      characterPassive: {
        name: Character?.passiveSkill?.name,
        jpName: Character?.passiveSkill?.jpName,
        imageUrl: Character?.passiveSkill?.imageUrl,
        description: Character?.passiveSkill?.description,
        ccNeeded: Character?.passiveSkill?.ccNeeded ?? "",
        uniqueDisplay: Character?.passiveSkill?.uniqueDisplay
      },
      characterGrace: {
        name: Character?.grace?.name,
        jpName: Character?.grace?.jpName,
        imageUrl: Character?.grace?.imageUrl,
        description: Character?.grace?.description,
        uniqueDisplay: Character?.grace?.uniqueDisplay
      },
      characterAssociations: Character?.associationsAsMain?.map(assoc => ({
        associatedCharacterId: assoc.associatedCharacterId,
        bonusType: assoc.bonusType,
        bonusValue: assoc.bonusValue,
        bonusUnit: assoc.bonusUnit ?? "",
      })) ?? [],
      event: GameEvent.None,
      characterFriendshipRewards:
      Character?.characterFriendshipRewards?.map((reward) => ({
        friendShipLevelId: reward.friendshipLevelId,
        level: friendshipLevelMap.get(reward.friendshipLevelId)?.level, 
        artworkUrl: reward.artworkUrl ?? undefined,
        voiceLineText: reward.voiceLineText ?? undefined,
        voiceLineAudioUrl: reward.voiceLineAudioUrl ?? undefined,
        diamondAmount: reward.diamondAmount ?? undefined,
        motionUrl: reward.motionUrl ?? undefined,
        cosmeticUrl: reward.cosmeticUrl ?? undefined,
        cosmeticName: reward.cosmeticName ?? undefined,
      })) ?? [],
    },
  });

  const {
    fields: statFields,
    append: statAppend,
    remove: statRemove,
  } = useFieldArray({
    control: form.control,
    name: "stats",
  });

  const MAX_STATS = 3;

  const handleAddStat = () => {
    if (statFields.length < MAX_STATS) {
      statAppend({
        // Provide default values for a NEW stat being added
        level: StatLevel.LEVEL_1, // Set a default level for new stats
        combatClass: 0,
        attack: 0,
        defense: 0,
        hp: 0,
        pierceRate: 0.0,
        resistance: 0.0,
        regeneration: 0.0,
        critChance: 0.0,
        critDamage: 0.0,
        critResistance: 0.0,
        critDefense: 0.0,
        recoveryRate: 0.0,
        lifesteal: 0.0,
      });
    }
  };

  const handleRemoveStat = (index: number) => {
    if (statFields.length > 1) {
      statRemove(index);
    } else {
      form.setError("stats", {
        type: "manual",
        message: "A character must have at least one stat.",
      });
    }
  };

  
  const currentCrossoverStatus = form.watch("crossover");
  const isCrossoverCharacter =
    currentCrossoverStatus === CrossoverType.Crossover;

    const { fields: friendshipRewardFields } = useFieldArray({
      control: form.control,
      name: "characterFriendshipRewards",
    });

    
    const CharacterAssociationsOptions = Characters?.map((character) => ({
      name: character.name,
      characterId: character.id,
      imageUrl: character.imageUrl,
      slug: character.slug,
      value: character.id, // Use character ID as the value for ReactSelect
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

  const {
    fields: associationFields,
    append: appendAssociation,
    remove: removeAssociation,
  } = useFieldArray({
    control: form.control,
    name: "characterAssociations",
  });


  const handleAddAssociation = () => {
    appendAssociation ({
      bonusType: BonusType.ATTACK_FLAT,
      bonusValue: 0,
      bonusUnit: "",
      associatedCharacterId: ""
    })
  }

  const handleRemoveAssociation = (index: number) => {
      removeAssociation(index)
  };
  

  const currentMainCharacterId = form.watch("id");
  const currentAssociatedCharacters = form.watch("characterAssociations");

  const getFilteredAssociatedCharacterOptions = (currentIndex: number) => {
    // Filter out the main character itself
    // Also filter out characters already selected in other association fields
    const selectedAssociatedIds =
      currentAssociatedCharacters
        ?.map((assoc, idx) =>
          idx !== currentIndex ? assoc.associatedCharacterId : null
        )
        .filter(Boolean) ?? [];

    return CharacterAssociationsOptions?.filter(
      (option) =>
        option.characterId !== currentMainCharacterId && // Cannot associate with self (if ID exists)
        !selectedAssociatedIds.includes(option.characterId) // Cannot select same character twice
    );
  };
  

  const { update } = useSession();
  const router = useRouter();

  const onSubmit = (values: z.infer<typeof characterSchema>) => {
    values.id = uniqueId;
    values.slug = slug;
    startTransition(() => {
      editCharacter(values)
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
              router.push("/dashboard/food");
            }, 1500);
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

  // function generateCUID() {
  //   setUniqueId(cuid());
  // }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <div className="flex justify-between flex-row items-center pb-5 gap-5">
          <div className="flex gap-2 items-center">
            <Button
              variant={"outline"}
              size={"icon"}
              asChild
              className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
            >
              <Link href={"/dashboard/characters"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
                Edit Character
              </h1>
              <p className="dark:text-gray-300 text-gray-500">
                Edit {Character?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid md:grid-cols-7 grid-cols-1 mb-8 h-full">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="details">Character Details</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
          <TabsTrigger value="friendship" disabled={isCrossoverCharacter}>
            Friendship
          </TabsTrigger>
          <TabsTrigger value="association" className="col-span-2">Associations</TabsTrigger>
        </TabsList>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <TabsContent value="basic" className="space-y-6">
              <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="text-white">
                    Basic Information
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Enter the basic information about {Character?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            English Name
                          </FormLabel>
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
                          <FormLabel className="text-white">
                            Japanese Name
                          </FormLabel>
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
                          <FormLabel className="text-white">
                            English Tag
                          </FormLabel>
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
                          <FormLabel className="text-white">
                            Japanese Tag
                          </FormLabel>
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
                            <FormLabel className="text-white">Slug</FormLabel>
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
                          <FormDescription className="text-gray-300">
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
                          <FormLabel className="text-white">
                            Image URL
                          </FormLabel>
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
                      name="races"
                      render={() => (
                        <FormItem>
                          <FormLabel className="text-white">Race(s)</FormLabel>
                          <FormField
                            control={form.control}
                            name="races"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                  <FormControl>
                                    <ReactSelect
                                      {...field} // Spread field props
                                      className="text-black w-full"
                                      options={raceOptions}
                                      isMulti
                                      isSearchable={isSearchable}
                                      isDisabled={isPending}
                                      onChange={(selectedOptions: any) => {
                                        const newValues = selectedOptions
                                          ? selectedOptions.map(
                                              (option: any) => option.value
                                            )
                                          : [];
                                        field.onChange(newValues);
                                      }}
                                      onBlur={field.onBlur}
                                      value={
                                        field.value
                                          ? raceOptions.filter((option) =>
                                              field.value.includes(option.value)
                                            )
                                          : []
                                      }
                                    />
                                  </FormControl>
                                </FormItem>
                              );
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="attribute"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">
                            Attribute
                          </FormLabel>
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
                          <FormLabel className="text-white">Rarity</FormLabel>
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
                          <FormLabel className="text-white">Race</FormLabel>
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
                          <FormLabel className="text-white">
                            Crossover
                          </FormLabel>
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
                                value={CrossoverType.NotCrossover}
                              >
                                Not Crossover
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={CrossoverType.Crossover}
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
                          <FormLabel className="text-white">Event</FormLabel>
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
                          <FormLabel className="text-white">
                            Character Release Date
                          </FormLabel>
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
                  <CardTitle className="text-white">
                    Character Details
                  </CardTitle>
                  <CardDescription className="text-gray-300">
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
                          <FormLabel className="text-white">
                            Blood Type
                          </FormLabel>
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
                          <FormLabel className="text-white">Age</FormLabel>
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
                          <FormLabel className="text-white">Birthday</FormLabel>
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
                          <FormLabel className="text-white">Height</FormLabel>
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
                          <FormLabel className="text-white">Weight</FormLabel>
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
                          <FormLabel className="text-white">Location</FormLabel>
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
                          <FormLabel className="text-white">Gender</FormLabel>
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
                                value={Gender.Male}
                              >
                                Male
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Gender.Female}
                              >
                                Female
                              </SelectItem>
                              <SelectItem
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                value={Gender.Unknown}
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
                          <FormLabel className="text-white">
                            Voice Actor (CV)
                          </FormLabel>
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
                      name="characterPassive.name"
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
                      name="characterPassive.jpName"
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
                      name="characterPassive.imageUrl"
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
                      name="characterPassive.ccNeeded"
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
                    name="characterPassive.description"
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
                  <CardTitle className="text-white">Charater Skills</CardTitle>
                  <CardDescription className="text-gray-300">
                    Enter the characters skills and ranks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {statFields.map((field, idx) => (
                    <div className="p-4 space-y-6" key={idx}>
                      <div className="flex flex-row justify-between items-center gap-4">
                        <h3 className="text-md font-medium text-white">
                          Stat {idx + 1}
                        </h3>
                        {statFields.length > 1 && (
                          <Button
                            type="button"
                            className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
                            onClick={() => handleRemoveStat(idx)}
                          >
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
                            <FormLabel className="text-white">Level</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
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
                                  value={StatLevel.TRUE_AWAKENING}
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
                              <FormLabel className="text-white">
                                Combat Class
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseInt(event.target.value, 10)
                                    )
                                  }
                                />
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
                              <FormLabel className="text-white">
                                Attack
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  onChange={(event) =>
                                    field.onChange(
                                      parseInt(event.target.value, 10)
                                    )
                                  }
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
                          name={`stats.${idx}.defense`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Defense
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  onChange={(event) =>
                                    field.onChange(
                                      parseInt(event.target.value, 10)
                                    )
                                  }
                                />
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
                              <FormLabel className="text-white">HP</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseInt(event.target.value, 10)
                                    )
                                  }
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
                          name={`stats.${idx}.pierceRate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Pierce Rate
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
                                />
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
                              <FormLabel className="text-white">
                                Resistance
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
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
                          name={`stats.${idx}.regeneration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Regeneration
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
                                />
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
                              <FormLabel className="text-white">
                                Crit Chance
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
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
                          name={`stats.${idx}.critDamage`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Crit Damage
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
                                />
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
                              <FormLabel className="text-white">
                                Crit Resistance
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
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
                          name={`stats.${idx}.critDefense`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Crit Defense
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
                                />
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
                              <FormLabel className="text-white">
                                Recovery Rate
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
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
                          name={`stats.${idx}.lifesteal`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Lifesteal
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                  step="0.01"
                                  {...field}
                                  onChange={(event) =>
                                    field.onChange(
                                      parseFloat(event.target.value)
                                    )
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end">
                    <Button
                      type={"button"}
                      className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
                      onClick={handleAddStat}
                      disabled={isPending || statFields.length >= MAX_STATS}
                    >
                      Add Stat ({statFields.length}/{MAX_STATS})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills" className="space-y-6">
              <Card className="container rounded-[5px] mx-auto p-10 bg-purple-400 dark:bg-purple-700 border-0">
                <CardHeader>
                  <CardTitle className="text-white">Charater Skills</CardTitle>
                  <CardDescription className="text-gray-300">
                    Enter the characters skills and ranks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {[0, 1].map((skillIndex) => (
                    <div className="p-4 " key={skillIndex}>
                      <h3 className="text-lg font-medium text-white">
                        Skill {skillIndex + 1}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <FormField
                          control={form.control}
                          name={`skills.${skillIndex}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white">
                                Skill Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Skill Name"
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
                              <FormLabel className="text-white">
                                Japanese Skill Name
                              </FormLabel>
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
                              <FormLabel className="text-white">
                                Image URL
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Image URL"
                                  disabled={isPending}
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <h4 className="text-md font-medium text-white mt-4 mb-2">
                        Skill Ranks
                      </h4>
                      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                        {[0, 1, 2].map((rankIndex) => (
                          <div className="flex flex-col gap-4" key={rankIndex}>
                            <h6 className="text-white">Rank {rankIndex + 1}</h6>
                            <FormField
                              control={form.control}
                              name={`skills.${skillIndex}.skillRanks.${rankIndex}.rank`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">
                                    Rank
                                  </FormLabel>
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
                                  <FormLabel className="text-white">
                                    Rank Type
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      placeholder="Rank Type"
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
                                  <FormLabel className="text-white">
                                    Rank Description
                                  </FormLabel>
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
                    <h4 className="text-3xl leading-tight text-white font-extrabold py-3">
                      Ultimate
                    </h4>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                      <FormField
                        control={form.control}
                        name="characterUltimate.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">
                              Ultimate Name
                            </FormLabel>
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
                            <FormLabel className="text-white">
                              Ultimate JP Name
                            </FormLabel>
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
                            <FormLabel className="text-white">
                              Ultimate Image URL
                            </FormLabel>
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
                            <FormLabel className="text-white">
                              Ultimate Description
                            </FormLabel>
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
                            <FormLabel className="text-white">
                              Extra Info
                            </FormLabel>
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
                  <Separator className="my-6 bg-purple-900" />

<div className="space-y-4">
  <div className="flex flex-row justify-between items-center">
    <h4 className="text-3xl leading-tight font-extrabold py-3">
      Combined Ultimate
    </h4>
    <Switch
      disabled={isPending}
      checked={hasCombinedUltimate}
      onCheckedChange={changeCombinedUltimate}
      className="data-[state=checked]:bg-purple-400 rounded-[5px] data-[state=unchecked]:bg-purple-900"
    />
  </div>
  {hasCombinedUltimate === true ? (
    <>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        <FormField
          control={form.control}
          name="combinedCharacterUltimate.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Combined Ultimate Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Talent Name"
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
          name="combinedCharacterUltimate.jpName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Combined Ultimate JP Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Talent JP Name"
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
          name="combinedCharacterUltimate.imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Combined Ultimate Image URL</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Unity Image URL"
                  type="text"
                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                  disabled={isPending}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

 <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
 <FormField
        control={form.control}
        name="combinedCharacterUltimate.description"
        render={({ field }) => (
          <FormItem className="mt-2">
            <FormLabel>Combined Ultimate Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Talent Description"
                className="border-purple-900 resize-none mt-4 h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "
                {...field}
                disabled={isPending}
              />
            </FormControl>
          </FormItem>
        )}
      />
                <FormField
      control={form.control}
      name="combinedCharacterUltimate.extraInfo"
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
    </>
  ) : null}
</div>
                  <Separator className="my-4 bg-white" />
                  <div className="space-y-4">
                    <h4 className="text-3xl leading-tight font-extrabold py-3">
                      Unity
                    </h4>
                    <Switch
                                disabled={isPending}
                                checked={hasUnity}
                                onCheckedChange={changeUnity}
                                className="data-[state=checked]:bg-purple-400 rounded-[5px] data-[state=unchecked]:bg-purple-900"
                              />
                 {hasUnity === true && (
                  <>
                     <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                      <FormField
                        control={form.control}
                        name="characterUnity.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unity Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Unity Name"
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
                        name="characterUnity.jpName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unity JP Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Unity JP Name"
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
                        name="characterUnity.imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unity Image URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Unity Image URL"
                                type="text"
                                className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                disabled={isPending}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="characterUnity.description"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormLabel>Unity Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Unity Description"
                              className="border-purple-900 resize-none mt-4 h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    /></>
                 )}
                  </div>
                  <Separator className="my-4 bg-white" />
                  <div className="space-y-4">
                    <div className="flex flex-row justify-between items-center">
                      <h4 className="text-3xl leading-tight font-extrabold py-3">
                        Talent
                      </h4>
                      <Switch
                                disabled={isPending}
                                checked={hasTalent}
                                onCheckedChange={changeTalent}
                                className="data-[state=checked]:bg-purple-400 rounded-[5px] data-[state=unchecked]:bg-purple-900"
                              />
                    </div>
                    {hasTalent === true && (
                      <>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                          <FormField
                            control={form.control}
                            name="characterTalent.name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Unity Name</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Talent Name"
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
                            name="characterTalent.jpName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Talent JP Name</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Talent JP Name"
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
                            name="characterTalent.imageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Talent Image URL</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Unity Image URL"
                                    type="text"
                                    className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                                    disabled={isPending}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="characterTalent.description"
                          render={({ field }) => (
                            <FormItem className="mt-2">
                              <FormLabel>Talent Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Talent Description"
                                  className="border-purple-900 resize-none mt-4 h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "
                                  {...field}
                                  disabled={isPending}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="extras" className="space-y-6">
              <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle className="text-white">Extra Info</CardTitle>
                  <CardDescription className="text-gray-300">
                    Select the characters extra info
                  </CardDescription>
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
                            options={GiftOptions}
                            isMulti
                            isSearchable={isSearchable}
                            isDisabled={isPending || !Gifts?.length}
                            onChange={(selectedOption: any) => {
                              if (selectedOption) {
                                field.onChange({
                                  id: selectedOption.value,
                                  name: selectedOption.label,
                                  imageUrl: selectedOption.imageUrl,
                                  description: selectedOption.description,
                                });
                              } else {
                                // Handle clearing the selection
                                field.onChange(null);
                              }
                            }}
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
                            options={
                              Foods?.map((food) => ({
                                value: food.id, // Use the unique ID as the value
                                label: food.name, // Use the name as the displayed label
                                imageUrl: food.imageUrl, // Include other properties
                              })) || []
                            }
                            isSearchable={isSearchable}
                            isDisabled={isPending || !Foods?.length}
                            onChange={(selectedOptions: any) => {
                              // Map selected options to the format expected by your schema
                              const transformedValue = selectedOptions.map(
                                (option: any) => ({
                                  id: option.value,
                                  name: option.label, // Use label for name
                                  imageUrl: option.imageUrl,
                                })
                              );
                              field.onChange(transformedValue); // Pass the array to react-hook-form
                              console.log(selectedOptions); // Keep console log
                            }}
                            // Map the form's current array value back to ReactSelect's expected value format
                            value={
                              field.value?.map((formFood) => ({
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
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="friendship" className="space-y-6">
              {isCrossoverCharacter ? (
                <div className="text-center text-xl text-white p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px]">
                  <p>
                    Friendship rewards are not applicable for crossover
                    characters.
                  </p>
                </div>
              ) : (
                <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
                  <CardHeader>
                    <CardTitle>Friendship Rewards</CardTitle>
                    <CardDescription>
                      Define the specific reward details for each friendship
                      level
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CardContent className="space-y-6">
                      {/* Render fields dynamically */}
                      {friendshipRewardFields.map((field, index) => {
                        const genericLevel = friendshipLevelMap?.get(field.friendShipLevelId)

                        return (
                          <div
                            key={field.id}
                            className="space-y-4 p-4 rounded-md"
                          >
                            <h4 className="text-lg font-semibold text-white">
                              Level {field.level}: Reward Type:{" "}
                              {genericLevel?.rewardType.replace(/_/g, " ")}{" "}
                              ({genericLevel?.requiredAffinity}{" "}
                              Affinity)
                            </h4>
                            {genericLevel?.rewardType ===
                              FriendshipRewardType.HERO_ARTWORK && (
                              <FormField
                                control={form.control}
                                name={`characterFriendshipRewards.${index}.artworkUrl`}
                                render={({ field: inputField }) => (
                                  <FormItem>
                                    <FormLabel>Hero Artwork URL</FormLabel>
                                    <FormControl>
                                      <Input
                                        {...inputField}
                                        placeholder="e.g., https://example.com/artwork.png"
                        className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"

                                        disabled={isPending}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                             {genericLevel?.rewardType ===
              FriendshipRewardType.VOICE_LINE && (
              <>
                <FormField
                  control={form.control}
                  name={`characterFriendshipRewards.${index}.voiceLineText`}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormLabel>Voice Line Text</FormLabel>
                      <FormControl>
                        <Textarea
                          {...inputField}
                          placeholder="e.g., 'Thank you for your kindness!'"
                          disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`characterFriendshipRewards.${index}.voiceLineAudioUrl`}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormLabel>Voice Line Audio URL</FormLabel>
                      <FormControl>
                        <Input
                          {...inputField}
                          placeholder="e.g., https://example.com/voice.mp3"
                          disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            {genericLevel?.rewardType ===
              FriendshipRewardType.DIAMOND && (
              <FormField
                control={form.control}
                name={`characterFriendshipRewards.${index}.diamondAmount`}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Diamond Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...inputField}
                        type="number"
                        placeholder="e.g., 1"
                        disabled={isPending}
                        className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {genericLevel?.rewardType ===
              FriendshipRewardType.HERO_MOTION && (
              <FormField
                control={form.control}
                name={`characterFriendshipRewards.${index}.motionUrl`}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>Motion URL</FormLabel>
                    <FormControl>
                      <Input
                        {...inputField}
                        placeholder="e.g., https://example.com/motion.mp4"
                        disabled={isPending}
                        className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {genericLevel?.rewardType ===
              FriendshipRewardType.HEAD_COSMETIC && (
              <>
                <FormField
                  control={form.control}
                  name={`characterFriendshipRewards.${index}.cosmeticName`}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormLabel>Cosmetic Name</FormLabel>
                      <FormControl>
                        <Input
                          {...inputField}
                          placeholder="e.g., King's Outfit"
                          disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`characterFriendshipRewards.${index}.cosmeticUrl`}
                  render={({ field: inputField }) => (
                    <FormItem>
                      <FormLabel>Cosmetic URL</FormLabel>
                      <FormControl>
                        <Input
                          {...inputField}
                          placeholder="e.g., https://example.com/cosmetic.png"
                          disabled={isPending}
                          className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
                            
                          </div>
                        );
                      })}
                    </CardContent>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="association" className="space-y-6">
              <Card className="container mx-auto p-10 bg-purple-400 dark:bg-purple-700 rounded-[5px] border-0">
                <CardHeader>
                  <CardTitle>Character Associations</CardTitle>
                  <CardDescription>
                    Define character associated with this character and their
                    bonuses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {associationFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="grid md:grid-cols-4 grid-cols-1 gap-4 items-end"
                    >
                      <FormField
                        control={form.control}
                        name={`characterAssociations.${idx}.associatedCharacterId`}
                        render={({ field: assocCharacterIdField }) => (
                          <FormItem>
                            <FormLabel>Associated Character</FormLabel>
                            <FormControl>
                              <ReactSelect
                                {...assocCharacterIdField}
                                className="text-black w-full"
                                options={getFilteredAssociatedCharacterOptions(
                                  idx
                                )}
                                isSearchable={isSearchable}
                                isDisabled={isPending}
                                onChange={(selectedOption: any) => {
                                  assocCharacterIdField.onChange(
                                    selectedOption ? selectedOption.value : ""
                                  );
                                }}
                                onBlur={assocCharacterIdField.onBlur}
                                value={
                                  CharacterAssociationsOptions?.find(
                                    (option) =>
                                      option.value ===
                                      assocCharacterIdField.value
                                  ) || null
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


<FormField
                        control={form.control}
                        name={`characterAssociations.${idx}.bonusType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bonus Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0">
                                  <SelectValue placeholder="Select bonus type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent  className="bg-purple-600 rounded-[5px]  text-white dark:bg-purple-800">
                                {BonusTypeOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}
                                className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`characterAssociations.${idx}.bonusValue`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bonus Value</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                step="any"
                                placeholder="e.g., 10"
                                disabled={isPending}
                                className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                                onChange={(e) =>
                                  field.onChange(
                                    e.target.value === ""
                                      ? undefined
                                      : parseFloat(e.target.value)
                                  )
                                }
                                value={field.value ?? ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex flex-row items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`characterAssociations.${idx}.bonusUnit`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormLabel>Bonus Unit (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="e.g., % or flat"
                                  disabled={isPending}
                                  className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          onClick={() => removeAssociation(idx)}
                          variant={"purple"}
                          className="text-white rounded-[5px] mt-6 dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
                          size={"icon"}
                          disabled={isPending}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
               <div className="flex justify-end">
               <Button                 
                  disabled={isPending}
                  onClick={handleAddAssociation}
                  type="button"
                className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250">
                  <Plus className="w-4 h-4 mr-2"/>
                  Association
                </Button>
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
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
}

export default EditCharacterForm;
