import ThemeToggle from "@/src/components/theme-toggle";
import Link from "next/link";
import React from "react";
import { AuthMobileSidebar } from "./auth-mobile-sidebar";
import { UserButton } from "./user-button";

export default function AuthNavbar() {
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
      name: "Relics",
      url: "/relics",
    },
    {
      name: "Resources",
      url: "/resources"
    },
  ];

  return (
    <>
      <div className="w-full  h-[60px] bg-purple-700 dark:bg-purple-950 z-20 text-white fixed">
        <div className="max-w-[1280px] h-[60px] items-center mx-auto flex justify-between px-2">
          <div className="flex  h-full">
            <Link
              href="/"
              className="p-5 hover:opacity-60 transition-all duration-300 text-white"
            >
              GCWiki
            </Link>
          </div>
          <div className="md:flex items-center h-full gap-2 hidden">
            {links.map((link) => (
              <Link
                href={link.url}
                className="p-4 hover:opacity-60 inline-flex items-center h-full transition-all text-white duration-300"
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
            <UserButton className="" />
            <ThemeToggle />
          </div>
          <div className="md:hidden items-center  flex cursor-pointer">
            <AuthMobileSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
