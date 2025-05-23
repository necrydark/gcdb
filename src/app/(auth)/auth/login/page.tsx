import LoginForm from "@/src/components/auth/signInForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <div className="container mx-auto p-4 relative h-[800px] pt-[1rem] flex-col items-center justify-center z-10 flex">
      <div className="shadow-md bg-purple-400 dark:bg-purple-700 p-10 rounded-[5px] border">
        <h1 className="text-3xl text-center p-4">Login</h1>
        <LoginForm />
        <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0 text-gray-500 dark:text-gray-400">
            or
          </p>
        </div>
        <Link
          href={"/auth/register"}
          className="text-white text-sm text-center hover:underline"
        >
          Not Registered? Create An Account
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
