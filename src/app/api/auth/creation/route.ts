import db from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { generateUsername } from "unique-username-generator";

export async function GET(req: NextRequest) {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id)
    throw new Error("Something went wrong, please try again");

  let dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        id: user.id,
        email: user.email ?? "",
        firstname: user.given_name ?? "",
        lastname: user.family_name ?? "",
        imageUrl: user.picture ?? "",
        username: generateUsername("-", 3, 15),
      },
    });
  }

  return NextResponse.redirect("http://localhost:3000/");
}
