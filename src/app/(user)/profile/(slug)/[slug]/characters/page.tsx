import { getCharacterCount } from "@/data/character";
import { getUserDataByUsername } from "@/prisma/queries";
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
import { ArrowLeft, Eye, Package } from "lucide-react";
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
    },
    take: 4,
  });

  return data;
}

type Params = Promise<{ slug: string }>;

export default async function UserCharacterPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const session = await auth();

  console.log(slug);

  const data = await getUserDataByUsername({ username: slug as string });

  if (!data) {
    return notFound();
  }

  const collection = await getCollection(data.id as string);
  const characters = await getCharacterCount();

  return (
    <div className="pt-[3rem] min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-6">
          <Link href={`/profile/${slug}`}>
            <Button variant={"ghost"} className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Profile
            </Button>
          </Link>
          <UserBanner
            username={slug}
            imageUrl={data.image || ""}
            role={data.role}
            boxCC={data?.boxCC || "11,000,000"}
            inGameRank={data?.ingameRank || "110"}
          />
        </div>
        <Card className="animate-fade-in-up bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl font-bold flex flex-col gap-1">
                Character Collection
                <span className="text-xs text-muted-foreground">
                  {collection.filter((item) => item.character).length} /{" "}
                  {characters} Collected
                </span>
              </CardTitle>
              {session?.user.username === slug && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                  <Eye className="h-3 w-3" />
                  Public
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {collection.length > 0 ? (
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
                          character.character?.imageUrl || "/placeholder.svg"
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
                          <p className="text-white/50 text-xs">
                            {new Date(character.createdAt).toLocaleDateString()}
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
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-6 rounded-full bg-muted/50 mb-4">
                  <Package className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  No Characters Yet
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {data.username === slug
                    ? "Start your journey in 7 Deadly Sins: Grand Cross and collect powerful characters!"
                    : `${slug} hasn't collected any characters yet.`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
