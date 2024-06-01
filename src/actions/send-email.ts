"use server";

import { EmailTemplate } from "@/src/components/email-template";
import { formSchema } from "@/src/schemas/schema";
import { Resend } from "resend";
import { z } from "zod";

type ContactFormInputs = z.infer<typeof formSchema>;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data: ContactFormInputs) {
  const result = formSchema.safeParse(data);

  if (result.success) {
    const { email, subject, message } = result.data;
    const senderEmail = email as string;
    const senderSubject = subject as string;
    const senderMessage = message as string;
    try {
      const data = await resend.emails.send({
        from: "GCWiki Contact Form <onboarding@resend.dev>",
        to: "necrydark@gmail.com",
        subject: senderSubject as string,
        reply_to: senderEmail as string,
        //   text: message as string,
        text: "",
        react: EmailTemplate({
          message: senderMessage,
          senderEmail: senderEmail as string,
        }),
      });
      return { success: true, data };
    } catch (err) {
      return { success: false, err };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
