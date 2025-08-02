"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { food } from "./food-tabs";

type Props = {
  food: food;
  town?: string;
};

export default function Foods({ town, food }: Props) {
  const [activeTab, setActiveTab] = useState("effect");

  if (!food) {
    return <div>No Food Found</div>;
  }

  return (
    <>
      <Card className="h-full rounded-[5px] hover:shadow-xl transition-shadow px-8 py-4 relative duration-200 bg-gradient-to-br from-card via-card to-purple-50/30 dark:to-purple-900/10 border border-border/50 overflow-hidden">
        <CardHeader className="pb-2 items-center">
          <Image src={food?.imageUrl} alt={food?.name} width={64} height={64} />
        </CardHeader>
        <CardContent className="space-y-4 w-full">
          <div className="flex flex-col gap-4 w-full">
            <h2 className="font-bold text-lg text-center text-white">
              {food.name}
            </h2>

            <Tabs
              defaultValue="effect"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full "
            >
              <TabsList className="grid grid-cols-2 w-full rounded-xl bg-muted/50 dark:bg-muted/30 border border-border/50 shadow-lg">
                <TabsTrigger
                  value="effect"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-300 text-foreground"
                >
                  Main
                </TabsTrigger>
                <TabsTrigger
                  value="characters"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md rounded-xl transition-all duration-300 text-foreground"
                >
                  Characters
                </TabsTrigger>
              </TabsList>

              <TabsContent value="effect" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">
                      Effect
                    </h4>
                    <p className="text-sm text-muted-foreground m-0">
                      {food.effect}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white mb-2">
                      Affinity
                    </h4>
                    <p className="text-sm text-muted-foreground m-0">
                      +{food.affinity} Affinity
                    </p>
                  </div>
                </div>

                <h4 className="text-sm font-medium mb-2 mt-6 text-white">
                  Required Ingredients
                </h4>

                <div className="flex flex-col flex-wrap gap-2">
                  <>
                    {food.ingredients?.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="flex items-center flex-row gap-2"
                      >
                        <Image
                          src={ingredient.imageUrl as string}
                          alt={ingredient.name}
                          width={50}
                          height={50}
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-sm font-medium text-white">
                            {ingredient.name}
                          </h4>
                          {ingredient.location && (
                            <h4 className="text-xs text-gray-700 dark:text-muted-foreground font-medium">
                              {ingredient.location}
                            </h4>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="space-y-4 mt-4">
                <h4 className="text-sm font-medium mb-2 text-white">
                  Required Ingredients
                </h4>

                <div className="flex flex-col flex-wrap gap-2">
                  <>
                    {food.ingredients?.map((ingredient, idx) => (
                      <div
                        key={idx}
                        className="flex items-center flex-row gap-2"
                      >
                        <Image
                          src={ingredient.imageUrl as string}
                          alt={ingredient.name}
                          width={50}
                          height={50}
                        />
                        <div className="flex flex-col gap-1">
                          <h4 className="text-sm font-medium text-white">
                            {ingredient.name}
                          </h4>
                          {ingredient.location && (
                            <h4 className="text-xs text-gray-700 dark:text-muted-foreground font-medium">
                              {ingredient.location}
                            </h4>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              </TabsContent>
              <TabsContent value="characters" className="space-y-4 mt-4">
                {food.characters && food.characters.length > 0 ? (
                  <div className="flex flex-row flex-wrap gap-4 justify-evenly">
                    {food.characters.map((character, idx) => (
                      <Link key={idx} href={`/characters/${character.slug}`}>
                        <div className="flex items-center hover:text-foreground/70 duration-300 transition-all gap-1 flex-row">
                          <Image
                            src={character.imageUrl}
                            alt={character.name as string}
                            width={75}
                            height={75}
                            className="object-cover hover:shadow-2xl transition-shadow duration-300"
                          />
                          <div className="flex flex-col gap-2"></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center text-muted-foreground">
                    <h1>No Characters found...</h1>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
