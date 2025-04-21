import { useCurrentRole } from "@/hooks/use-current-role";
import { currentRole } from "@/src/utils/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

// Only in Server comps
export async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
