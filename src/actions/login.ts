// "use server";

// import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
// import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
// import { getUserByEmail } from "@/data/user";
// import { signIn } from "@/src/auth";
// import db from "@/src/lib/db";
// import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/src/lib/mail";
// import {
//   generateTwoFactorToken,
//   generateVerificationToken,
// } from "@/src/lib/token";
// import { DEFAULT_LOGIN_REDIRECT } from "@/src/routes";
// import { signInSchema } from "@/src/schemas/schema";
// import { AuthError } from "next-auth";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { z } from "zod";

// export const login = async (values: z.infer<typeof signInSchema>) => {
//   const validatedFields = signInSchema.safeParse(values);

//   if (!validatedFields.success) {
//     return { error: "Invalid login" };
//   }

//   const { email, password, code } = validatedFields.data;

//   const existingUser = await getUserByEmail(email);

//   if (!existingUser || !existingUser.email || !existingUser.password) {
//     return { error: "Invalid Credentials" };
//   }

//   if (!existingUser.emailVerified) {
//     const verificationToken = await generateVerificationToken(
//       existingUser.email
//     );

//     await sendVerificationEmail(
//       verificationToken.email,
//       verificationToken.token
//     );

//     return { success: "Check your email to verify!" };
//   }

//   if (existingUser.isTwoFactorEnabled && existingUser.email) {
//     if (code) {
//       const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

//       if (!twoFactorToken) {
//         return { error: "Invalid Code" };
//       }

//       if (twoFactorToken.token !== code) {
//         return { error: "Invalid Code" };
//       }

//       const hasExpired = new Date(twoFactorToken.expiresAt) < new Date();

//       if (hasExpired) {
//         return { error: "Code has expired" };
//       }

//       await db.twoFactorToken.delete({
//         where: { id: twoFactorToken.id },
//       });

//       const exisitingConfirmation = await getTwoFactorConfirmationByUserId(
//         existingUser.id
//       );

//       if (exisitingConfirmation) {
//         await db.twoFactorConfirmation.delete({
//           where: { id: exisitingConfirmation.id },
//         });
//       }

//       await db.twoFactorConfirmation.create({
//         data: {
//           userId: existingUser.id,
//         },
//       });
//     } else {
//       const twoFactorToken = await generateTwoFactorToken(existingUser.email);
//       await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);
//     }

//     return { twoFactor: true };
//   }

//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirect: true,
//       redirectTo: "/profile",
      
//     });
//   } catch (err) {
//     if (err instanceof AuthError) {
//       switch (err.type) {
//         case "CredentialsSignin":
//           return { error: "Invalid Credentials" };
//         default:
//           return { error: "An error occurred" };
//       }
//     }
//     throw err;
//   }
// };
