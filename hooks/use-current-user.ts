import { useSession } from "next-auth/react";

//client comps
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};

