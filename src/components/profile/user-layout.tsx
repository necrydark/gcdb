import { cn } from "../../lib/utils";
import { ExtendedUser } from "../../next-auth";

type Props = {
  user?: ExtendedUser;
  children: React.ReactNode;
};

const UserLayout: React.FC<Props> = ({ user, children }: Props) => {
  return (
    <main
      className=" transition-all duration-300 pb-[7rem] pt-[5rem] bg-gradient-to-b from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-700/60 dark:to-purple-900"
    >
      {children}
    </main>
  );
};

export default UserLayout;
