"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/use-current-user";
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
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

type Props = {
  className?: string;
  session?: Session | null;
};

export const UserButton = ({ className }: Props) => {
  const router = useRouter();
  const data = useSession();
  if(!data) router.refresh();
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };
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
        <DropdownMenuContent align="center" side="bottom" sideOffset={10}>
          <p className="text-center p-2">{user?.username}</p>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <FaUser className="mr-2" />
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaHeart className="mr-2" />
              <Link href={"/settings"}>Favourites</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FaCog className="mr-2" />
              <Link href={"/settings"}>Settings</Link>
            </DropdownMenuItem>
            {(user?.role === "ADMIN" || user?.role === "OWNER") && (
              <DropdownMenuItem>
                <MdAdminPanelSettings className="mr-2" />
                <Link href={"/admin"}>Admin</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <FaSignOutAlt className="mr-2" />
            <button type="submit" className=" text-sm" onClick={onClick}>
              Logout
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
