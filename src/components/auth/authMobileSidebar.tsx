import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Menu } from "lucide-react";
import AuthSidebar from "./authSidebar";

export const AuthMobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[9999]" side="left">
        <AuthSidebar />
      </SheetContent>
    </Sheet>
  );
};
