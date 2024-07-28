// "use client";

// import { useCurrentUser } from "@/hooks/use-current-user";
// import { addUser } from "@/src/actions/add-user";
// import { Button } from "@/src/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/src/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/src/components/ui/form";
// import { Input } from "@/src/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/src/components/ui/select";
// import { Switch } from "@/src/components/ui/switch";
// import { Textarea } from "@/src/components/ui/textarea";
// import { useToast } from "@/src/components/ui/use-toast";
// import { UploadButton } from "@/src/lib/uploadthing";
// import { addCharacterSchema, addNewUserSchema } from "@/src/schemas/schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Attribute,
//   Beast,
//   Crossovers,
//   Game,
//   GameEvent,
//   Race,
//   Rarity,
// } from "@prisma/client";
// import cuid from "cuid";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import { useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { Meal } from "../../types/food";
// import { Gift } from "../../types/gift";

// interface FormProps {
//   Gifts?: Gift[];
//   Foods?: Meal[];
// }

// function AddCharacterForm({ Gifts, Foods }: FormProps) {
//   const [error, setError] = useState<string | undefined>();
//   const [success, setSuccess] = useState<string | undefined>();
//   const [slug, setSlug] = useState<string | undefined>();
//   const [uniqueId, setUniqueId] = useState<string>(cuid());
//   const [isPending, startTransition] = useTransition();

//   function generateSlug() {
//     const tag = form.getValues("tag");
//     const slug = tag?.toLowerCase().split(" ").join("-");
//     setSlug(slug);
//   }

//   const generateCUID = () => {
//     setUniqueId(cuid());
//   };

//   const form = useForm<z.infer<typeof addCharacterSchema>>({
//     resolver: zodResolver(addCharacterSchema),
//     defaultValues: {
//       name: undefined,
//       tag: undefined,
//       jpName: undefined,
//       jpTag: undefined,
//       slug: undefined,
//       imageUrl: undefined,
//       game: Game.Base,
//       crossover: Crossovers.NotCrossover,
//       race: Race.Human,
//       attribute: Attribute.HP,
//       rarity: Rarity.SSR,
//       combatClass: 1,
//       attack: 1,
//       defense: 1,
//       hp: 1,
//       pierceRate: "0%",
//       resistance: "0%",
//       regeneration: "0%",
//       critChance: "0%",
//       critDamage: "0%",
//       critResistance: "0%",
//       critDefense: "0%",
//       recoveryRate: "0%",
//       lifesteal: "0%",
//       gender: undefined,
//       bloodType: undefined,
//       age: undefined,
//       birthday: undefined,
//       height: undefined,
//       weight: undefined,
//       passiveName: "Assault Knights!",
//       passiveImageUrl: undefined,
//       passiveJpName: "突撃騎士団！",
//       passiveDescription:
//         "Increases HP attribute allies' Attack-related stats by 10%.",
//       gifts: [
//         {
//           name: "Gift of the Sun",
//           imageUrl: undefined,
//           description: "Heals for 20% of damage dealt.",
//           characterId: 1,
//         },
//       ],
//       food: [
//         {
//           name: "Sweet Meat Pie",
//           imageUrl: undefined,
//           effect: "More Damage",
//           mealId: 1,
//           characterId: 1,
//         },
//       ],
//       skills: [
//         {
//           characterId: 1,
//           characterUltimateId: 1,
//           characterSkill: [
//             {
//               name: "Skill 1",
//               jpName: "ありがとう",
//               imageUrl: undefined,
//               description: undefined,
//               characterSkillsId: 1,
//             },
//           ],
//           skillRank: [
//             {
//               description: undefined,
//               type: undefined,
//               characterSkillId: 1,
//             },
//           ],
//         },
//       ],
//       associations: [
//         {
//           name: undefined,
//           imageUrl: undefined,
//           characterId: 1,
//         },
//       ],
//       associationsWith: [
//         {
//           slug: undefined,
//           bonus: undefined,
//           characterId: 1,
//         },
//       ],
//       holyRelic: [
//         {
//           name: undefined,
//           effect: undefined,
//           characterId: 1,
//         },
//       ],
//       event: GameEvent.None,
//     },
//   });

