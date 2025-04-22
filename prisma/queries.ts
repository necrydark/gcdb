import db from "@/src/lib/db";

import { cache } from "react";



export const getUserData = cache(async ({ userId }: { userId: string }) => {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      Comments: true,
      Favourite: true
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
      include: {
        Comments: true,
        Favourite: true
      }
    });
    return data;
  }
);

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
