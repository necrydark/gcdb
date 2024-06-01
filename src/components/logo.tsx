"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Logo = () => {
  const pathname = usePathname();

  return (
    <Link href="/">
      <h1 className="text-2xl font-extrabold tracking-wide text-foreground">
        GCWiki
      </h1>
    </Link>
  );
};

export default Logo;
