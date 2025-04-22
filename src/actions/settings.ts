"use server";

import { getUserByEmail, getUserById } from "@/data/user";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import * as z from "zod";
import { unstable_update } from "../auth";
import { currentUser } from "@/src/utils/auth";
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
    const existingUser = await getUserByEmail(values.email as string);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use" };
    }

    const verificationToken = await generateVerificationToken(values.email  as string);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword) {
    const passwordMatch = bcrypt.compare(values.password, dbUser?.password as string);

    if (!passwordMatch) {
      return { error: "Incorrect Password" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;

    return { success: "Password Updated" };
  }

  // if (values.image) {
  //   // Delete the image from the uploadthing server
  //   if (dbUser?.image?.includes("ufts.io")) {
  //     const utApi = new UTApi();
  //     await utApi.deleteFiles(dbUser?.image?.split("/").pop() as string);
  //     return { success: "Profile Picture Changed" };
  //   }

  //   return { success: "Profile Picture Changed", image: values.image };
  // }

  // if (values.banner) {
  //   if (dbUser?.banner?.includes("ufts.io")) {
  //     const utApi = new UTApi();
  //     await utApi.deleteFiles(dbUser?.banner);
  //     return { success: "Profile Picture Changed" };
  //   }

  //   return { success: "Banner Updated!", banner: values.banner };
  // }

  if (values.image == undefined || values.image == "") {
    values.image = dbUser?.image as string;
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
      image: updatedUser.image as string,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      username: updatedUser.username as string,
      role: updatedUser.role,
      profileColor: updatedUser.profileColour,
      boxCC: updatedUser.boxCC as string,
      ingameRank: updatedUser.ingameRank as string,
      
    },
  });

  revalidatePath("/src/app/(protected)/settings/");
  revalidatePath("/src/components/auth/auth-nav.tsx");
  return { success: "Settings Updated" };
};
