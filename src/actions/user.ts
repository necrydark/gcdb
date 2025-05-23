"use server";

import { getUserByEmail, getUserByUsername } from "@/data/user";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addNewUserSchema, adminSchema } from "../schemas/schema";
import { userSchema } from "../schemas/admin/schema";
import { currentUser } from "../utils/auth";
import { unstable_update } from "../auth";

export const addUser = async (values: z.infer<typeof userSchema>) => {
  const validatedFields = userSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid login" };
  }

  const { name, username, email, password, profileColour, role, ingameRank,image,emailVerified,twoFactorEnabled,boxCC,displayUsername  } = validatedFields.data;

  
  const typedPassword = password as string;

  const hashedPassword = await bcrypt.hash(typedPassword, 10);

  const existingUserByEmail = await getUserByEmail(email as string);
  const existingUserByUsername = await getUserByUsername(username as string);

  if (existingUserByEmail) {
    return { error: "Email already in use!" };
  }

  if (existingUserByUsername) {
    return { error: "Username already in use!" };
  }

  await db.user.create({
    data: {
      ...values,
      
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    }),
    revalidatePath("/src/app/(protected)/admin/(*.)");
    return { success: "User Created" };
  }



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

