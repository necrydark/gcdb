import { useCurrentUser } from "@/hooks/use-current-user";
import {
  getUserData,
  getUserDataByUsername,

} from "@/prisma/queries";
import SmallCharacterCard from "@/src/components/small-character-card";
import SmallFoodCard from "@/src/components/small-food-card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { currentUser } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { cn } from "@/src/lib/utils";
import { ExtendedUser } from "@/src/next-auth";
import { ProfileColour, User, UserRole } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import testimg from "../../../../../../public/test-bg.png";
import CardSection from "./card-section";
import SmallCardSection from "./small-card-section";
import { UserBanner} from "@/src/components/profile/user-banner"
import { Card, CardContent } from "@/src/components/ui/card";
import { getCommentsByUser } from "@/src/actions/comments";
import { formatDate } from "@/src/lib/date-format";
 

async function getCollection(userId: string) {
  const data = await db.collection.findMany({
    where: {
      userId: userId
    },
    include: {
      character: true,
      relic: true,
    },
    take: 2
  })

  return data;
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function ProfilePage({ params }: PageProps) {
  const { slug } = params;


  const data = await getUserDataByUsername({ username: slug as string });


  if (!data) {
    return notFound();
  }

  const collection = await getCollection(data.id as string)
  const comments = await getCommentsByUser(data.id as string)
  const names = ["Meliodas", "Elizabeth", "Diane", "Zeldris", "Escanor"];
  const randomName = names[Math.floor(Math.random() * names.length)];
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
    <div
      className={cn(
        " flex flex-col",
        colour === "red" && "bg-red-400 text-white dark:bg-red-800",
        colour === "blue" && "bg-blue-400 text-white dark:bg-blue-800",
        colour === "green" && "bg-green-400 text-white dark:bg-green-800",
        colour === "yellow" && "bg-yellow-400 text-white dark:bg-yellow-800",
        colour === "purple" && "bg-purple-400 text-white dark:bg-purple-800",
        colour === "orange" && "bg-orange-400 text-white dark:bg-orange-800",
        colour === "pink" && "bg-pink-400 text-white dark:bg-pink-800",
        colour === "cyan" && "bg-cyan-400 text-white dark:bg-cyan-800"
      )}
    >
      {/* Banner */}
      <div className="container mx-auto p-4 pt-[6rem]">
        <div className="mb-8">
          <UserBanner 
          username={data?.displayUsername || randomName} 
          imageUrl={data?.image || undefined} 
          role={data?.role} 
          colour={colour} 
          boxCC={data?.boxCC || "11,000,000"} 
          inGameRank={data?.ingameRank || "110"} />
        </div>

      {/* Profile Section */}
      <div className="mb-8">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div>
            {collection.length > 0 ? (
                <>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-white">
                  {data.username}&apos;s Collected Characters
                 </h2>
              <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collection
                .filter((item) => item.character)
                .map((character, index) => (
            <Card
              key={index}
              className={`${cardColours(
                colour as string
              )} border-0 rounded-[5px]`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    src={character.character?.imageUrl || "/placeholder.svg"}
                    alt={character.character?.name || "Character"}
                    width={80}
                    height={80}
                    // className="rounded-full"
                  />
                  <div className="text-center">
                    <h3 className="font-semibold text-white">
                      {character.character?.name}
                    </h3>
                    <p className="text-sm text-gray-400 dark:text-muted-foreground">
                      {character.character?.attribute}
                    </p>
                    <p className="text-sm text-gray-400 dark:text-muted-foreground">
                      {character.character?.race}
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
                      {character.character?.rarity}
                    </Badge>
                  </div>
                  <Link className="w-full" href={`/characters/${character.character?.slug}`}>
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
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
                </div></>
          ): (
              <div className="my-[6rem]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white text-center">  {data.username} has not favourited a character.</h2>
                </div>
          )}
            </div>
            <div>
            {collection.length > 0 ? (
                <>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4 text-white">
                  {data.username}&apos;s Collected Relics
                 </h2>
              <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collection
                .filter((item) => item.relic)
                .map((relic) => (
            <Card
              key={relic.id}
              className={`${cardColours(
                colour as string
              )} border-0 rounded-[5px]`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    src={relic.relic?.imageUrl || "/placeholder.svg"}
                    alt={relic.relic?.name || "Character"}
                    width={80}
                    height={80}
                    // className="rounded-full"
                  />
                  <div className="text-center">
                    <h3 className="font-semibold text-white">
                      {relic.relic?.name}
                    </h3>
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
                      {relic.relic?.beast}
                    </Badge>
                  <p>{relic.relic?.effect}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
                </div></>
          ): (
              <div className="my-[6rem]">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white text-center">  {data.username} has not favourited a character.</h2>
                </div>
          )}
            </div>
        </div>
      </div>


      <div className="pb-[5rem]">
      {comments && comments?.length > 0 ? (
        <>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">
         {data?.username}&apos;s Recent Comments
        </h2>
         <div className="space-y-4">
           {comments?.map((comment, index) => (
             <Card
               key={index}
               className={`${cardColours(colour as string)} border-0`}
             >
               <CardContent className="p-4">
                 <div className="flex flex-row items-center justify-between">
                 <p className="text-white">{comment.comment}</p>
                 <p className="text-sm text-white dark:text-muted-foreground mt-2">
                 {formatDate(comment.createdAt.toLocaleDateString())}
                 </p>
                 </div>
                 <Link href={`/characters/${comment.character.slug}`}>
                
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
                   </Link>
               </CardContent>
             </Card>
           ))}
         </div></>
       ): (
        <div>
            {data.username} has not commented on any pages.
          </div>
       )}
   
      </div>

      </div>
     
    </div>
  );
}

export default ProfilePage;

{
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
}
