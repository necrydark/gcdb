"use server";

import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function updateBio(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

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
