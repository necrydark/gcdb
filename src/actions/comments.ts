"use server";

import db from "../lib/db"

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { currentUser } from "@/src/utils/auth";
import { commentSchema } from "../schemas/schema";
import {Filter} from "bad-words"




export async function getCommentsFromDb(characterId:string) {
    try {
      const res = await db.comments.findMany({
        where: {
          characterId
        },
        include: {
          user: true,
        }
      })
  
      return res
    } catch(err) {
      console.error(err)
    }
  }
  

  export const getCommentsByUser = async(userId: string) => {
    try {
        const res = await db.comments.findMany({
          where: {
            userId
          },
          include: {
            character: true,
          }
        })
    
        return res
      } catch(err) {
        console.error(err)
      }
  }


  // export const getCommentByCharacterId(characterId: string) => {
    
  // }


export const addComment = async (
  values: z.infer<typeof commentSchema>,
  slug: string
) => {
  const user = await currentUser();
  

  if(!user) {
    return { error: "You need to be logged in to post a comment."}
  }



  const validatedFields = commentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid comment" };
  }

  const { characterId, comment } = validatedFields.data;


  const filter = new Filter(); 

  const isProfane = filter.isProfane(comment);

  if(isProfane) {
    return { error: "This comment cannot be posted due to the use of profanity."}
  }



  await db.comments.create({
    data: {
      characterId: characterId.toString(),
      comment: comment,
      userId: user.id!,
    },
  });


  const comments = await getCommentsByUser(user.id as string)
  const userCount = comments ? comments.length : 0;


  const commentAchievements = [
    { name: "Comment Rookie", target: 10 },
    { name: "Comment Veteran", target: 50 },
    { name: "Comment Pro", target: 100 },
  ];

  for (const achievement of commentAchievements) {
    const achievementDef = await db.achievement.findUnique({
      where: { name: achievement.name}
    })

    if(!achievementDef) {
      console.warn(`Achievement ${achievement.name} has not been found. `)
      continue;
    }

    if(userCount >= achievement.target) {
      await db.userAchievement.upsert({
        where: {
          userId_achievementId: {
            userId: user.id as string,
            achievementId: achievementDef.id
          },
        },
        update: {
          progress: userCount,
          unlocked: true,
          unlockedAt: 
          !(await db.userAchievement.findUnique({
            where: {
              userId_achievementId: {
                userId: user.id as string,
                achievementId: achievementDef.id
              },
            },
            select: {unlocked: true}
          })
        )?.unlocked ? new Date() : undefined
        },
        create: {
          userId: user.id as string,
          achievementId: achievementDef.id,
          progress: userCount,
          unlocked: true, 
          unlockedAt: new Date(),
        }
      })
    } else if (userCount > 0) {
      await db.userAchievement.upsert({
        where: {
          userId_achievementId: {
            userId: user.id as string,
            achievementId: achievementDef.id
          },
        },
        update: {
          progress: userCount
        },
        create: {
          userId: user.id as string,
          achievementId: achievementDef.id,
          progress: userCount,
          unlocked: false, 
          unlockedAt: null,
        }
      })
    }
  }

  




  revalidatePath(`/character/${slug}`);
  revalidatePath(`/profile`)
  revalidatePath(`/profile/${user.id}`)
  revalidatePath("/profile/achievements")
  return { success: "Comment Added!" };
};

export const deleteComment = async(commentId: string) => {


  if(!commentId) {
    console.log("Comment ID cannot be found")
  }
    await db.comments.delete({
      where: {id: commentId}
    })


    revalidatePath("/profile")
    revalidatePath("/characters/[slug]")
    revalidatePath("/profile/[slug]")



} 


export const updateComment = async (values: z.infer<typeof commentSchema>, commentId: string) => {
  const validatedFields = commentSchema.safeParse(values);

  if(!validatedFields.success) {
    return { error: "Comment is invalid."}
  }

  const { comment, characterId} = validatedFields.data;

  

  if(!comment || !characterId) {
    return { error: "The comment or character ID aren't valid"}
  }

  await db.comments.update({
    where: {
      id: commentId
    },
    data: {
      ...values
    }
  })

  revalidatePath("/profile")
  revalidatePath("/characters")
  return { success: "Comment updated."}
}