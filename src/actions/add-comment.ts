"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { currentUser } from "@/src/utils/auth";
import db from "../lib/db";
import { commentSchema } from "../schemas/schema";

export const addComment = async (
  values: z.infer<typeof commentSchema>,
  slug: string
) => {
  const user = await currentUser();

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
  return { success: "Comment Added!" };
};