//   return (
//     <div className="container mx-auto p-10">
//       <h1 className="text-3xl leading-tight font-extrabold pb-5">
//         Character Form
//       </h1>
//       <Form {...form}>
//         <form className="space-y-6">
//           <h2>Important Info</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//             <FormField
//               control={form.control}
//               name="id"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Japanese Name</FormLabel>
//                   <FormControl>
//                     <div className="relative w-full">
//                       <Input
//                         {...field}
//                         placeholder="CUID"
//                         type="text"
//                         disabled={true}
//                         value={uniqueId}
//                       />
//                       <Button
//                         onClick={generateCUID}
//                         type="button"
//                         className="!absolute right-0 top-0 rounded"
//                       >
//                         Generate CUID
//                       </Button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Queen Diane"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="tag"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tag</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Queen Diane"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="jpName"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Japanese Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Queen Diane"
//                       type="text"
//                       disabled={isPending}
//                     />
//                     <FormMessage />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="jpTag"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Japanese Tag</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Queen Diane"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />

//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
//             <FormField
//               control={form.control}
//               name="slug"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Japanese Name</FormLabel>
//                   <FormControl>
//                     <div className="relative w-full">
//                       <Input
//                         {...field}
//                         placeholder="Queen Diane"
//                         type="text"
//                         disabled={isPending}
//                         value={slug}
//                       />
//                       <Button
//                         onClick={generateSlug}
//                         type="button"
//                         className="!absolute right-0 top-0 rounded"
//                       >
//                         Generate Slug
//                       </Button>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="imageUrl"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Image URL</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Queen Diane"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
//             <FormField
//               control={form.control}
//               name="game"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Game</FormLabel>
//                   <Select
//                     disabled={isPending}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select a game!" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <FormMessage />

//                     <SelectContent>
//                       <SelectItem value={Game.Base}>Base</SelectItem>
//                       <SelectItem value={Game.AOT}>Attack On Titan</SelectItem>
//                       <SelectItem value={Game.KOF}>King Of Fighters</SelectItem>
//                       <SelectItem value={Game.Mave}>MAVE:</SelectItem>
//                       <SelectItem value={Game.Mushoku}>
//                         Mushoku Tensei
//                       </SelectItem>
//                       <SelectItem value={Game.Overlord}>Overlord</SelectItem>
//                       <SelectItem value={Game.ReZero}>Re:Zero</SelectItem>
//                       <SelectItem value={Game.ShieldHero}>
//                         Shield Hero
//                       </SelectItem>
//                       <SelectItem value={Game.StrangerThings}>
//                         Stranger Things
//                       </SelectItem>
//                       <SelectItem value={Game.TOG}>Tower Of God</SelectItem>
//                       <SelectItem value={Game.Tensura}>Tensura</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="crossover"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Crossover</FormLabel>
//                   <Select
//                     disabled={isPending}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select if the unit is a crossover or not." />
//                       </SelectTrigger>
//                     </FormControl>
//                     <FormMessage />

//                     <SelectContent>
//                       <SelectItem value={Crossovers.NotCrossover}>
//                         Not Crossover
//                       </SelectItem>
//                       <SelectItem value={Crossovers.Crossover}>
//                         Crossover
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="event"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Event</FormLabel>
//                   <Select
//                     disabled={isPending}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select if the unit is an event unit or not." />
//                       </SelectTrigger>
//                     </FormControl>
//                     <FormMessage />

//                     <SelectContent>
//                       <SelectItem value={GameEvent.None}>None</SelectItem>
//                       <SelectItem value={GameEvent.Summer}>Summer</SelectItem>
//                       <SelectItem value={GameEvent.Christmas}>
//                         Christmas
//                       </SelectItem>
//                       <SelectItem value={GameEvent.Valentine}>
//                         Valetine
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//           </div>
//           <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
//             <FormField
//               control={form.control}
//               name="race"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Race</FormLabel>
//                   <Select
//                     disabled={isPending}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select the units race." />
//                       </SelectTrigger>
//                     </FormControl>
//                     <FormMessage />

