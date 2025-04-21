"use server";

import db from "@/src/lib/db";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { currentUser } from "../utils/auth";

export async function updateUsername(prevState: any, formData: FormData) {
  const user = await currentUser();


  if (!user) {
    return redirect("/api/auth/login");
  }


  const username = formData.get("username") as string;

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: username,
      },
    });

    return {
      message: "Updated username successfully!",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Username is already taken.",
          status: "error",
        };
      }
    }
    throw e;
  }
}
