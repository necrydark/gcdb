import { MobileHeader } from "@/src/components/admin/admin-header";
import AdminSidebar from "@/src/components/admin/admin-sidebar";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: "%s | GCWiki",
    default: "GCWiki",
  },
};

const AdminLayout = ({ children }: Props) => {
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
        }
       
      ];
  return (
    <div className="min-h-screen flex flex-col text-gray-900 bg-background transition-all duration-300 dark:text-white">
      <MobileHeader />
      <AdminSidebar className="hidden lg:flex" links={links} />
      <main className="lg:pl-[256px] h-full">
        <div className="max-w-[1056px] pt-6 mx-auto h-full">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;