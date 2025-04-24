import { useSession } from "next-auth/react";

//client comps
export const useCurrentUser = () => {
  const session = useSession();

  console.log("session data:", session)
  return session.data?.user;
};

