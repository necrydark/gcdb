import { cn } from "@/lib/utils";
import { Star, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface Achievement {
  name: string;
  description: string;
  imageUrl: string;
}

type Props = {
  username?: string | string[];
  imageUrl: string | undefined;
  role?: string;
  boxCC?: string;
  inGameRank?: string;
  achievements?: Achievement[];
  isBasic?: boolean;
  ownProfile?: boolean;
  // isPremium? :boolean;
};

export const UserBanner = ({
  username,
  imageUrl,
  role,
  boxCC,
  inGameRank,
  achievements,
  ownProfile,
  isBasic,
}: Props) => {
  return (
    <div
      className={`bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl border rounded-[5px] flex flex-col p-12`}
    >
      <div className="flex md:flex-row flex-col justify-between md:gap-4 gap-8">
        <div className="flex md:flex-row md:justify-start justify-center items-center flex-col gap-2">
          <Avatar className={`w-24 h-24 border-3 border-white`}>
            <AvatarImage
              src={
                imageUrl ??
                "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
              }
            />
            <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col md:items-start items-center gap-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl pr-[10px] font-extrabold text-center dark:text-white tracking-tight">
                {username}
              </h2>
              <Badge
                variant="default"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white h-fit shadow-md w-fit"
              >
                {role === "USER"
                  ? "User"
                  : role === "ADMIN"
                    ? "Admin"
                    : role === "OWNER"
                      ? "Owner"
                      : null}
              </Badge>
              {ownProfile && <Badge variant={"outline"}>Your Profile</Badge>}
              <Badge
                className={cn(
                  "w-fit text-white hidden",
                  isBasic && "bg-[#ae4e12]"
                  // isPremium && "bg-[#9b7ddf]"
                )}
              >
                {isBasic ? "SR" : ""}
                {/* {isPremium ? "SSR" : ""} */}
              </Badge>
            </div>
            <span className="ml-1 text-xs text-muted-foreground">
              @{username}
            </span>
            <div className="flex flex-row gap-2"></div>
            <div className="flex flex-row items-center gap-4 ">
              {boxCC && (
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-chart-1/10">
                    <Trophy className="h-5 w-5 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Box CC</p>
                    <p className="text-lg font-bold text-foreground">
                      {boxCC.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
              {inGameRank && (
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-chart-4/10">
                    <Star className="h-5 w-5 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Rank</p>
                    <p className="text-lg font-bold text-foreground">
                      {inGameRank}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Achievements */}
        {/* <div>
              {achievements && achievements.length > 0 && (
                <>
                  <div className="flex flex-row md:justify-between md:gap-4 justify-center gap-[4rem]  items-center">
                 <h2 className="text-sm    text-white">
                  Badges <span className="text-gray-400"> ({achievements.length})</span>
                 </h2>
                 <Link href={"/profile/achievements"} className="inline-flex text-sm text-white items-center">
                <ArrowRight className="h-4 w-4 " />
                 </Link>
                 </div>
                  <div className="flex flex-row gap-1 md:pt-0 pt-[10px] md:justify-normal justify-center items-center md:h-full h-[90px]">
                    {achievements.slice(0,3).map((achievement, idx) => (
                      <div key={idx} className={` p-2 flex flex-col`}>
                       <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                            <Image 
                        src={achievement.imageUrl}
                        alt={achievement.name} 
                        width={50}
                        height={50}
                        className="mx-auto"
                        />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" sideOffset={10} className={`bg-${colour}-500 dark:bg-${colour}-700 text-white text-center`}>
                        <p className="text-white text-sm">{achievement.name}</p>

                      <p className="text-xs">{achievement.description}</p>
                    </TooltipContent>
                          </Tooltip>
                       </TooltipProvider>
                     
                      </div>
                    ))}
                  </div>
                </>
              )}
           </div> */}
      </div>
    </div>
  );
};
