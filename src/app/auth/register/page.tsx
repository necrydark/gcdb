import RegisterForm from "@/src/components/auth/registerForm";
import Link from "next/link";
import React from "react";

function RegisterPage() {
  return (
    <div className="container mx-auto p-4 relative pt-[1rem] pb-20 flex-col items-center justify-center z-10 flex">
      <div className="shadow-md bg-secondary p-10 rounded-md border">
        <h1 className="text-3xl text-center p-4">Register</h1>
        <RegisterForm />
        <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0 text-gray-500 dark:text-gray-400">
            or
          </p>
        </div>
        <div className="w-full text-center">
          <Link
            href={"/auth/login"}
            className="text-white text-sm hover:underline"
          >
            Already Registered? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
