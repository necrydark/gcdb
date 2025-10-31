import { getUserData } from "@/prisma/queries";
import { getCommentsByUser } from "@/src/actions/comments";
import { UserBanner } from "@/src/components/profile/user-banner";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import db from "@/src/lib/db";
import { currentUser } from "@/src/utils/auth";
import { ArrowRight, MessageSquare, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getCollection(userId: string) {
  const res = await db.collection.findMany({
    where: {
      userId: userId,
    },
    include: {
      character: true,
      relic: true,
    },
  });

  return res;
}

async function getAchievements(userId: string) {
  const res = await db.userAchievement.findMany({
    where: { userId },
    include: {
      achievement: true,
    },
  });
  return res;
}

async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const collection = await getCollection(user.id as string);
  const data = await getUserData({ userId: user.id as string });
  const comments = await getCommentsByUser(user.id as string);
  const achievements = await getAchievements(user.id as string);

  const names = ["Meliodas", "Elizabeth", "Diane", "Zeldris", "Escanor"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  const formattedAchievements = achievements
    ?.filter((a) => a.unlocked === true)
    .map((achievement) => ({
      name: achievement.achievement.name,
      imageUrl: achievement.achievement.imageUrl,
      description: achievement.achievement.description,
    }));

  // const isPremium =
  // user?.subscriptionStatus === "active" &&
  // user?.stripePriceId === process.env.NEXT_PUBLIC_PREMIUM_PRICE_ID;
  const isBasic =
    user?.subscriptionStatus === "active" &&
    user?.stripePriceId === process.env.NEXT_PUBLIC_BASIC_PRICE_ID;

  console.log(user?.subscriptionStatus);
  console.log(user?.stripePriceId);

  return (
    <div className="container mx-auto max-w-6xl p-4 pt-[6rem]">
      {/* Banner, Avatar, and User Info */}
      <div className="mb-8">
        <UserBanner
          username={data?.displayUsername || randomName}
          imageUrl={data?.image || undefined}
          role={data?.role || "USER"}
          inGameRank={data?.ingameRank || "110"}
          boxCC={data?.boxCC || "11,000,000"}
          achievements={JSON.parse(JSON.stringify(formattedAchievements))}
          isBasic={isBasic}
          // isPremium={isPremium}
        />
      </div>

      {/* Favorite Characters */}
      <div className="mb-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
            <CardHeader className="border-b flex flex-row justify-between items-center">
              <CardTitle className="text-black dark:text-white">
                Recent Characters
              </CardTitle>
              <div>hello2</div>
            </CardHeader>
            <CardContent className="p-6">
              {collection.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {collection
                      .filter((item) => item.character)
                      .slice(0, 4)
                      .map((character, index) => (
                        <div
                          key={character.id}
                          className="group relative aspect-square rounded-lg overflow-hidden bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105 animate-fade-in-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <Image
                            src={
                              character.character?.imageUrl ||
                              "/placeholder.svg"
                            }
                            alt={character.character?.name || "Character"}
                            width={80}
                            height={80}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-sm font-semibold text-balance line-clamp-2">
                                {character.character?.name}
                              </p>
                              {/* {item.rarity && (
                      <div className="flex gap-0.5 mt-1">
                        {Array.from({ length: item.rarity }).map((_, i) => (
                          <span key={i} className="text-chart-4 text-xs">
                            ★
                          </span>
                        ))}
                      </div>
                    )}
                    {item.set && <p className="text-white/70 text-xs mt-1">{item.set}</p>} */}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    No characters collected yet
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Start your collection journey today!
                  </p>
                  <Link href={"/characters"}>
                    <Button variant={"ghost"} className="mt-2">
                      Add a character
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
          {/* <div>
            {collection.length > 0 ? (
              <>
                <div className="flex flex-row justify-between gap-4 items-center mb-4">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl   text-white">
                    Characters
                  </h2>
                  <Link
                    href={"/profile/collected"}
                    className="inline-flex text-white items-center"
                  >
                    View All <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {collection
                    .filter((item) => item.character)
                    .map((character) => (
                      <Card
                        key={character.character?.id}
                        className={`border-0 rounded-[5px]`}
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center space-y-4">
                            <Image
                              src={
                                character.character?.imageUrl ||
                                "/placeholder.svg"
                              }
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
                              <Badge className="mt-1  text-white">
                                {character.character?.rarity}
                              </Badge>
                            </div>
                            <Link
                              className="w-full"
                              href={`/characters/${character.character?.slug}`}
                            >
                              <Button className="w-full mt-2 text-white rounded-[5px] ">
                                View
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </>
            ) : (
              <div className="bg-purple-950 p-6 flex flex-col justify-center items-center rounded-md">
                <h2 className="text-3xl font-bold tracking-tighter md:text-3xl mb-4 text-white text-center">
                  You have not added a character to your collection.
                </h2>
                <Button>
                  <Link href={"/characters"}>Add A Character</Link>
                </Button>
              </div>
            )}
          </div> */}
          <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
            <CardHeader className="border-b flex flex-row justify-between items-center">
              <CardTitle className="text-black dark:text-white">
                Recent Relics
              </CardTitle>
              <Link href={"/profile/relics"}>
                <Button variant={"ghost"} size={"sm"}>
                  View More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-6">
              {collection.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {collection
                      .filter((item) => item.relic)
                      .slice(0, 4)
                      .map((relic, index) => (
                        <div
                          key={relic.id}
                          className="group relative aspect-square rounded-lg overflow-hidden bg-muted/50 hover:bg-muted transition-all duration-300 hover:scale-105 animate-fade-in-up"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <Image
                            src={relic.relic?.imageUrl || "/placeholder.svg"}
                            alt={relic.relic?.name || "Character"}
                            width={80}
                            height={80}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-sm font-semibold text-balance line-clamp-2">
                                {relic.relic?.name}
                              </p>
                              {/* {item.rarity && (
                   <div className="flex gap-0.5 mt-1">
                     {Array.from({ length: item.rarity }).map((_, i) => (
                       <span key={i} className="text-chart-4 text-xs">
                         ★
                       </span>
                     ))}
                   </div>
                 )}
                 {item.set && <p className="text-white/70 text-xs mt-1">{item.set}</p>} */}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-4 rounded-full bg-muted/50 mb-4">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    No relics collected yet
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    Start your collection journey today!
                  </p>
                  <Link href={"/relics"}>
                    <Button variant={"ghost"} className="mt-2">
                      Add a relic
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
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
        <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
          <CardHeader className="border-b">
            <CardTitle className="text-black dark:text-white">
              Recent Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {comments && comments?.length > 0 ? (
              <div className="space-y-4">
                {comments?.map((comment: any, index: any) => (
                  <div
                    key={comment.id}
                    className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h4 className="font-semibold text-foreground">
                        {comment.characterName}
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {comment.comment}
                    </p>
                  </div>
                  // <CommentCard
                  //   key={index}
                  //   comment={comments[index]}
                  //   idx={index}
                  //   userId={user.id || ""}
                  //   userRole={user.role || "USER"}
                  // />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 rounded-full bg-muted/50 mb-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground font-medium">
                  No comments yet
                </p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Share your thoughts on character pages!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProfilePage;
