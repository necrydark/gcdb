"use client";

import { UserRole } from "@prisma/client";
import React from "react";
import { Badge } from "../ui/badge";

type Props = {
  name: string;
  username: string;
  email: string;
  isTwoFactorEnabled: boolean;
  role: UserRole;
};
function ViewUser({ name, username, email, isTwoFactorEnabled, role }: Props) {
  return (
    <div className="container mx-auto flex flex-col gap-y-6">
      <h1 className="pb-6">
        Viewing User: <span className="font-bold">{username}</span>
      </h1>
      <div className="flex flex-row gap-4">
        <h1>Name: </h1>
        <h2>{name}</h2>
      </div>
      <div className="flex flex-row gap-4">
        <h1>Email:</h1>
        <h2>{email}</h2>
      </div>
      <div className="flex flex-row gap-4">
        <h1>Username:</h1>
        <h2>{username}</h2>
      </div>
      <div className="flex flex-row gap-4">
        <h1>Role:</h1>
        <Badge
          className={
            role === UserRole.ADMIN
              ? "bg-purple-800 text-white"
              : "bg-red-800 text-white"
          }
        >
          {role === UserRole.ADMIN ? "Admin" : "User"}
        </Badge>
      </div>
      <div className="flex flex-row gap-4">
        <h1>Two Factor Enabled:</h1>
        <Badge
          className={
            isTwoFactorEnabled
              ? "bg-purple-800 text-white hover:bg-purple-900"
              : "bg-red-800 text-white hover:bg-red-900"
          }
        >
          {isTwoFactorEnabled ? "Yes" : "No"}
        </Badge>
      </div>
    </div>
  );
}

export default ViewUser;
