import AuthNavbar from "@/src/components/auth/auth-nav";
import Footer from "@/src/components/footer";
import Navbar from "@/src/components/navbar";
import UserLayout from "@/src/components/profile/user-layout";
import { currentUser } from "@/src/utils/auth";
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

const MainLayout = async ({ children }: Props) => {
  const user = await currentUser();

  return (
    <div className="min-h-screen flex flex-col text-gray-900 transition-all duration-300 dark:text-white flex-1">
      {!user && <Navbar />}
      {user && <AuthNavbar />}
      <UserLayout user={user}>
        <div className="h-full">{children}</div>
      </UserLayout>
      <Footer />
    </div>
  );
};

export default MainLayout;
