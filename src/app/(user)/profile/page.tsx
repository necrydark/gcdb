import { getUserData } from "@/prisma/queries";
import SmallCharacterCard from "@/src/components/small-character-card";
import SmallFoodCard from "@/src/components/small-food-card";
import { Button } from "@/src/components/ui/button";
import { currentUser } from "@/src/lib/auth";
import db from "@/src/lib/db";
import { cn } from "@/src/lib/utils";
import { ProfileColour } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import testimg from "../../../../public/test-bg.png";
import CardSection from "./card-section";
import SmallCardSection from "./small-card-section";

// import { getUsername } from "../../../prisma/queries";

// async function getFavourites(userId: string) {
//   const data = await db.favourite.findMany({
//     where: {
//       userId: userId,
//     },
//     select: {
//       character: {
//         select: {
//           name: true,
//           slug: true,
//           tag: true,
//           imageUrl: true,
//           basicInfo: {
//             select: {
//               attribute: true,
//               race: true,
//               rarity: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   return data;
// }

async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const userData = getUserData({ userId: user.id as string });

  const [data] = await Promise.all([userData]);

  const names = ["Meliodas", "Elizabeth", "Diane", "Zeldris", "Escanor"];

  // const userData = await getData(user.id as string);
  // const userFavourites = await getFavourites(user.id as string);
  const username = data?.username;
  const bio = data?.bio;
  const cardColour = data?.profileColour;
  const colour = cardColour?.toLocaleLowerCase();

  return (
    <div className=" flex flex-col pb-20">
      {/* Banner */}
      <div>
        <Image
          alt={`${username}'s Banner`}
          priority
          src={data?.banner ?? testimg}
          className="h-[200px] w-full object-cover border-b-[1px] border-b-white"
        />

        {/* Profile Picture */}
        <Image
          src={
            user?.image ??
            "https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
          }
          alt="User profile picture"
          priority
          width={75}
          height={75}
          className="rounded-full border mx-auto -translate-y-[35px] border-white"
        />
        {/* Username */}
        <h1 className="text-3xl font-extrabold text-center -translate-y-[25px] tracking-tight">
          {username ?? names.map((name) => name)}
        </h1>
      </div>

      {/* Profile Section */}
      <div className="max-w-[1200px] md:mx-auto md:px-0 px-8">
        <p className="py-4 px-2">{bio ?? "No Bio Found"}</p>
        <div className="flex justify-between items-center mt-6 flex-row">
          <h1 className="md:text-3xl text-2xl font-extrabold tracking-tight">
            Your Recent Favourites
          </h1>
          <Button
            className="hover-btn"
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
            asChild
          >
            <Link href={"/profile/favourites"}>View All Favourites</Link>
          </Button>
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
        {/* Food & Gear */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-6">
          <div>
            {/* Food */}
            <div className="flex justify-between items-center mt-6 flex-row">
              <h1 className="lg:text-2xl md:text-md text-md font-extrabold tracking-tight">
                Favourite Food
              </h1>
              <Button
                className="hover-btn"
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
                asChild
              >
                <Link href={"/profile/favourites"}>View All Food</Link>
              </Button>
            </div>
            <SmallCardSection sectionColour={cardColour as ProfileColour}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center w-fit mx-auto">
                {/* @TODO: Add recent favourites from DB */}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  slug="queen_diane_2"
                  colour={colour as ProfileColour}
                />
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  slug="queen_diane_2"
                  colour={colour as ProfileColour}
                />{" "}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  slug="queen_diane_2"
                  colour={colour as ProfileColour}
                />{" "}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  slug="queen_diane_2"
                  colour={colour as ProfileColour}
                />
              </div>
            </SmallCardSection>
          </div>
          <div>
            {/* Gear */}
            <div className="flex justify-between items-center mt-6 flex-row">
              <h1 className="lg:text-2xl md:text-md text-md font-extrabold tracking-tight">
                Favourite Gear
              </h1>
              <Button
                className="hover-btn"
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
                asChild
              >
                <Link href={"/profile/favourites"}>View All Gear</Link>
              </Button>
            </div>
            <SmallCardSection sectionColour={cardColour as ProfileColour}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center w-fit mx-auto">
                {/* @TODO: Add recent favourites from DB */}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  slug="queen_diane_2"
                  colour={colour as ProfileColour}
                />
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  slug="queen_diane_2"
                  colour={colour as ProfileColour}
                />{" "}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  colour={colour as ProfileColour}
                  slug="queen_diane_2"
                />{" "}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  colour={colour as ProfileColour}
                  name="Queen Diane"
                  slug="queen_diane_2"
                />
              </div>
            </SmallCardSection>
          </div>
          <div>
            {/* Gear */}
            <div className="flex justify-between items-center mt-6 flex-row">
              <h1 className="lg:text-2xl md:text-md text-md font-extrabold tracking-tight">
                Favourite Relics
              </h1>
              <Button
                className="hover-btn"
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
                asChild
              >
                <Link href={"/profile/favourites"}>View All Relics</Link>
              </Button>
            </div>
            <SmallCardSection sectionColour={cardColour as ProfileColour}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center w-fit mx-auto">
                {/* @TODO: Add recent favourites from DB */}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  colour={colour as ProfileColour}
                  slug="queen_diane_2"
                />
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  colour={colour as ProfileColour}
                  slug="queen_diane_2"
                />{" "}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  colour={colour as ProfileColour}
                  slug="queen_diane_2"
                />{" "}
                <SmallFoodCard
                  imageUrl="https://gcdatabase.com/images/characters/queen_diane/ssrr_portrait.png"
                  name="Queen Diane"
                  colour={colour as ProfileColour}
                  slug="queen_diane_2"
                />
              </div>
            </SmallCardSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

// {
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
// }