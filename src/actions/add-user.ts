"use server";

import { getUserByEmail, getUserByUsername } from "@/data/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import db from "../lib/db";
import { addNewUserSchema } from "../schemas/schema";

export const addUser = async (values: z.infer<typeof addNewUserSchema>) => {
  const validatedFields = addNewUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid login" };
  }

  const { name, username, email, password, bio } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByEmail = await getUserByEmail(email);
  const existingUserByUsername = await getUserByUsername(username);

  if (existingUserByEmail) {
    return { error: "Email already in use!" };
  }

  if (existingUserByUsername) {
    return { error: "Username already in use!" };
  }

  values.password = hashedPassword;

  await db.user.create({
    data: {
      ...values,
      emailVerified: new Date(),
    },
  });

  revalidatePath("/src/app/(protected)/admin/(*.)");
  return { success: "User Created" };
};
