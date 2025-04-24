

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

// Assuming useCurrentUser correctly uses useSession internally (you can remove this if you access session directly)
// import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { cn } from "@/src/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaCog, FaHeart, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { auth } from "@/src/auth";
import { Button } from "../ui/button";
import SignOutBtn from "./sign-out-btn";

type Props = {
  className?: string;
};

export const UserButton = async ({ className }: Props) => {
  const session =  await auth();

  const user = session?.user;

  return (
    <div className={cn(" cursor-pointer", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border-2 border-white">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-background text-primary-foreground">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="bottom" className="dark:bg-purple-950 bg-purple-700" sideOffset={15}>
          {/* Display username when available */}
          {user?.username && <p className="text-center p-2">{user.username}</p>}
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
              <FaUser className="mr-2" />
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem  className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
              <FaHeart className="mr-2" />
              <Link href={"/settings"}>Favourites</Link>
            </DropdownMenuItem>
            <DropdownMenuItem  className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
              <FaCog className="mr-2" />
              <Link href={"/settings"}>Settings</Link>
            </DropdownMenuItem>
            {(user?.role === "ADMIN" || user?.role === "OWNER") && (
              <DropdownMenuItem  className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
                <MdAdminPanelSettings className="mr-2" />
                <Link href={"/dashboard"}>Admin</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator  className="bg-white" />
          <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
            <FaSignOutAlt className="mr-2" />
            <SignOutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
