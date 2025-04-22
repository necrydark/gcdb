import { getUserData } from "@/prisma/queries";
import SmallCharacterCard from "@/src/components/small-character-card";
import SmallFoodCard from "@/src/components/small-food-card";
import { Button } from "@/src/components/ui/button";
import { currentUser } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { cn } from "@/src/lib/utils";
import { ProfileColour } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import React from "react";
import testimg from "../../../../public/test-bg.png";

import CardSection from "./(slug)/[slug]/card-section";
import SmallCardSection from "./(slug)/[slug]/small-card-section";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { UserBanner } from "@/src/components/profile/user-banner";
import NotFound from "../../not-found";

// async function getFavourites(userId: string) {
//   const data = await db.character.findMany({
//     select: {
//       name: true,
//       imageUrl: true,
//       basicInfo: true,
//       Favourite: {
//         where: {
//           userId: userId,
//         },
//       },
//     },
//   });

//   return data;
// }

const profile = {
  favoriteCharacters: [
    {
      name: "Meliodas",
      attribute: "Strength",
      race: "Demon",
      rarity: "SSR",
      imageUrl:
        "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    },
    {
      name: "Elizabeth",
      attribute: "HP",
      race: "Goddess",
      rarity: "UR",
      imageUrl:
        "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    },
    {
      name: "Ban",
      attribute: "HP",
      race: "Human",
      rarity: "SSR",
      imageUrl:
        "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    },
    {
      name: "King",
      attribute: "Strength",
      race: "Fairy",
      rarity: "SSR",
      imageUrl:
        "https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png",
    },
  ],
  recentComments: [
    {
      text: "Just pulled the new Escanor! Can't wait to try him out in PvP!",
      timestamp: "2 hours ago",
    },
    {
      text: "Anyone have tips for clearing the latest story chapter?",
      timestamp: "1 day ago",
    },
    {
      text: "Looking for active guild members. DM if interested!",
      timestamp: "3 days ago",
    },
  ],
};

async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }


  const data =  await getUserData({ userId: user.id as string });

  const names = ["Meliodas", "Elizabeth", "Diane", "Zeldris", "Escanor"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  // const userData = await getData(user.id as string);
  // const userFavourites = await getFavourites(user.id as string);
  const cardColour = data?.profileColour;
  const colour = cardColour?.toLocaleLowerCase();

  const cardColours = (userColour: string): string => {
    const colours: Record<string, string> = {
      purple: "dark:bg-purple-950 bg-purple-800",
      pink: "dark:bg-pink-950 bg-pink-800",
      red: "dark:bg-red-950 bg-red-800",
      orange: "dark:bg-orange-950 bg-orange-800",
      yellow: "dark:bg-yellow-950 bg-yellow-800",
      green: "dark:bg-green-950 bg-green-800",
      blue: "dark:bg-blue-950 bg-blue-800",
      cyan: "dark:bg-cyan-950 bg-cyan-800",
    };
    return colours[userColour] || "dark:bg-purple-950 bg-purple-800";
  };



  return (
    <div className="container mx-auto p-4 pt-[6rem]">
      {/* Banner, Avatar, and User Info */}
      <div className="mb-8">
        <UserBanner
          username={data?.username || randomName}
          imageUrl={data?.image || undefined}
          role={data?.role || "USER"}
          colour={colour}
          inGameRank={data?.ingameRank || "110"}
          boxCC={data?.boxCC || "11,000,000"}
        />
      </div>

      {/* Favorite Characters */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">
          Favorite Characters
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {profile.favoriteCharacters.map((character, index) => (
            <Card
              key={index}
              className={`${cardColours(
                colour as string
              )} border-0 rounded-[5px]`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    src={character.imageUrl || "/placeholder.svg"}
                    alt={character.name}
                    width={80}
                    height={80}
                    // className="rounded-full"
                  />
                  <div className="text-center">
                    <h3 className="font-semibold text-white">
                      {character.name}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-muted-foreground">
                      {character.attribute}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-muted-foreground">
                      {character.race}
                    </p>
                    <Badge
                      className="mt-1  text-white"
                      variant={
                        colour as
                          | "red"
                          | "green"
                          | "blue"
                          | "yellow"
                          | "orange"
                          | "pink"
                          | "cyan"
                          | "purple"
                          | null
                          | undefined
                      }
                    >
                      {character.rarity}
                    </Badge>
                  </div>
                  <Button
                    variant={
                      colour as
                        | "red"
                        | "green"
                        | "blue"
                        | "yellow"
                        | "orange"
                        | "pink"
                        | "cyan"
                        | "purple"
                        | null
                        | undefined
                    }
                    className="w-full mt-2 text-white rounded-[5px] "
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Comments */}
      <div className="pb-[5rem]">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">
          Recent Comments
        </h2>
        <div className="space-y-4">
          {profile.recentComments.map((comment, index) => (
            <Card
              key={index}
              className={`${cardColours(colour as string)} border-0`}
            >
              <CardContent className="p-4">
                <div className="flex flex-row items-center justify-between">
                <p className="text-white">{comment.text}</p>
                <p className="text-sm text-white dark:text-muted-foreground mt-2">
                {comment.timestamp}
                </p>
                </div>
               
                <Button
                  variant={
                    colour as
                      | "red"
                      | "green"
                      | "blue"
                      | "yellow"
                      | "orange"
                      | "pink"
                      | "cyan"
                      | "purple"
                      | null
                      | undefined
                  }
                  className="mt-4 rounded-[5px]"
                >
                  View
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    // <div className=" flex flex-col pb-20">
    //   {/* Banner */}
    //   <div>
    //     <Image
    //       alt={`${data?.username}'s Banner`}
    //       priority
    //       width={1920}
    //       height={200}
    //       src={data?.banner ?? testimg}
    //       className="h-[200px] w-full object-cover border-b-[1px] border-b-white"
    //     />

    //     {/* Profile Picture */}
    //     <Image
    //       src={
    //         data?.image ??
    //         "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
    //       }
    //       alt="User profile picture"
    //       priority
    //       width={75}
    //       height={75}
    //       className="rounded-full aspect-[1] border mx-auto -translate-y-[35px] border-white"
    //     />
    //     {/* Username */}
    //     <div className="flex flex-row justify-center items-center">
    //       <h1 className="text-3xl pr-[10px] font-extrabold text-center -translate-y-[25px] tracking-tight">
    //         {data?.username ?? randomName}
    //       </h1>
    //       <Badge
    //         className=" -translate-y-[20px] border-transparent text-white "
    //         variant={
    //           colour as
    //             | "red"
    //             | "green"
    //             | "blue"
    //             | "yellow"
    //             | "orange"
    //             | "pink"
    //             | "cyan"
    //             | "purple"
    //             | null
    //             | undefined
    //         }
    //       >
    //         {data?.role === "USER"
    //           ? "User"
    //           : data?.role === "ADMIN"
    //           ? "Admin"
    //           : data?.role === "OWNER"
    //           ? "Owner"
    //           : null}
    //       </Badge>
    //     </div>
    //   </div>

    //   {/* Profile Section */}
    //   <div className="max-w-[1200px] md:mx-auto md:px-0 px-8">
    //     <p className="py-4 px-2">{data?.bio ?? "No Bio Found"}</p>
    //     <div className="flex justify-between items-center mt-6 flex-row">
    //       <h1 className="md:text-3xl text-2xl font-extrabold tracking-tight">
    //         Your Recent Favourites
    //       </h1>
    //       <Button
    //         className="hover-btn"
    //         variant={
    //           colour as
    //             | "red"
    //             | "green"
    //             | "blue"
    //             | "yellow"
    //             | "orange"
    //             | "pink"
    //             | "cyan"
    //             | "purple"
    //             | null
    //             | undefined
    //         }
    //         asChild
    //       >
    //         <Link href={"/profile/favourites"}>View All Favourites</Link>
    //       </Button>
    //     </div>
    //     <CardSection sectionColour={cardColour as ProfileColour}>
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
    //         {/* @TODO: Add recent favourites from DB */}
    //         <SmallCharacterCard
    //           attribute="Strength"
    //           imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
    //           name="Queen Diane"
    //           race="Giant"
    //           rarity="SSR"
    //           slug="queen_diane_2"
    //           colour={colour as ProfileColour}
    //         />
    //         <SmallCharacterCard
    //           attribute="Strength"
    //           imageUrl="https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png"
    //           name="Jue Viole Grace"
    //           race="Human"
    //           rarity="SSR"
    //           slug="jue_viole_grace"
    //           colour={colour as ProfileColour}
    //         />
    //         <SmallCharacterCard
    //           attribute="HP"
    //           imageUrl="https://gcdatabase.com/images/characters/alioni/rg_portrait.webp"
    //           name="Alioni"
    //           race="Human"
    //           rarity="R"
    //           slug="alioni"
    //           colour={colour as ProfileColour}
    //         />
    //         <SmallCharacterCard
    //           attribute="HP"
    //           imageUrl="https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp"
    //           name="Eren Yeager"
    //           race="Human / Giant"
    //           rarity="SSR"
    //           slug="eren_yeager"
    //           colour={colour as ProfileColour}
    //         />
    //       </div>
    //     </CardSection>
    //   </div>
    // </div>
  );
}

export default ProfilePage;

// {
/* {userFavourites.length === 0 ? (
            <div className="flex flex-row items-center">
              <p className="pr-2 font-semibold leading-tight">
                You have no favourites!
              </p>
              <Button
                asChild
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                <Link className="pl-2 " href={"/characters"}>
                  Visit the characters page
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              {userFavourites.map((favourite, idx) => (
                <div key={idx}>
                  <Image
                    src={
                      favourite?.character?.imageUrl ??
                      "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                    }
                    alt={favourite?.character?.name ?? "Character Image"}
                    priority
                    width={75}
                    height={75}
                  />
                  <h1 className="text-xl font-extrabold tracking-tight">
                    {favourite?.character?.name ?? "Character Name"}
                  </h1>
                  <Link href={`/characters/${favourite?.character?.slug}`}>
                    View
                  </Link>
                </div>
              ))}
            </div>
          )} */
// }
