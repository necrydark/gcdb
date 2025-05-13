import { getRelicById } from "@/data/relics";
import { getCommentsFromDb } from "@/src/actions/comments";
import { deleteCharacter } from "@/src/actions/delete-character";
import CharacterHeader from "@/src/components/characters/character-header";
import CharacterTabs from "@/src/components/characters/character-tabs";
import CommentsForm from "@/src/components/characters/comments-form";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { formatDate } from "@/src/lib/date-format";
import db from "@/src/lib/db";
import { CharacterMiscInfo } from "@/src/types/character";
import { Passive } from "@/src/types/passive";
import { currentUser } from "@/src/utils/auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import stupidhusky from "/public/stupid-husky.jpg"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

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
        CV: true,
        releaseDate: true,
        // Assuming passiveName, etc. were among the 14 you had before
        Collection: {
          select: {
            userId: true
          }
        },
        stats: true,

        ultimate: { // Assuming ultimate is a relation and you need its fields
           select: {
             id: true, // Select ultimate's ID if needed
             name: true,
             jpName: true,
             imageUrl: true,
             characterId: true,
             description: true,
             extraInfo: true, // Ensure extraInfo is selected
             // ... other ultimate fields you need
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
        associations: true,
        associationsWith: true,
        passiveName: true,
        passiveImageUrl: true,
        passiveJpName: true,
        passiveDescription: true,
        passiveCCNeeded: true,
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
            // You might also need to select materials if the receiving component uses them
            materials: {
              select: {
                id: true, name: true, imageUrl: true, // Select material fields
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

export default async function CharacterPage({ params: { slug } }: any) {

  const user = await currentUser();
  //find a character using custom handler

  const character = await getCharacterFromDb(slug);
  const comments = await getCommentsFromDb(character?.id as string)
  // console.log(character); - USED FOR DEBUGGING

  const passive: Passive = {
    name: character?.passiveName || "",
    jpName: character?.passiveJpName || "",
    imageUrl: character?.passiveImageUrl || "", // Ensure imageUrl is handled correctly (string or null/undefined)
    ccNeeded: character?.passiveCCNeeded || "", // Ensure type matches Passive definition
    description: character?.passiveDescription || "",
}

const miscInfo: CharacterMiscInfo = {
  gender: character?.gender || "",
  location: character?.location || "",
  age: character?.age || "",
  birthday: character?.birthday || "",
  bloodType: character?.bloodType || "",
  CV: character?.CV || "",
  height: character?.height || "",
  weight: character?.weight || ""
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
      isCollected={user && character.Collection && Array.isArray(character.Collection) ? character.Collection.some(collected => collected.userId === user.id) : false}
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
        passive={passive || ""}
        gift={character?.gift}
        miscInfo={miscInfo}
        ultimate={character?.ultimate || undefined}
        associations={character?.associations}
      
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

        <div className="mt-6">
          {comments?.map((comment, idx) => (
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
