import db from "@/src/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getUsername = cache(async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }
  const data = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      username: true,
    },
  });
  return data;
});

export const getUserData = cache(async ({ userId }: { userId: string }) => {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
  });
  return data;
});


export const getUserDataByUsername = cache(
  async ({ username }: { username: string }) => {
    const data = await db.user.findUnique({
      where: {
        username,
      },
    });
    return data;
  }
);

export const userDataByUsername = async (username: string) => {
  const data = await db.user.findUnique({
    where: {
      username,
    },
  });
  return data;
};

// export const getUserDataByUsername = cache(
//   async ({ username }: { username: string }) => {
//     const data = await db.user.findUnique({
//       where: {
//         username: username,
//       },
//     });
//     return data;
//   }
// );
