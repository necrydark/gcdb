import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
import { Menu } from "lucide-react";
import AdminSidebar from "./admin-sidebar";

const AdminMobileSidebar = () => {
  const links = [
    {
      title: "Dashboard",
      url: "/admin",
    },
    {
      title: "Characters",
      url: "/admin/characters",
    },
    {
      title: "Users",
      url: "/admin/users",
    },

    {
      title: "Holy Relics",
      url: "/admin/relics",
    },
    {
      title: "Relic Materials",
      url: "/admin/materials",
    },
  ];
  return (
      <Sheet>
        <SheetTrigger>
          <Menu className="text-foreground" />
        </SheetTrigger>
        <SheetContent className="p-0 z-[9999]" side="left">
          <AdminSidebar links={links} />
        </SheetContent>
      </Sheet>
  );
};

export default AdminMobileSidebar;
