import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="dark:bg-[#1a1b1f] h-full">
      <div className="container mx-auto p-5">
        <div>
          <h1 className="text-center text-white text-2xl">
            Welcome to the Grand Cross Wiki
          </h1>
        </div>
      </div>
    </div>
  );
}
