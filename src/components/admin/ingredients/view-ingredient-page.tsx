"use client";
import { Character, Food, HolyRelic, Ingredient, Material } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardCopy, Edit, Eye, EyeClosed, Loader2, Trash } from "lucide-react";
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
import { Badge } from "../../ui/badge";

interface FoodInterface {
  characters?: Character[] | null;
  foodIngredients?: Ingredient & {
    foods: Food[];
    characters?: Character[];
  };
}

export default function ViewIngredientPage({
  foodIngredients,
  characters
}: FoodInterface) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);

      toast({
        title: "Ingredient Deleted",
        description: "The ingredient has been successfully deleted.",
      });

      router.push("/dashboard/ingredients");
    }, 1500);
  };



  const locations = foodIngredients?.location?.split(",");

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
            <Link href={"/dashboard/ingredients"}>
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
                  Delete Ingredient
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this ingredient? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-white">
                  You are about to delete the ingredient{" "}
                  <strong>{foodIngredients?.name}</strong> with ID{" "}
                  <strong>{foodIngredients?.id.substring(0, 8)}...</strong>
                </p>
                {foodIngredients?.foods &&
                  foodIngredients.foods.length > 0 && (
                    <p className="mr-2 dark:text-red-300 text-red-500">
                      Warning: This ingredient is equipped by {length}{" "}
                      food(s).
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
                    "Delete Ingredient"
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
            <Link href={`/dashboard/ingredients/edit/${foodIngredients?.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Ingredient
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ingredient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-md overflow-hidden mb-4">
                <Image
                  src={foodIngredients?.imageUrl || ""}
                  alt={foodIngredients?.name || "Food"}
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Name</span>
                <span>{foodIngredients?.name}</span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">ID</span>
                <span>{foodIngredients?.id}</span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Image URL</span>
                <span className="flex flex-row gap-2 items-center">
                  {foodIngredients?.imageUrl?.substring(0, 20)}
                  <Button
                    className="inline-flex dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
                    onClick={() => {navigator.clipboard.writeText(foodIngredients?.imageUrl as string)}}
                  >
                    <ClipboardCopy className="h-4 w-4 text-white" />
                  </Button>
                </span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Locations</span>
                <div className="flex flex-row gap-1">
                  {locations?.map((loc) => (
                         <Badge variant={"purple"} key={loc}>
                         {loc}
                       </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle>Used In Food</CardTitle>
            <CardDescription>
              This material is used in {length} food.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {foodIngredients?.foods.map((food) => (
                <div
                  key={food.id}
                  className="flex items-center gap-4 border rounded-[5px] border-purple-400 dark:border-purple-700 p-3"
                >
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={food.imageUrl}
                      alt={food.name}
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/dashboard/ingredients/view/${food.id}`}
                      className="font-medium hover:underline"
                    >
                      {food.name}
                    </Link>
                    <p className="text-sm dark:text-gray-300 text-gray-500">
                      ID: {food.id.substring(0, 8)}...
                    </p>
               
                  </div>
                  <Button
                      className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all rounded-[5px] duration-250"
                      variant={"outline"}
                      size={"sm"}
                      asChild
                    >
                      <Link href={`/dashboard/food/view/${food.id}`}>
                        View
                      </Link>
                    </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
