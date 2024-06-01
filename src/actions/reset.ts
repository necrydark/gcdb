"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/src/lib/mail";
import { generatePasswordResetToken } from "@/src/lib/token";
import { resetSchema } from "@/src/schemas/schema";
import * as z from "zod";

export const reset = async (values: z.infer<typeof resetSchema>) => {
  const validatedFields = resetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset Email Sent!" };
};
