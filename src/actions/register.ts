"use server";

import db from "@/src/lib/db";
import { generateVerificationToken } from "@/src/lib/token";
import { registerSchema } from "@/src/schemas/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { getUserByEmail, getUserByUsername } from "../../data/user";
import { sendVerificationEmail } from "../lib/mail";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid login" };
  }

  const { name, username, email, password, bio, boxCC, ingameRank } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);



  const existingUserByEmail = await getUserByEmail(email);
  const existingUserByUsername = await getUserByUsername(username);

  if (existingUserByEmail) {
    return { error: "Email already in use!" };
  }

  if (existingUserByUsername) {
    return { error: "Username already in use!" };
  }

  await db.user.create({
    data: {
      username,
      name,
      email,
      password: hashedPassword,
      boxCC,
      ingameRank,
      displayUsername: username,
      createdAt: new Date(),
      updatedAt: new Date(),
      bio,    
      image: `https://avatar.vercel.sh/${name}`,
    },
  });

  const verificationToken = await generateVerificationToken(email);


  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Check your email for verification!" };
};
