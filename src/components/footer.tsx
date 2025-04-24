import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Separator } from "./ui/separator";

function Footer() {
  return (
    <footer className="bg-purple-700 dark:bg-purple-950 transition-all duration-300 py-12 px-4">
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">GCWiki </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Your comprehensive resource for game information, characters, and equipment.
          </p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/characters" className="text-gray-500 hover:underline dark:text-gray-300 hover:text-foreground">
                Characters
              </Link>
            </li>
            <li>
              <Link href="/holy-relics" className="text-gray-500  hover:underline dark:text-gray-300 hover:text-foreground">
                Holy Relics
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                Events
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                News
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/guides" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/tier-lists" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                Tier Lists
              </Link>
            </li>
            <li>
              <Link href="/calculators" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                Calculators
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Community</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                Reddit
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-500 dark:text-gray-300  hover:underline hover:text-foreground">
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-300">© {new Date().getFullYear()} GCWiki. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-300 hover:underline hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-300 hover:underline hover:text-foreground">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm text-gray-500 dark:text-gray-300 hover:underline hover:text-foreground">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
