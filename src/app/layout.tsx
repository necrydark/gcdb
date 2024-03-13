import Footer from "@/components/footer";
// import Navbar from "@/components/navbar";
import Nav from "@/components/newNav";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GCWiki",
  description: "A wiki created for The Seven Deadly Sins: Grand Cross",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col text-gray-900 dark:bg-gray-800 transition-all duration-300 dark:text-white">
            <Nav />
            <div className="flex-1 pb-20">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
