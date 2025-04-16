"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Logo = () => {
  const pathname = usePathname();

  return (
    <Link className="text-2xl font-extrabold tracking-wide hover:text-foreground/80 duration-300 text-white" href="/">
        GCWiki
    </Link>
  );
};

export default Logo;
