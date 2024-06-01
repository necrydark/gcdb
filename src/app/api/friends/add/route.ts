import { addFriendSchema } from "@/src/schemas/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username: usernameToAdd } = addFriendSchema.parse(body.username);

    const RESTResponse = await fetch(``);
  } catch (err) {}
}
