"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import { ProfileColour } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";
import * as z from "zod";
import { unstable_update } from "../auth";
import { currentUser } from "../lib/auth";
import db from "../lib/db";
import { sendVerificationEmail } from "../lib/mail";
import { generateVerificationToken } from "../lib/token";
import { settingsSchema } from "../schemas/schema";

export const settings = async (values: z.infer<typeof settingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string); // Handle undefined case by providing a default value

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser?.password) {
    const passwordMatch = bcrypt.compare(values.password, dbUser?.password);

    if (!passwordMatch) {
      return { error: "Incorrect Password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;

    return { success: "Password Updated" };
  }
  if (values.image) {
    // Delete the image from the uploadthing server
    if (dbUser?.image?.toString().includes("utfs.io")) {
      const utApi = new UTApi();
      await utApi.deleteFiles(dbUser?.image);
      return { success: "Profile Picture Changed" };
    }

    return { success: "Profile Picture changed" };
  }

  if (values.banner) {
    if (dbUser?.banner?.toString().includes("utfs.io")) {
      const utApi = new UTApi();
      await utApi.deleteFiles(dbUser?.banner);
      return { success: "Banner Changed" };
    }
  }

  const updatedUser = await db.user.update({
    where: { id: dbUser?.id },
    data: {
      ...values,
    },
  });

  unstable_update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      username: updatedUser.username as string,
      role: updatedUser.role,
      banner: updatedUser.banner as string,
      profileColor: updatedUser.profileColour,
    },
  });

  revalidatePath("/src/app/(protected)/settings/");
  return { success: "Settings Updated" };
};
