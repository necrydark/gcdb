"use server";

import db from "@/src/lib/db";

import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { currentUser } from "../utils/auth";

export async function updateBio(prevState: any, formData: FormData) {

  const user = await currentUser();

  if (!user) {
    return redirect("/api/auth/login");
  }

  const bio = formData.get("bio") as string;

  try {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        bio: bio,
      },
    });

    return {
      message: "Updated bio successfully!",
      status: "green",
    };
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          error: "Cannot update bio!.",
          status: "error",
        };
      }
    }
    throw e;
  }
}
