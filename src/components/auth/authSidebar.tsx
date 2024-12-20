import Logo from "@/src/components/logo";
import { cn } from "@/src/lib/utils";
import React from "react";
import { ThemeToggleMobile } from "../ThemeToggleMobile";
import { UserButtonMobile } from "../auth/user-button-mobile";
import { SidebarItem } from "../sidebarItem";

type Props = {
  className?: string;
};

const AuthSidebar = async ({ className }: Props) => {
  const links = [
    {
      name: "Characters",
      url: "/characters",
    },
    {
      name: "Cooking",
      url: "/cooking",
    },
    {
      name: "Gear",
      url: "/gear",
    },
    {
      name: "Holy Relics",
      url: "/relics",
    },
  ];

  return (
    <div
      className={cn(
        "flex bg-card h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 dark:border-r-[1px] border-r-2 flex-col",
        className
      )}
    >
      <div className="pt-8 pl-4 pb-7 flex gap-x-3">
        <Logo />
      </div>
      <div className="flex flex-col pt-[20px]  gap-y-2 flex-1">
        {links.map((link, idx) => (
          <SidebarItem title={link.name} url={link.url} key={idx} />
        ))}
      </div>
      <div className="py-4 flex flex-row justify-between">
        <UserButtonMobile />
        <ThemeToggleMobile />
      </div>
    </div>
  );
};

export default AuthSidebar;
