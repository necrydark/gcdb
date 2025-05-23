"use server";

import db from "../lib/db";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { giftSchema } from "../schemas/admin/schema";

export const getGiftByName = async(name: string) => {
  try {
    const count = await db.gift.findFirst({
      where: {
        name: name
      }
    })
    return count;
  } catch {
    return null;
  }
}

export const getGiftById = async (giftId: string) => {
  try {
    const gift = await db.gift.findUnique({
      where: {
        id: giftId
      }
    })

    return gift;
  } catch {
    return null
  }
}

export const addGift = async (values: z.infer<typeof giftSchema>) => {
  const validatedFields = giftSchema.safeParse(values);

  if(!validatedFields) { 
    return { error: "Invalid Fields"}
  }

  if(!validatedFields.success) {
    return { error: "Invalid Fields"}
  }

  const {name, imageUrl, description} = validatedFields.data;

  const existingGift = await getGiftByName(name as string);
  
  if(existingGift) {
    return { error: "Gift already exists"}
  }


  if(!name || !imageUrl || !description) {
    return {error: "A field is not valid."}
  }

 
  await db.gift.create({
    data: {
      ...values
    }
  })


  revalidatePath("/src");
  return { success: "Gift Added" };
}

export const updateGift  = async(values: z.infer<typeof giftSchema>) => {
  const validatedFields = giftSchema.safeParse(values);

  if(!validatedFields || !validatedFields.success) {
    return { error: "Invalid Fields!"}
  }

  
  const {name, imageUrl, description} = validatedFields.data;

  const existingGift = await getGiftByName(name as string);
  
  if(!existingGift) {
    return { error: "Gift already exists"}
  }


  if(!name || !imageUrl || !description) {
    return {error: "A field is not valid."}
  }

  await db.gift.update({
    where: {
      id: existingGift.id
    },
    data: {
      ...values
    }
  });

  
  revalidatePath("/src");
  return { success: "Gift Updated" };
}

export const deleteGift = async(giftId: string) => {
  if(!giftId) {
    return{ error: "Missing Gift ID"}
  }

  await db.gift.delete({
    where: {
      id: giftId
    }
  })

  revalidatePath("/src");
  return { success: "Gift Deleted" };
}

export const getGifts = async() => {
  try {
    const res = await db.gift.findMany();
    return res;
  } catch {
    return null
  }
}