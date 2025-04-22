"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaCog, FaHeart, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

import { Button } from "../ui/button";

export const UserButtonMobile = () => {
  const user = useCurrentUser();

  const onClick = () => {
    signOut();
  };

  return (
    <div className="flex flex-row gap-5 cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex flex-row gap-[.5rem] p-[5px] rounded-[5px] items-center dark:hover:bg-purple-900">
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-background text-white">
              <FaUser />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-[0.1rem]">
        <h2 className="text-base text-left">{user?.username}</h2>
        <p className=" text-muted-foreground text-sm">{user?.email}</p>
      </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[10000] dark:bg-purple-950 bg-purple-700"
          align="end"
          side="top"
          sideOffset={5}
        >
          <p className="text-center p-2">{user?.username}</p>

          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
              <FaUser className="mr-2" />
              <Link href={"/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
              <FaHeart className="mr-2" />
              <Link href={"/settings"}>Favourites</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
              <FaCog className="mr-2" />
              <Link href={"/settings"}>Settings</Link>
            </DropdownMenuItem>
            {user?.role === "ADMIN" && (
              <>
                <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
                  <MdAdminPanelSettings className="mr-2" />
                  <Link href={"/dashboard"}>Admin</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
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
