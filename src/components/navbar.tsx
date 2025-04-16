import ThemeToggle from "@/src/components/ThemeToggle";
import Link from "next/link";
import React from "react";
import { MobileSidebar } from "./mobileSidebar";

export default async function Navbar() {
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
    {
      name: "Login",
      url: "/auth/login",
    },
    {
      name: "Register",
      url: "/auth/register",
    },
  ];

  return (
    <>
      <div className="w-full bg-purple-600 dark:bg-purple-950 border-b-[1px] border-b-divider">
        <div className="max-w-[1280px] mx-auto flex justify-between px-2">
          <div className="flex">
            <Link
              href="/"
              className="p-5 hover:opacity-60 transition-all duration-300 text-white"
            >
              GCWiki
            </Link>
          </div>
          <div className="md:flex items-center hidden">
            {links.map((link) => (
              <Link
                href={link.url}
                className="p-4 hover:opacity-60 transition-all text-white duration-300"
                key={link.name}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          <div className="md:hidden items-center flex cursor-pointer">
            <MobileSidebar />
          </div>
        </div>
      </div>
    </>
  );
}
