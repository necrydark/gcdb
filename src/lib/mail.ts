import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "GCWiki <onboarding@resend.dev>",
    to: email,
    subject: "Two Factor Authentication Code",
    html: `<p>Your two factor authentication code is: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "GCWiki <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/confirm-email?token=${token}`;

  await resend.emails.send({
    from: "GCWiki <onboarding@resend.dev>",
    to: email,
    subject: "Confirm Your Email",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
  });
};

// "use server";

// import { formSchema } from "@/src/app/schemas/schema";
// import { EmailTemplate } from "@/src/components/email-template";
// import { Resend } from "resend";
// import { z } from "zod";

// type ContactFormInputs = z.infer<typeof formSchema>;
// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function sendEmail(data: ContactFormInputs) {
//   const result = formSchema.safeParse(data);

//   if (result.success) {
//     const { email, subject, message } = result.data;
//     const senderEmail = email as string;
//     const senderSubject = subject as string;
//     const senderMessage = message as string;
//     try {
//       const data = await resend.emails.send({
//         from: "GCWiki Contact Form <onboarding@resend.dev>",
//         to: "necrydark@gmail.com",
//         subject: senderSubject as string,
//         reply_to: senderEmail as string,
//         //   text: message as string,
//         text: "",
//         react: EmailTemplate({
//           message: senderMessage,
//           senderEmail: senderEmail as string,
//         }),
//       });
//       return { success: true, data };
//     } catch (err) {
//       return { success: false, err };
//     }
//   }

//   if (result.error) {
//     return { success: false, error: result.error.format() };
//   }
// }
