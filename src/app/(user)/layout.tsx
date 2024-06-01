import AuthNavbar from "@/src/components/auth/auth-nav";
import Footer from "@/src/components/footer";
import UserLayout from "@/src/components/profile/user-layout";
import Sidebar from "@/src/components/sidebar";
import { currentUser } from "@/src/lib/auth";
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
  const user = await currentUser();

  return (
    <>
      <UserLayout user={user}>
        <div className="h-full">{children}</div>
      </UserLayout>
    </>
  );
};

export default MainLayout;
