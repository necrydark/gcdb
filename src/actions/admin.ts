"use server";

import db from "../lib/db";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { adminSchema } from "../schemas/schema";
import { getUserByEmail } from "@/data/user";
import { auth, unstable_update } from "../auth";
import { giftSchema } from "../schemas/admin/schema";
import { UserRole } from "@prisma/client";
import { currentUser } from "../utils/auth";



export const deleteUser = async (userId: string) => {

  const user = await currentUser();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(user.role === "USER"){
    return { error: "User does not have the correct role."}
  }

  if(!userId) {
    return { error: "Missing ID"}
  }

  await db.user.delete({
      where: {
        id: userId
      }
  })
  

  revalidatePath("/admin")
  revalidatePath("/profile")
  return { success: "User Deleted!" };
}


export const editUser = async(values: z.infer<typeof adminSchema>) => {

  
  const user = await currentUser();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(user.role === "USER"){
    return { error: "User does not have the correct role."}
  }

  const dbUser = await getUserByEmail(values.email as string);

  if(!dbUser) {
    return { error: "User not found"}
  }

  const updatedUser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    }
  })

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled as boolean,
      username: updatedUser.username as string,
      role: updatedUser.role,
    }
  })

  revalidatePath("/admin")
  revalidatePath("/src/app/(protected)/settings")
  revalidatePath("/profile")
  return { success: "User Updated!" };

}

export const getUser = async (email: String) => {
  const dbUser = await getUserByEmail(email as string);

  return dbUser;
}

export const getUserCount = async () => {
  try {
    const count = await db.user.count();
    return count;
  } catch {
    return null;
  }
}

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