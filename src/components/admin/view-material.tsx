"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  name: string;
  imageUrl: string;
};
function ViewMaterial({ name, imageUrl }: Props) {
  return (
    <div className="container mx-auto flex flex-col gap-y-6">
      <h1 className="pb-6">
        Viewing Material: <span className="font-bold">{name}</span>
      </h1>
      <div className="flex flex-row gap-4">
        <h1>Name: </h1>
        <h2 className="font-bold">{name}</h2>
      </div>
      <div className="flex flex-col gap-4">
        <h1>Image:</h1>
        <Image
          src={imageUrl}
          alt={`Material + ${name}`}
          width={75}
          height={75}
          className="mx-auto"
        />
        <Button variant="outline" size="sm" asChild>
          <Link href={imageUrl} target="_blank" rel="noreferrer">
            Open Image
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ViewMaterial;
