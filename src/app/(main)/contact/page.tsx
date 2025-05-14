"use client";
import { ContactForm } from "@/src/components/forms/contactForm";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ContactPage() {
  const MotionLink = motion(Link);

  return (
    <>
      <div className="container mx-auto p-4 relative h-[800px] pt-[1rem] flex-col items-center justify-center flex">
        <div className="p-8  max-w-[800px] w-full">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            
          >
            Contact Us
          </motion.h1>
          <p className="text-sm dark:text-gray-300 text-gray-500 text-center pt-1">We&apos;re open to enquiries, feedback or if you want to join the team!</p>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
