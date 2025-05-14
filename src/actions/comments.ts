"use server";

import db from "../lib/db"

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { currentUser } from "@/src/utils/auth";
import { commentSchema } from "../schemas/schema";
import { auth } from "../auth";



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

export const addComment = async (
  values: z.infer<typeof commentSchema>,
  slug: string
) => {
  const user = await currentUser();

  if(!user) {
    return { error: "User is not authorized"}
  }



  const validatedFields = commentSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid comment" };
  }

  const { characterId, comment } = validatedFields.data;

  if (!user) {
    return { error: "Unauthorized" };
  }

  await db.comments.create({
    data: {
      characterId: characterId.toString(),
      comment: comment,
      userId: user.id!,
    },
  });

  revalidatePath(`/character/${slug}`);
  revalidatePath(`/profile`)
  revalidatePath(`/profile/${user.id}`)
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