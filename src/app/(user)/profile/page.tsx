import { currentUser } from "@/src/utils/auth";
import { redirect } from "next/navigation";

async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  redirect(`/profile/${user.username}`);
}

export default ProfilePage;
