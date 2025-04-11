"use server"

import { z } from "zod"
import { auth } from "../lib/auth"
import { signInSchema } from "../schemas/schema"
import { redirect } from "next/navigation"

export const signIn = async (values: z.infer<typeof signInSchema>) => {
    const validatedFields = signInSchema.safeParse(values);

    if(!validatedFields.success) {
        return { error: "Invalid Credentials"}
    }

    const { email, password} = validatedFields.data;

    if(!email) {
        return { error: "Invalid Email"}
    }

    if(!password) {
        return { error: "Invalid Password"}
    }


    try {
        await auth.api.signInEmail({
            body: {
                email,
                password
            },
        })

        redirect("/profile")
    } catch (err) {
        console.error(err)
    }


}