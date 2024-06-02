import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-card border-t-[1px] border-t-divider transition-all duration-300">
      <div className="mx-auto w-full">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 max-w-screen-lg mx-auto">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-foreground">
              Company
            </h2>
            <ul className="text-foreground font-medium">
              <li className="mb-4">
                <Link href="/about" className=" hover:underline"></Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold  uppercase text-foreground">
              Resources
            </h2>
            <ul className="text-foreground  font-medium">
              <li className="mb-4">
                <Link
                  href={{ pathname: "/privacy" }}
                  className="hover:underline"
                >
                  Sitemap
                </Link>
              </li>
              <li className="mb-4">
                <Link href={{ pathname: "/terms" }} className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-card border-t-[1px] border-t-divider transition-all duration-300 flex items-center justify-center md:flex-row flex-col md:justify-between">
          <span className="text-md md:text-left text-center text-foreground ">
            GCWiki, we are not affliated with or endorsed by Netmarble.
          </span>
          <div className="flex mt-4 md:mt-0 space-x-5 justify-center rtl:space-x-reverse">
            <Link
              href="https://twitter.com/necrydark"
              target="_blank"
              className=" transition-all duration-300 text-foreground hover:text-foreground-600"
            >
              <FaXTwitter className="text-[1.25rem]" />
              <span className="sr-only">twitter.com/necrydark</span>
            </Link>
            <Link
              href="https://github.com/necrydark"
              target="_blank"
              className=" transition-all duration-300 text-foreground hover:text-foreground-600"
            >
              <FaGithub className="text-[1.25rem]" />
              <span className="sr-only">github.com/necrydark</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
