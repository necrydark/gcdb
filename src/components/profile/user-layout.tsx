import { cn } from "../../lib/utils";
import { ExtendedUser } from "../../next-auth";

type Props = {
  user?: ExtendedUser;
  children: React.ReactNode;
};

const UserLayout: React.FC<Props> = ({ user, children }: Props) => {
  return (
    <main
      className={cn(
        " transition-all duration-300",
        user?.profileColor === "RED" && "bg-red-400 text-white dark:bg-red-800",
        user?.profileColor === "BLUE" &&
          "bg-blue-400 text-white dark:bg-blue-800",
        user?.profileColor === "GREEN" &&
          "bg-green-400 text-white dark:bg-green-800",
        user?.profileColor === "YELLOW" &&
          "bg-yellow-400 text-white dark:bg-yellow-800",
        user?.profileColor === "PURPLE" &&
          "bg-purple-400 text-white dark:bg-purple-800",
        user?.profileColor === "ORANGE" &&
          "bg-orange-400 text-white dark:bg-orange-800",
        user?.profileColor === "PINK" &&
          "bg-pink-400 text-white dark:bg-pink-800",
        user?.profileColor === "CYAN" &&
          "bg-cyan-400 text-white dark:bg-cyan-800"
      )}
    >
      {children}
    </main>
  );
};

export default UserLayout;
