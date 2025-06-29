import { getCommentsFromDb } from "@/src/actions/comments";
import CharacterHeader from "@/src/components/characters/character-header";
import CharacterTabs from "@/src/components/characters/character-tabs";
import CommentsForm from "@/src/components/characters/comments-form";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { formatDate } from "@/src/lib/date-format";
import db from "@/src/lib/db";
import { CharacterMiscInfo, Talent, Unity } from "@/src/types/character";
import { Passive } from "@/src/types/passive";
import { currentUser } from "@/src/utils/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import stupidhusky from "@/public/stupid-husky.jpg"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { Comment } from "@prisma/client";

async function getCharacterFromDb(slug: string){
  try{ 
    const character = await db.character.findUnique({
      where: {
        slug
      },
      select: {
        id: true,
        name: true,
        jpName: true,
        tag: true,
        jpTag: true,
        event: true,
        imageUrl: true,
        slug: true, // Include slug as it's used for linking
        attribute: true,
        race: true,
        rarity: true,
        game: true,
        Crossover: true,

        // Add the missing fields listed in the error message:
        gender: true,
        bloodType: true,
        age: true, // Assuming age is a simple type (string or number)
        birthday: true, // Assuming birthday is a string

        // Add the other 6 missing properties (you'll need to identify them from your Character schema)
        // Example (replace with your actual missing fields):
        height: true,
        weight: true,
        location: true,
        cv: true,
        releaseDate: true,
        // Assuming passiveName, etc. were among the 14 you had before
        collection: {
          select: {
            userId: true
          }
        },
        stats: true,

        ultimate: {
           select: {
             id: true, 
             name: true,
             jpName: true,
             imageUrl: true,
             characterId: true,
             description: true,
             extraInfo: true,

           }
        },
        talent: {
          select: {
            name: true,
            jpName: true,
            imageUrl:true,
            description: true,
          }
        },
        unity: {
          select: {
            name: true,
            jpName:true,
            imageUrl: true,
            description: true,
          }
        },

        skills: {
          select: {
            id: true, name: true, jpName: true, imageUrl: true, characterId: true,
            skillRanks: true, // You likely need skill ranks too
          }
        },
        gift: true,
        food: true,
        passiveSkillId:true,
        talentId:true,
        unityId:true,
        passiveSkill: {
          select: {
            name: true,
            jpName: true,
            imageUrl: true,
            description: true,
            ccNeeded: true,
          }
        },
        holyRelicId: true, // Select the foreign key if needed
        holyRelic: { // If you need details of the holy relic
          select: {
            id: true,
            name: true,
            imageUrl: true,
            effect: true,
            releaseDate: true,
            attack: true,
            defense: true,
            hp: true,
            beast: true,
            enhancable: true,
            enhanceAttack: true,
            enhanceDefense: true,
            enhanceHp: true,
            // You might also need to select materials if the receiving component uses them
            materials: {
              select: {
                id: true, name: true, imageUrl: true, // Select material fields
              }
            },
            enhanceMaterials: {
              select: {
                id: true, name: true, imageUrl: true,
              }
            }
         }
         }
      }
    })

    if(!character) {
      return null;
    }

    return character;
  } catch(err){
    console.error(err)
  }
}

