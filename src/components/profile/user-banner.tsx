import { cn } from "@/lib/utils";
import { ArrowRight, Box, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";




interface Achievement {
  name: string;
  description: string;
  imageUrl: string;

}

type Props = {
    username?: string | string[];
    imageUrl: string | undefined;
    role?: string;
    colour?: string;
    boxCC?: string;
    inGameRank?: string
    achievements?: Achievement[];
    isBasic?: boolean;
    // isPremium? :boolean;
}

export const UserBanner = ({username, imageUrl, role, colour, boxCC, inGameRank, achievements, isBasic}: Props) => {
    return (
        <div className={`dark:bg-${colour}-950 bg-${colour}-800  shadow-md  rounded-[5px] flex flex-col p-12`}>
           <div className="flex md:flex-row flex-col justify-between md:gap-4 gap-8">
           <div className="flex md:flex-row md:justify-start justify-center items-center flex-col gap-2">
           <Avatar className={`w-24 h-24 border-3 border-white`}>
            <AvatarImage  src={
            imageUrl ??
            "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
          } />
            <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        <div className="flex flex-col md:items-start items-center gap-y-2">
            <h2 className="text-3xl pr-[10px] font-extrabold text-center text-white tracking-tight">{username}</h2>
            <div className="flex flex-row gap-2">
            <Badge
            className=" w-fit text-white "
            variant={
              colour as
                | "red"
                | "green"
                | "blue"
                | "yellow"
                | "orange"
                | "pink"
                | "cyan"
                | "purple"  
                | null
                | undefined
            }
          >
            {role === "USER"
              ? "User"
              : role === "ADMIN"
              ? "Admin"
              : role === "OWNER"
              ? "Owner"
              : null}
          </Badge>
          <Badge
            className={cn("w-fit text-white hidden",
              isBasic && "bg-[#ae4e12]",
              // isPremium && "bg-[#9b7ddf]"
            )}
         
          >
            {isBasic ? "SR" : ""}
            {/* {isPremium ? "SSR" : ""} */}
            
          </Badge>
            </div>
          <div className="flex flex-row gap-4 ">
             <TooltipProvider>
             {boxCC && (
                  <Tooltip>
                    <TooltipTrigger
                    className="text-white"
                    asChild>
                    <div className="flex gap-1 items-center">
                    <Box className="w-4 h-4" />
                    <p>{boxCC}</p>
                  </div>
                    </TooltipTrigger>
                    <TooltipContent className={`bg-${colour}-400 dark:bg-${colour}-700 text-white`}>
                      <p>{username}&apos;s Box CC</p>
                    </TooltipContent>
                  </Tooltip>
              )}
              {inGameRank && (
                <Tooltip>
                  <TooltipTrigger
                    className="text-white"
                  
                  asChild>
                  <div className="flex gap-1 items-center">
                   <Star className="w-4 h-4" />
                  <p>{inGameRank}</p>
                  </div>
                  </TooltipTrigger>
                  <TooltipContent className={`bg-${colour}-400 dark:bg-${colour}-700 text-white`}>
                    <p>{username}&apos;s ingame rank</p>
                  </TooltipContent>
                </Tooltip>
              )}
             </TooltipProvider>
          </div>
        </div>
           </div>
           {/* Achievements */}
           <div>
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
           </div>
           </div>
        </div>
    )
}