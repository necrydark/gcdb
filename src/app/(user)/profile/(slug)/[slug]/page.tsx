import { getCharacterCount } from "@/data/character";
import { getRelicCount } from "@/data/relics";
import { getUserDataByUsername } from "@/prisma/queries";
import { getCommentsByUser } from "@/src/actions/comments";
import { auth } from "@/src/auth";
import { UserBanner } from "@/src/components/profile/user-banner";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import db from "@/src/lib/db";
import { ArrowRight, MessageSquare, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getCollection(userId: string) {
  const data = await db.collection.findMany({
    where: {
      userId: userId,
    },
    include: {
      character: true,
      relic: true,
    },
    take: 4,
  });

  return data;
}

type Params = Promise<{ slug: string }>;

async function ProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const session = await auth();

  const data = await getUserDataByUsername({ username: slug as string });

  if (!data) {
    return notFound();
  }

  const collection = await getCollection(data.id as string);
  const comments = await getCommentsByUser(data.id as string);
  const relics = await getRelicCount();
  const characters = await getCharacterCount();
  const names = ["Meliodas", "Elizabeth", "Diane", "Zeldris", "Escanor"];
  const randomName = names[Math.floor(Math.random() * names.length)];

  return (
    <div>
      {/* Banner */}
      <div className="container mx-auto p-4 pt-[6rem]">
        <div className="mb-8">
          <UserBanner
            username={data?.displayUsername || randomName}
            imageUrl={data?.image || undefined}
            role={data?.role}
            boxCC={data?.boxCC || "11,000,000"}
            inGameRank={data?.ingameRank || "110"}
            ownProfile={slug === data.username}
          />
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
              <CardHeader className="border-b flex flex-row justify-between items-center">
                <CardTitle className="text-black dark:text-white flex flex-col gap-1">
                  {data.username}&apos;s Recent Characters
                  <span className="text-xs text-muted-foreground">
                    {collection.filter((item) => item.character).length} /{" "}
                    {characters} Collected
                  </span>
                </CardTitle>
                <div>
                  <Link href={`/profile/${data.username}/characters`}>
                    <Button variant={"ghost"} size={"sm"}>
                      View More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
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
                      {session?.user.username === data.username
                        ? `No characters collected yet`
                        : `No characters to display`}
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      {session?.user.username === data.username
                        ? "Start your collection journey today!"
                        : "Check back later for updates!"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
              <CardHeader className="border-b flex flex-row justify-between items-center">
                <CardTitle className="text-black dark:text-white flex flex-col gap-1">
                  {data.username}&apos;s Recent Relics
                  <span className="text-xs text-muted-foreground">
                    {collection.filter((item) => item.relic).length} / {relics}{" "}
                    Collected
                  </span>
                </CardTitle>
                <div>
                  <Link href={`/profile/${data.username}/relics`}>
                    <Button variant={"ghost"} size={"sm"}>
                      View More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
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
                      {session?.user.username === data.username
                        ? `No relics collected yet`
                        : `No relics to display`}
                    </p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      {session?.user.username === data.username
                        ? "Start your collection journey today!"
                        : "Check back later for updates!"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="pb-[5rem]">
          <Card className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
            <CardHeader className="border-b flex flex-row justify-between items-center">
              <CardTitle className="text-black dark:text-white">
                {data.username}&apos;s Recent Comments
              </CardTitle>
              <Link href={`/profile/${data.username}/comments`}>
                <Button variant={"ghost"} size={"sm"}>
                  View More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
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
                    {session?.user.username === data.username
                      ? "No comments yet"
                      : "No comments to display"}
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-1">
                    {session?.user.username === data.username
                      ? "Share your thoughts on character pages!"
                      : "Check back later for updates!"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
