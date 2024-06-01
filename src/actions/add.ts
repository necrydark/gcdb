import { getUserByUsername } from "@/data/user";
import { currentUser } from "../lib/auth";
import db from "../lib/db";

export const addFriend = async (username: string) => {
  const user = await currentUser();
  const friend = await getUserByUsername(username);
};
