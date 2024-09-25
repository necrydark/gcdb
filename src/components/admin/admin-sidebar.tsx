import { useCurrentUser } from "@/hooks/use-current-user";
import Logo from "@/src/components/logo";
import db from "@/src/lib/db";
import { cn } from "@/src/lib/utils";
import { signOut } from "next-auth/react";
import React from "react";
import { ThemeToggleMobile } from "@/src/components/ThemeToggleMobile";
import { SidebarItem } from "@/src/components/sidebarItem";

type Props = {
  className?: string;
  links?: { title: string; url: string }[];
};

const AdminSidebar = async ({ className, links }: Props) => {

  return (
    <div
      className={cn(
        "flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 dark:border-r-[1px] border-r-2 flex-col",
        className
      )}
    >
      <div className="pt-8 pl-4 items-center justify-center underline underline-offset-2 pb-7 flex gap-x-3">
        <Logo />
      </div>
      <div className="flex flex-col pt-[20px]  gap-y-2 flex-1">
        {links?.map((link, idx) => (
          <SidebarItem title={link.title} url={link.url} key={idx} />
        ))}
      </div>
      <div className="py-4 flex flex-row justify-between">
        <ThemeToggleMobile />
      </div>
    </div>
  );
};

export default AdminSidebar;