//                     <SelectContent>
//                       <SelectItem value={Race.Demon}>Demon</SelectItem>
//                       <SelectItem value={Race.Fairy}>Fairy</SelectItem>
//                       <SelectItem value={Race.Giant}>Giant</SelectItem>
//                       <SelectItem value={Race.Goddess}>Goddess</SelectItem>
//                       <SelectItem value={Race.Human}>Human</SelectItem>
//                       <SelectItem value={Race.HumanGiant}>
//                         Human / Giant
//                       </SelectItem>
//                       <SelectItem value={Race.Unknown}>Unknown</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="attribute"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Attribute</FormLabel>
//                   <Select
//                     disabled={isPending}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select the units attribute." />
//                       </SelectTrigger>
//                     </FormControl>
//                     <FormMessage />

//                     <SelectContent>
//                       <SelectItem value={Attribute.HP}>HP</SelectItem>
//                       <SelectItem value={Attribute.Speed}>Speed</SelectItem>
//                       <SelectItem value={Attribute.Strength}>
//                         Strength
//                       </SelectItem>
//                       <SelectItem value={Attribute.Dark}>Dark</SelectItem>
//                       <SelectItem value={Attribute.Light}>Light</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="rarity"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Rarity</FormLabel>
//                   <Select
//                     disabled={isPending}
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select the units rarity." />
//                       </SelectTrigger>
//                     </FormControl>
//                     <FormMessage />

//                     <SelectContent>
//                       <SelectItem value={Rarity.R}>R</SelectItem>
//                       <SelectItem value={Rarity.SR}>SR</SelectItem>
//                       <SelectItem value={Rarity.SSR}>SSR</SelectItem>
//                       <SelectItem value={Rarity.UR}>UR</SelectItem>
//                       <SelectItem value={Rarity.LR}>LR</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//           </div>
//           <h2 className="text-3xl leading-tight font-extrabold pb-3">
//             Basic Info
//           </h2>
//           <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
//             <FormField
//               control={form.control}
//               name="combatClass"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Combat Class</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="1"
//                       type="number"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="attack"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Attack</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="1"
//                       type="number"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="defense"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Defense</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="1"
//                       type="number"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="hp"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>HP</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="1"
//                       type="number"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="pierceRate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Pierce Rate</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="resistance"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Resistance</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="regeneration"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Regeneration</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="critChance"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Critical Chance</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="critDamage"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Crit Damage</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="critResistance"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Crit Resistance</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="critDefense"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Crit Defense</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="recoveryRate"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Recovery Rate</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="lifesteal"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Life Steal</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="gender"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Gender</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Female"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="bloodType"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Blood Type</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="age"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Age</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="21"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="birthday"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Birthday</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="19/02/2100"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormDescription>dd/mm/yyyy</FormDescription>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="height"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Height</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="183"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormDescription>CM</FormDescription>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="weight"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Height</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="62"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormDescription>KG</FormDescription>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="location"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Location</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Vaizel"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="CV"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>CV</FormLabel>
//                   <FormControl>
//                     <Input
//                       {...field}
//                       placeholder="Name"
//                       type="text"
//                       disabled={isPending}
//                     />
//                   </FormControl>
//                   <FormDescription>Voice Actors Name</FormDescription>
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="gifts"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Gifts</FormLabel>
//                   <Select
//                     disabled={
//                       isPending ||
//                       Gifts?.length === undefined ||
//                       Gifts.length <= 0
//                     }
//                     onValueChange={field.onChange}
//                     defaultValue={field.name}
//                   >
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue
//                           placeholder={
//                             (Gifts?.length ?? 0) > 1
//                               ? "Select a gift!"
//                               : "No Gifts Available!"
//                           }
//                         />
//                       </SelectTrigger>
//                     </FormControl>
//                     <FormMessage />

//                     <SelectContent>
//                       {Gifts?.map((gift) => (
//                         <SelectItem key={gift.name} value={gift.name}>
//                           {gift.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormItem>
//               )}
//             />
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

// export default AddCharacterForm;
