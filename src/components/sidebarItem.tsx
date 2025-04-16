"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type Props = {
  title: string;
  url: any;
  className?: string
};

export const SidebarItem = ({ title, url, className }: Props) => {
  const pathname = usePathname();

  return (
    <Button
      className={cn(className, "justify-start h-[28px] bg-transparent hover:bg-secondary/75  rounded-md")}
      asChild
    >
      <Link href={url}>{title}</Link>
    </Button>
  );
};
