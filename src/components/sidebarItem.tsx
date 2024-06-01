"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type Props = {
  title: string;
  url: any;
};

export const SidebarItem = ({ title, url }: Props) => {
  const pathname = usePathname();

  return (
    <Button
      className="justify-start h-[28px] bg-transparent hover:bg-[#2563eb]/50  text-foreground  rounded-md"
      asChild
    >
      <Link href={url}>{title}</Link>
    </Button>
  );
};
