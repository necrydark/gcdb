import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";

export const MobileSidebar = () => {
  const links = [
    {
      title: "Characters",
      url: "/characters",
    },
    {
      title: "Cooking",
      url: "/cooking",
    },
    {
      title: "Gear",
      url: "/gear",
    },
    {
      title: "Holy Relics",
      url: "/relics",
    },
    {
      title: "Login",
      url: "/auth/login",
    },
    {
      title: "Register",
      url: "/auth/register",
    },
  ];
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-foreground" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[9999]" side="left">
        <Sidebar links={links}/>
      </SheetContent>
    </Sheet>
  );
};
