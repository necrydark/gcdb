'use server'

import { revalidatePath } from "next/cache";
import { auth } from "../auth";
import db from "../lib/db";
import { currentUser } from "../utils/auth";

export async function toggleCollectionChar(characterId: string) {
    const user = await currentUser();

    if(!user) {
      return { error: "User is not authorized"}
    }
  
    if(!user.id) {
        return { error: "User id is not valid."}
    }

    if(user.role === "USER"){
      return { error: "User does not have the correct role."}
    }

    const existing = await db.collection.findUnique({
        where: { userId_characterId: { userId: user.id, characterId } }
      });

      if(existing) {
        await db.collection.delete({
        where: { userId_characterId: { userId: user.id, characterId } }
            
        })
      } else {
        await db.collection.create({
            data: {userId: user.id, characterId}
        })
      }

    
      revalidatePath(`/characters/${characterId}`);
      revalidatePath(`/characters`);

}

export async function toggleCollectionRelic(relicId: string) {
  const user = await currentUser();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(!user.id) {
      return { error: "User id is not valid."}
  }

  if(user.role === "USER"){
    return { error: "User does not have the correct role."}
  }

  const exisitng = await db.collection.findUnique({
    where: { userId_relicId: { userId: user.id, relicId}}
  })
  if(exisitng) {
    await db.collection.delete({
    where: { userId_relicId: { userId: user.id, relicId}}
    })
  } else{
    await db.collection.create({
      data: {userId: user.id, relicId}
    })
  }

  revalidatePath(`/characters`);
  revalidatePath("/profile")
  revalidatePath("/relics")

}

export async function getFavoriteStatus(characterId: string) {
    const session = await auth();
  
    if (!session) {
      return { isFavorited: false };
    }
  
    const userId = session.user.id;
    

    try {
      const favorite = await db.collection.findUnique({
        where: {
          userId_characterId: {
            userId: userId as string,
            characterId ,
          },
        },
      });
      return { isFavorited: !!favorite };
    } catch (error) {
      console.error('Error fetching favorite status:', error);
      return { isFavorited: false, error: 'Error fetching status' };
    }
  }