import ThemeToggle from "@/src/components/ThemeToggle";
import Link from "next/link";
import React from "react";
import { AuthMobileSidebar } from "./authMobileSidebar";
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
      name: "Holy Relics",
      url: "/relics",
    },
  ];

  return (
    <>
      <div className="w-full bg-card border-b-[1px] border-b-divider">
        <div className="max-w-[1280px] mx-auto flex justify-between px-2">
          <div className="flex">
            <Link
              href="/"
              className="p-5 hover:opacity-60 transition-all duration-300 text-foreground"
            >
              GCWiki
            </Link>
          </div>
          <div className="md:flex items-center hidden">
            {links.map((link) => (
              <Link
                href={link.url}
                className="p-4 hover:opacity-60 transition-all text-foreground duration-300"
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
            <UserButton className="mr-2" />
            <ThemeToggle />
          </div>
          <div className="md:hidden items-center flex cursor-pointer">
            <AuthMobileSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
