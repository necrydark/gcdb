import { auth } from "@/src/auth";
import Footer from "@/src/components/footer";
import Navbar from "@/src/components/navbar";
import { Toaster } from "@/src/components/ui/toaster";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import AuthNavbar from "@/src/components/auth/auth-nav";
import { Providers } from "@/src/app/providers";

import { ourFileRouter } from "@/src/app/api/uploadthing/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GCWiki",
  description: "A wiki created for The Seven Deadly Sins: Grand Cross",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
            <div className="min-h-screen flex flex-col text-gray-900 bg-background transition-all duration-300 dark:text-white">
              <div className="flex-1  transition-all duration-300 bg-gradient-to-b from-purple-300 via-purple-400/60 to-purple-600 dark:from-purple-500/30 dark:via-purple-700/60 dark:to-purple-900">
                {children}
              </div>
            </div>
  );
}
