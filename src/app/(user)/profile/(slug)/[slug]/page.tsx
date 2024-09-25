import { useCurrentUser } from "@/hooks/use-current-user";
import {
  getUserData,
  getUserDataByUsername,
  getUsername,
  userDataByUsername,
} from "@/prisma/queries";
import SmallCharacterCard from "@/src/components/small-character-card";
import SmallFoodCard from "@/src/components/small-food-card";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { currentUser } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { cn } from "@/src/lib/utils";
import { ExtendedUser } from "@/src/next-auth";
import { ProfileColour, User, UserRole } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";
import testimg from "../../../../../../public/test-bg.png";
import CardSection from "./card-section";
import SmallCardSection from "./small-card-section";

interface PageProps {
  params: {
    slug: string;
  };
}

async function ProfilePage({ params }: PageProps) {
  const { slug } = params;

  const userData = await getUserDataByUsername({ username: slug as string });

  const [data] = await Promise.all([userData]);

  if (!data) {
    return notFound();
  }

  const names = ["Meliodas", "Elizabeth", "Diane", "Zeldris", "Escanor"];

  // const userData = await getData(user.id as string);
  // const userFavourites = await getFavourites(user.id as string);
  const cardColour = data?.profileColour;
  const colour = cardColour?.toLocaleLowerCase();

  return (
    <div
      className={cn(
        " flex flex-col",
        colour === "red" && "bg-red-400 text-white dark:bg-red-800",
        colour === "blue" && "bg-blue-400 text-white dark:bg-blue-800",
        colour === "green" && "bg-green-400 text-white dark:bg-green-800",
        colour === "yellow" && "bg-yellow-400 text-white dark:bg-yellow-800",
        colour === "purple" && "bg-purple-400 text-white dark:bg-purple-800",
        colour === "orange" && "bg-orange-400 text-white dark:bg-orange-800",
        colour === "pink" && "bg-pink-400 text-white dark:bg-pink-800",
        colour === "cyan" && "bg-cyan-400 text-white dark:bg-cyan-800"
      )}
    >
      {/* Banner */}
      <div>
        <Image
          alt={`${data?.username}'s Banner`}
          priority
          width={1920}
          height={200}
          src={data?.banner ?? testimg}
          className="h-[200px] w-full object-cover border-b-[1px] border-b-white"
        />

        {/* Profile Picture */}
        <Image
          src={
            data?.image ??
            "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
          }
          alt="User profile picture"
          priority
          width={75}
          height={75}
          className="rounded-full aspect-[1] border mx-auto -translate-y-[35px] border-white"
        />
        {/* Username */}
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-3xl pr-[10px] font-extrabold text-center -translate-y-[25px] tracking-tight">
            {data?.username ?? names.map((name) => name)}
          </h1>
          <Badge
            className=" -translate-y-[25px] text-white "
            variant={
              colour as
                | "red"
                | "green"
                | "blue"
                | "yellow"
                | "orange"
                | "pink"
                | "cyan"
                | "purple"
                | null
                | undefined
            }
          >
            {data?.role === "USER"
              ? "User"
              : data?.role === "ADMIN"
              ? "Admin"
              : data?.role === "OWNER"
              ? "Owner"
              : null}
          </Badge>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-[1200px] md:mx-auto md:px-0 px-8">
        <p className="py-4 px-2">{data?.bio ?? "No Bio Found"}</p>
        <div className="flex justify-between items-center mt-6 flex-row">
          <h1 className="md:text-3xl text-2xl font-extrabold tracking-tight">
            {`${data?.username}'s Favourite Characters`}
          </h1>
        </div>
        <CardSection sectionColour={cardColour as ProfileColour}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {/* @TODO: Add recent favourites from DB */}
            <SmallCharacterCard
              attribute="Strength"
              imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
              name="Queen Diane"
              race="Giant"
              rarity="SSR"
              slug="queen_diane_2"
              colour={colour as ProfileColour}
            />
            <SmallCharacterCard
              attribute="Strength"
              imageUrl="https://gcdatabase.com/images/characters/jyu_viole_grace/ssrr_portrait.png"
              name="Jue Viole Grace"
              race="Human"
              rarity="SSR"
              slug="jue_viole_grace"
              colour={colour as ProfileColour}
            />
            <SmallCharacterCard
              attribute="HP"
              imageUrl="https://gcdatabase.com/images/characters/alioni/rg_portrait.webp"
              name="Alioni"
              race="Human"
              rarity="R"
              slug="alioni"
              colour={colour as ProfileColour}
            />
            <SmallCharacterCard
              attribute="HP"
              imageUrl="https://gcdatabase.com/images/characters/eren/ssrg_portrait.webp"
              name="Eren Yeager"
              race="Human / Giant"
              rarity="SSR"
              slug="eren_yeager"
              colour={colour as ProfileColour}
            />
          </div>
        </CardSection>
      </div>
    </div>
  );
}

export default ProfilePage;

{
  /* {userFavourites.length === 0 ? (
            <div className="flex flex-row items-center">
              <p className="pr-2 font-semibold leading-tight">
                You have no favourites!
              </p>
              <Button
                asChild
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                <Link className="pl-2 " href={"/characters"}>
                  Visit the characters page
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              {userFavourites.map((favourite, idx) => (
                <div key={idx}>
                  <Image
                    src={
                      favourite?.character?.imageUrl ??
                      "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                    }
                    alt={favourite?.character?.name ?? "Character Image"}
                    priority
                    width={75}
                    height={75}
                  />
                  <h1 className="text-xl font-extrabold tracking-tight">
                    {favourite?.character?.name ?? "Character Name"}
                  </h1>
                  <Link href={`/characters/${favourite?.character?.slug}`}>
                    View
                  </Link>
                </div>
              ))}
            </div>
          )} */
}
