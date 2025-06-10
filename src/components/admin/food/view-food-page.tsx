"use client";
import { Character, Food, HolyRelic, Ingredient, Material } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Edit, Eye, EyeClosed, Loader2, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface FoodInterface {
  characters?: Character[] | null;
  ingredients?: Ingredient[] | null;
  food: Food;
  foodIngredients?: Food & {
    ingredients: Ingredient[];
    characters?: Character[];
  };
}

export default function ViewFoodPage({
  foodIngredients,
  characters,
  food,
  ingredients
}: FoodInterface) {
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);

      toast({
        title: "Food Deleted",
        description: "The food has been successfully deleted.",
      });

      router.push("/dashboard/food");
    }, 1500);
  };

 

  const length = foodIngredients?.characters?.length;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
            asChild
          >
            <Link href={"/dashboard/food"}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl text-white font-bold tracking-tight">
              {foodIngredients?.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>ID: {foodIngredients?.id.substring(0, 8)}...</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                size={"sm"}
                className="text-white dark:hover:bg-purple-950 border-purple-900 bg-purple-400  rounded-[5px] hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-purple-300 dark:bg-purple-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Delete Food
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this food? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-white">
                  You are about to delete the food
                  <strong>{foodIngredients?.name}</strong> with ID{" "}
                  <strong>{foodIngredients?.id.substring(0, 8)}...</strong>
                </p>
                {foodIngredients?.characters &&
                  foodIngredients.characters.length > 0 && (
                    <p className="mr-2 text-destructive">
                      Warning: This food is equipped by {length}{" "}
                      character(s).
                    </p>
                  )}
              </div>
              <DialogFooter>
                <Button
                  variant={"outline"}
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={isDeleting}
                  className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
                >
                  Cancel
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={handleDelete}
                  className=" rounded-[5px]"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete Food"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            asChild
            size={"sm"}
            className="text-white dark:hover:bg-purple-950  rounded-[5px] border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
          >
            <Link href={`/dashboard/food/edit/${foodIngredients?.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Food
            </Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
        </TabsList>
        {/* Details View */}
        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid gap-6 md:grid-cols-1 ">
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-[5px] border-purple-300 dark:border-purple-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Food Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <div className="rounded-md overflow-hidden mb-4">
                    <Image
                      src={food.imageUrl || "/placeholder.svg"}
                      alt={food.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Name</span>
                    <span>{food.name}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">ID</span>
                    <span>{food.id}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Location</span>
                    <Badge variant={"purple"}>{food.location}</Badge>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Effect</span>
                    <span className="text-right max-w-[250px]">
                      {food.effect}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </TabsContent>
        {/* Materials View */}
        <TabsContent value="ingredients" className="space-y-4 pt-4">
          <Card className="bg-purple-500 rounded-[5px] dark:bg-purple-900 border-purple-300 dark:border-purple-800">
            <CardHeader>
              <CardTitle> Required Ingredients</CardTitle>
              <CardDescription>
                Ingredients needed to make this food.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foodIngredients?.ingredients?.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center gap-4 rounded-[5px] border p-3"
                  >
                    <div className="rounded-md overflow-hidden">
                      <Image
                        src={ingredient.imageUrl || ""}
                        alt={ingredient.name}
                        className="h-full w-full object-cover"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex-1">
                      <Link href={`/dashboard/ingredients/view/${ingredient.id}`}>
                        {ingredient.name}
                      </Link>
                      <p className="text-sm">
                        ID: {ingredient.id.substring(0, 8)}...
                      </p>
                    </div>
                    <Button
                      variant={"outline"}
                      className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all rounded-[5px] duration-250"
                      size={"sm"}
                      asChild
                    >
                      <Link href={`/dashboard/ingredients/view/${ingredient.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Characters view */}
        <TabsContent value="characters" className="space-y-4 pt-4">
          <Card className="bg-purple-500 rounded-[5px] dark:bg-purple-900 border-purple-300 dark:border-purple-800">
            <CardHeader>
              <CardTitle>Equipped Characters</CardTitle>
              <CardDescription>
                Characters that can use this food
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {foodIngredients?.characters?.map((character) => (
                  <div
                    key={character.id}
                    className="flex items-center gap-4 rounded-[5px] border p-3"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={character.imageUrl}
                        alt={character.name?.toString() || undefined}
                      />
                      <AvatarFallback>
                        {character.name?.[0] || "C"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link
                        href={`/dashboard/characters/view/${character.id}`}
                        className="font-medium hover:underline"
                      >
                        {character.name}
                      </Link>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        ID: {character.id.substring(0, 8)}...
                      </p>
                    </div>
                    <Button
                      variant={"outline"}
                      className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all rounded-[5px] duration-250"
                      size={"sm"}
                      asChild
                    >
                      <Link href={`/dashboard/characters/view/${character.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