export default async function CharacterPage(props: any) {
  const params = await props.params;

  const {
    slug
  } = params;

  const user = await currentUser();
  //find a character using custom handler

  const character = await getCharacterFromDb(slug);
  const comments = await getCommentsFromDb(character?.id as string)

  if(!character?.ultimate) { 
     return <div>Missing character data</div>;
  }
  // console.log(character); - USED FOR DEBUGGING

//   const passive: Passive = {
//     name: character?.passiveName || "",
//     jpName: character?.passiveJpName || "",
//     imageUrl: character?.passiveImageUrl || "", // Ensure imageUrl is handled correctly (string or null/undefined)
//     ccNeeded: character?.passiveCCNeeded || "", // Ensure type matches Passive definition
//     description: character?.passiveDescription || "",
// }

  const miscInfo: CharacterMiscInfo = {
    gender: character?.gender || "",
    location: character?.location || "",
    age: character?.age || "",
    birthday: character?.birthday || "",
    bloodType: character?.bloodType || "",
    CV: character?.cv || "",
    height: character?.height || "",
    weight: character?.weight || ""
  }


  const unity: Unity = {
    name: character?.unity?.name || "",
    jpName: character?.unity?.jpName || "",
    imageUrl: character?.unity?.imageUrl || "",
    description: character?.unity?.description || "",

  }

  const talent: Talent = {
    name: character?.talent?.name || "",
  jpName: character?.talent?.jpName || "",
    imageUrl: character?.talent?.imageUrl || "",
    description: character?.talent?.description || "",
  }


  // If a character is not found then redirect to the characters page and display a message
  if (!character) {
    return <div>Character Not Found....</div>;
  }



  return (
    <div className="p-10 pt-[7rem] container mx-auto max-w-6xl ">
      {/* Header */}
      <CharacterHeader
      character={character}
      isCollected={user && character.collection && Array.isArray(character.collection) ? character.collection.some(collected => collected.userId === user.id) : false}
      />
      {(user?.role === "OWNER" || user?.role === "ADMIN" || user?.role === "COOWNER") && (
       <div className="my-4 flex flex-row gap-4">
        <Button className="rounded-[5px] bg-purple-500 hover:bg-purple-600 dark:bg-purple-800 text-white dark:hover:bg-purple-900" asChild>
          <Link href={`/dashboard/characters/edit/${character.id}`}>
          Edit
          </Link>
        </Button>
 
       </div>
      )}
      <CharacterTabs 
        character={character} 
        skills={character.skills || []}
      relic={character?.holyRelic || undefined}
        stats={character?.stats || []}
        // passive={passive || ""}
        gift={character?.gift}
        miscInfo={miscInfo}
        // associations={character?.associations}
        ultimate={character?.ultimate || undefined}
        talent={talent}
        unity={unity}
      />
      {user ? (
          <div>
            <h1 className="text-3xl leading-tight font-extrabold mt-8 text-white py-5">
              Comments
            </h1>
            <CommentsForm
              characterId={character?.id?.toString() || "1"} 
              slug={character?.slug ?? ""}
            />
          </div>
        ) : (
          <div>
              <h1 className="text-3xl leading-tight font-extrabold mt-8 text-white py-5">
              Comments
            </h1>
            <p>You need to be logged in to post comments!</p>
          </div>
        )}

        <div className="mt-6 space-y-6">
          {comments?.map((comment: any, idx: number) => (
            <Card  className="bg-purple-400 px-2 dark:bg-purple-900 text-white rounded-[5px] dark:border-purple-400" key={idx}>
                <CardHeader className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-2">
                <Image 
                    src={stupidhusky}
                    alt={comment.comment}
                    width={75} 
                    height={75}
                    className="rounded-full object-cover"
                    />
                  <CardTitle className="flex flex-col gap-2">
                    <Link className="hover:underline" href={`/profile/${user?.username}`}>
                    {comment.user.username}
                    </Link>
                  <p className="text-xs">{formatDate(comment.createdAt.toLocaleDateString())}</p>
                  </CardTitle>
                </div>
                <div>
                  {(comment.id === user?.id  || user?.role === "ADMIN" || user?.role === "OWNER" || user?.role ==="COOWNER") && (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                          <EllipsisVertical className="h-4 w-4 text-white" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {/* Make these dialogs. */}
                      <DropdownMenuItem  className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">Edit</DropdownMenuItem>
                      <DropdownMenuItem  className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                </CardHeader>
                <CardContent>
                <div className="flex flex-row items-center justify-between">
                <p className="text-white">{comment.comment}</p>
                <p className="text-sm text-white dark:text-muted-foreground mt-2">
                </p>
                </div>
                </CardContent>
            </Card>
          ))}
        </div>
    </div>
  );
}
