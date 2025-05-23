// app/api/user/[userId]/subscription/route.ts
import { auth } from "@/src/auth";
import db from "@/src/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{userId: string}>

export async function GET(
  req: NextRequest,
  { params }: { params: Params}
) {
  const session = await auth();
  const { userId } = await params;

  // Ensure the user is authenticated and requesting their own data
  if (!session || session.user?.id !== userId) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }


  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        stripePriceId: true,
        stripeCurrentEndPeriod: true,
        subscriptionStatus: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user subscription info:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}