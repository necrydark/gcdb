"use client";
import { AppSidebar } from "@/src/components/admin/admin-sidebar";
import { DashboardHeader } from "@/src/components/admin/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-b from-background to-muted/20   flex flex-col">
        <DashboardHeader />
        <main className="pt-6 flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
