"use client";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import React, { useState } from "react";
import ThemeToggle from "./ThemeToggle";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const links = [
    {
      name: "Home",
      url: "/",
    },
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
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">GCWiki</p>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close Menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        {links.map((link, idx) => (
          <NavbarItem key={idx}>
            <Link href={link.url}>{link.name}</Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {links.map((link, idx) => (
          <NavbarMenuItem key={`${link}-${idx}`}>
            <Link href={link.url} className="w-full" size="lg">
              {link.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <ThemeToggle />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}

export default Nav;
