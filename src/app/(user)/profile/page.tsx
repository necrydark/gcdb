import { getUserData } from "@/prisma/queries";
import { Button } from "@/src/components/ui/button";
import { currentUser } from "@/src/utils/auth";
import db from "@/src/lib/db";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { UserBanner } from "@/src/components/profile/user-banner";
import { deleteComment, getCommentsByUser } from "@/src/actions/comments";
import { formatDate } from "@/src/lib/date-format";
import chineseman from "/public/chinese.png"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { ArrowRight, EllipsisVertical } from "lucide-react";
import CommentCard from "@/src/components/comment-card";

async function getCollection(userId: string) {
  const res = await db.collection.findMany({
    where: {
      userId: userId
    },
    include: {
      character: true,
      relic: true
    }
  })

  return res;
}

async function getAchievements(userId: string) {
  const res = await db.userAchievement.findMany({
    where: { userId},
    include: {
      achievement: true
    }
  })
  return res;
}


async function ProfilePage() {
  const user = await currentUser();

  
  if (!user) {
    redirect("/auth/login");
}

  const collection = await getCollection(user.id as string)
  const data =  await getUserData({ userId: user.id as string });
  const comments = await getCommentsByUser(user.id as string)
  const achievements = await getAchievements(user.id as string);

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

  const formattedAchievements = achievements?.filter(a => a.unlocked === true).map((achievement => ({
    name: achievement.achievement.name,
    imageUrl: achievement.achievement.imageUrl,
    description: achievement.achievement.description,
  })))


  const isPremium =
  user?.subscriptionStatus === "active" &&
  user?.stripePriceId === process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID;
const isBasic =
  user?.subscriptionStatus === "active" &&
  user?.stripePriceId === process.env.NEXT_PUBLIC_BASIC_PRICE_ID;

  console.log(user?.subscriptionStatus)
  console.log(user?.stripePriceId)

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-[6rem]">
      {/* Banner, Avatar, and User Info */}
      <div className="mb-8">
        <UserBanner
          username={data?.displayUsername || randomName}
          imageUrl={data?.image || undefined}
          role={data?.role || "USER"}
          colour={colour}
          inGameRank={data?.ingameRank || "110"}
          boxCC={data?.boxCC || "11,000,000"}
          achievements={JSON.parse(JSON.stringify(formattedAchievements))}
          isBasic={isBasic}
          isPremium={isPremium}
        />
      </div>

      {/* Favorite Characters */}
      <div className="mb-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
        <div>
          {collection.length > 0 ? (
                <>
                 <div className="flex flex-row justify-between gap-4 items-center mb-4">
                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl   text-white">
                  Characters
                 </h2>
                 <Link href={"/profile/collected"} className="inline-flex text-white items-center">
                 View All <ArrowRight className="h-4 w-4 ml-2" />
                 </Link>
                 </div>
              <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collection.
                filter((item) => item.character).
                map((character) => (
            <Card
              key={character.character?.id}
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
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4 text-white text-center">You have not added a character to your collection.</h2>
                <p className="text-center">Visit the character page to add a character to your collection!</p>
                </div>
          )}
        </div>
        <div>
          {collection.length > 0 ? (
                <>
                      <div className="flex flex-row justify-between gap-4 mb-4 items-center">
                 <h2 className="text-3xl font-bold tracking-tighter md:text-4xl  text-white">
                  Relics
                 </h2>
                 <Link href={"/profile/collected"} className="inline-flex text-white items-center">
                 View All <ArrowRight className="h-4 w-4 ml-2" />
                 </Link>
                 </div>
              <div  className="grid grid-cols-1 md:grid-cols-2  gap-4">
                {collection.
                filter((item) => item.relic).
                map((relic) => (
            <Card
              key={relic.relic?.id}
              className={`${cardColours(
                colour as string
              )} border-0 rounded-[5px] h-full`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  <Image
                    src={relic.relic?.imageUrl || "/placeholder.svg"}
                    alt={relic.relic?.name || "Relic"}
                    width={80}
                    height={80}
                  />
            
                  <div className="text-center space-y-4">
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
                  <p className="text-white">{relic.relic?.effect}</p>
                  
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
                </div></>
          ): (
              <div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4 text-white text-center">You have not added a character to your collection.</h2>
                <p className="text-center">Visit the character page to add a character to your collection!</p>
                </div>
          )}
        </div>
        </div>
      </div>

      {/* Achievements */}
      {/* <div className="mb-8">
          <div>
            <div>
              {achievements.length > 0 ? (
                 <>
                 <div className="flex flex-row justify-between gap-4 mb-4 items-center">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl  text-white">
                   Collected Achievements
                 </h2>
                 <Link href={"/profile/achievements"} className="inline-flex items-center">
                 View All <ArrowRight className="h-4 w-4 ml-2" />
                 </Link>
                 </div>

                 <div className="grid gird-cols-2 md:grid-cols-4 gap-4">
                  {achievements.slice(0,3).map((achievement, idx) => (
                    <Card    
                    key={idx}    
                    className={`${cardColours(
                      colour as string
                    )} border-0 rounded-[5px]`}
                    >
                      <CardContent className="p-4">
                      <div className="flex flex-col items-center space-y-4">
                        <Image src={achievement?.achievement.imageUrl}
                        alt={achievement.achievement.description}
                        className={achievement.unlocked ? "" : "grayscale"}
                        width={200}
                        height={200} />

                        <div className="text-center">
                        <h3 className="font-semibold text-white">
                      {achievement.achievement?.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {achievement.achievement.description}
                    </p>
                    <div className="flex flex-row gap-2 flex-wrap">
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
                      {achievement.achievement.category}
                    </Badge>
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
                      {achievement.achievement.type}
                    </Badge>
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
                      {achievement.unlocked ? "Unlocked" : "Not Unlocked" }
                    </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mt-2">{achievement.unlocked ? `Unlocked at ${achievement.unlockedAt?.toDateString()}` : ""}</p>
                        </div>
                      </div>
                      </CardContent>
                    </Card>
                  ))}
                 </div>
                 </>
              ) : (
                <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white text-center">You have no achievements yet.</h2>
                <p className="text-center">Create a comment, add a character to your collection and more to start earning achievements!</p>
                </div>
              )}
            </div>
          </div>
      </div> */}

      {/* Recent Comments */}
      <div className="pb-[5rem]">
       {comments && comments?.length > 0 ? (
        <>
           <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">
           Recent Comments
         </h2>
         <div className="space-y-4">
           {comments?.map((comment, index) => (
              <CommentCard key={index} comment={comments[index]} idx={index} userId={user.id || ""} userRole={user.role || "USER"} colour={colour || "purple"} />
           ))}
         </div></>
       ): (
        <div>
            You have not commented on any characters
          </div>
       )}
      </div>
    </div>
    
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
