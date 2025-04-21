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
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-background text-white">
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-[10000]"
          align="end"
          side="left"
          sideOffset={5}
        >
          <p className="text-center p-2">{user?.username}</p>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Account</DropdownMenuLabel>
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
            {user?.role === "ADMIN" && (
              <>
                <DropdownMenuItem>
                  <MdAdminPanelSettings className="mr-2" />
                  <Link href={"/dashboard"}>Admin</Link>
                </DropdownMenuItem>
              </>
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
      <div className="flex flex-col gap-[0.1rem]">
        <h2 className="text-base">{user?.username}</h2>
        <p className=" text-muted-foreground text-sm">{user?.email}</p>
      </div>
    </div>
  );
};
