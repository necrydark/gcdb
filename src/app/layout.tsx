import { auth } from "@/src/auth";
import { Toaster } from "@/src/components/ui/sonner";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";
import { Providers } from "./providers";

import { ourFileRouter } from "@/src/app/api/uploadthing/core";
import { ContextProvider } from "../components/eng-jp";
import { PostHogProvider } from "../components/ph-providers";

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
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Providers>
            <ContextProvider>
              <PostHogProvider>
                <div className="flex-1 flex-col flex">
                  <div suppressHydrationWarning>
                    <NextSSRPlugin
                      /**
                       * The `extractRouterConfig` will extract **only** the route configs
                       * from the router to prevent additional information from being
                       * leaked to the client. The data passed to the client is the same
                       * as if you were to fetch `/api/uploadthing` directly.
                       */
                      routerConfig={extractRouterConfig(ourFileRouter)}
                    />

                    {children}
                    <Toaster />
                  </div>
                  <Toaster closeButton />
                </div>
              </PostHogProvider>
            </ContextProvider>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
