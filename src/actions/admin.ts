"use server";

import db from "../lib/db";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { adminSchema } from "../schemas/schema";
import { getUserByEmail } from "@/data/user";
import { auth, unstable_update } from "../auth";



export const deleteUser = async (userId: string) => {

  const user = await auth();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(user.user.role === "USER"){
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

  
  const user = await auth();

  if(!user) {
    return { error: "User is not authorized"}
  }

  if(user.user.role === "USER"){
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
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
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
