import { ProfileColour } from "@prisma/client";
import { cn } from "../../lib/utils";
import { ExtendedUser } from "../../next-auth";

type Props = {
  user?: ExtendedUser;
  children: React.ReactNode;
};

const UserLayout: React.FC<Props> = ({ user, children }: Props) => {

  const colour = user?.profileColor as ProfileColour || "PURPLE".toLocaleLowerCase();
  

  // const getAttributeColor = (attribute: Attribute) => {
  //   const attributeColors = {
  //     Strength: "bg-red-500",
  //     Speed: "bg-blue-500",
  //     HP: "bg-green-500",
  //     Light: "bg-yellow-500",
  //     Dark: "bg-purple-500",
  //   };
  //   return attributeColors[attribute] || "bg-gray-500";
  // };

  const getGradientColours = (gradient: string) => {
    const gradientColours: Record<string, string> = {
      "purple": "from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-700/60 dark:to-purple-900",
      "pink": "from-pink-300 via-pink-400/60 to-pink-600 dark:from-pink-500/30 dark:via-pink-700/60 dark:to-pink-900",
      "red":  "from-red-300 via-red-400/60 to-red-600 dark:from-red-500/30 dark:via-red-700/60 dark:to-red-900",
      "blue":   "from-blue-300 via-blue-400/60 to-blue-600 dark:from-blue-500/30 dark:via-blue-700/60 dark:to-blue-900",
      "green": "from-green-300 via-green-400/60 to-green-600 dark:from-green-500/30 dark:via-green-700/60 dark:to-green-900",
      "yellow": "from-yellow-300 via-yellow-400/60 to-yellow-600 dark:from-yellow-500/30 dark:via-yellow-700/60 dark:to-yellow-900",
      "cyan": "from-cyan-300 via-cyan-400/60 to-cyan-600 dark:from-cyan-500/30 dark:via-cyan-700/60 dark:to-cyan-900",
      "orange": "from-orange-300 via-orange-400/60 to-orange-600 dark:from-orange-500/30 dark:via-orange-700/60 dark:to-orange-900",
    }
    return gradientColours[gradient] || "from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-700/60 dark:to-purple-900";
  }

  return (
    <main
      className={`${getGradientColours(colour.toLocaleLowerCase())} transition-all duration-300 pb-[7rem] bg-gradient-to-b`}
    >
      {children}
    </main>
  );
};

export default UserLayout;
