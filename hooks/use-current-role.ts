import { useSession } from "next-auth/react";

//client comps
export const useCurrentRole = () => {
  const session = useSession();

  return session.data?.user?.role;
};
