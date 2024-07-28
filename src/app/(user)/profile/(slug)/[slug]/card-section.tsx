import { cn } from "@/src/lib/utils";
import { ProfileColour } from "@prisma/client";

type Props = {
  sectionColour: ProfileColour;
  children: React.ReactNode;
};

const CardSection: React.FC<Props> = ({ sectionColour, children }) => {
  return (
    <div
      className={cn(
        "py-4 mt-2 px-4 rounded-2xl shadow-lg dark:shadow-lg md:w-full w-fit mx-auto",
        sectionColour === ProfileColour.PURPLE &&
          "bg-purple-300 dark:bg-purple-950 !text-white",
        sectionColour === ProfileColour.RED &&
          "bg-red-300 dark:bg-red-950 !text-white",
        sectionColour === ProfileColour.GREEN &&
          "bg-green-300 dark:bg-green-950 !text-white",
        sectionColour === ProfileColour.BLUE &&
          " bg-blue-300 dark:bg-blue-950 !text-white",
        sectionColour === ProfileColour.YELLOW &&
          "bg-yellow-300 dark:bg-yellow-950 !text-white",
        sectionColour === ProfileColour.ORANGE &&
          " bg-orange-300 dark:bg-orange-950 !text-white",
        sectionColour === ProfileColour.PINK &&
          " bg-pink-300 dark:bg-pink-950 !text-white",
        sectionColour === ProfileColour.CYAN &&
          " bg-cyan-300 dark:bg-cyan-950 !text-white"
      )}
    >
      {children}
    </div>
  );
};

export default CardSection;
