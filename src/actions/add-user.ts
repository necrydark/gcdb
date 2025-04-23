"use server";

import { getUserByEmail, getUserByUsername } from "@/data/user";
import * as bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addNewUserSchema } from "../schemas/schema";
import { userSchema } from "../schemas/admin/schema";

export const addUser = async (values: z.infer<typeof userSchema>) => {
  const validatedFields = userSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid login" };
  }

  const { name, username, email, password, bio, profileColour, role, ingameRank,image,emailVerified,twoFactorEnabled,boxCC,displayUsername  } = validatedFields.data;

  
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


