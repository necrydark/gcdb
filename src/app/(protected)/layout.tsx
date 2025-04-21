import {AppSidebar} from "@/src/components/admin/admin-sidebar";
import { DashboardHeader } from "@/src/components/admin/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
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

  return (

    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-b from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-600/60 dark:to-purple-900  flex flex-col min-h-screen h-full">
        <DashboardHeader />
        <div className="pt-6  h-full flex-1 overflow-auto">{children}</div>

      </SidebarInset>
      
    </SidebarProvider>

  );
};

export default AdminLayout;