import AuthNavbar from "@/src/components/auth/auth-nav";
import Footer from "@/src/components/footer";
import UserLayout from "@/src/components/profile/user-layout";
import Sidebar from "@/src/components/sidebar";
import { currentUser } from "@/src/utils/auth";
import db from "@/src/lib/db";
import { cn } from "@/src/lib/utils";
import { ExtendedUser } from "@/src/next-auth";
import { Metadata } from "next";
import { useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    template: "%s | GCWiki",
    default: "GCWiki",
  },
};

const MainLayout = async ({ children }: Props) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
