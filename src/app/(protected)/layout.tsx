'use client'
import {AppSidebar} from "@/src/components/admin/admin-sidebar";
import { DashboardHeader } from "@/src/components/admin/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";
import { Metadata } from "next";

type Props = {
  children: React.ReactNode;
};



const AdminLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-b from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-600/60 dark:to-purple-900  flex flex-col">
        <DashboardHeader />
        <main className="pt-6 flex-1 overflow-auto">{children}</main>

      </SidebarInset>
      
    </SidebarProvider>

  );
};

export default AdminLayout;