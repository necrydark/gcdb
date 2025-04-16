import RegisterForm from "@/src/components/auth/registerForm";
import Link from "next/link";
import React from "react";

function RegisterPage() {
  return (
    <div className="container mx-auto p-4 relative pt-[1rem] pb-20 flex-col items-center justify-center z-10 flex">
      <div className="shadow-md rounded-md  bg-purple-600 dark:bg-purple-950">
        <div className="p-10">
        <h1 className="text-3xl text-center text-white p-4">Register</h1>
        <RegisterForm />
        <div className="flex items-center my-8 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
          <p className="text-center font-semibold mx-4 mb-0 text-white">
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
    </div>
  );
}

export default RegisterPage;
