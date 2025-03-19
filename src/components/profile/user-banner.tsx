import Image from "next/image";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


type Props = {
    username?: string | string[];
    imageUrl: string | undefined;
    role?: string;
    colour?: string;

}

export const UserBanner = ({username, imageUrl, role, colour}: Props) => {
    return (
        <div className={`dark:bg-${colour}-950 bg-${colour}-800  shadow-md  rounded-[5px] flex flex-col p-12`}>
           <div className="flex sm:flex-row sm:justify-start justify-center items-center flex-col gap-2">
           <Avatar className={`w-24 h-24 border-3 border-white`}>
            <AvatarImage  src={
            imageUrl ??
            "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
          } />
            <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        <div className="flex flex-col md:items-start items-center gap-y-2">
            <h2 className="text-3xl pr-[10px] font-extrabold text-center text-white tracking-tight">{username}</h2>
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
        </div>
           </div>
        </div>
    )
}