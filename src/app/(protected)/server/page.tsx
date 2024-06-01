import { UserInfo } from "@/src/components/user-info";
import { currentUser } from "@/src/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return <UserInfo label="Server Component" user={user} />;
};

export default ServerPage;
