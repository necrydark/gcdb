import { Gift } from "@/src/types/gift";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
type Props = {
  gifts?: Gift[];
};

export default function CharacterGiftsTab({ gifts }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gifts</CardTitle>
        <CardDescription>
          All available gifts to improve character affection to gain rewards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {gifts && gifts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gifts.map((gift, idx) => {
              return (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex gap-2 flex-col md:flex-row items-center">
                    <Image
                      width={64}
                      height={64}
                      className="object-cover"
                      src={gift.imageUrl}
                      alt={gift.name}
                    />
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-base">
                        {gift.name}
                      </p>
                      <p className="text-muted-foreground">
                        {gift.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <p className="text-base font-semibold text-center">
              No gifts available...
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
