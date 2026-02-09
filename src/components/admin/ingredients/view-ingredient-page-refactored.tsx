"use client";
import { deleteIngredient } from "@/src/actions/food";
import {
  InfoSection,
  type InfoItem,
} from "@/src/components/admin/shared/info-section";
import { Character, Food, Ingredient } from "@prisma/client";
import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
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

interface FoodInterface {
  characters?: Character[] | null;
  foodIngredients?: Ingredient & {
    foods: Food[];
    characters?: Character[];
  };
}

export default function ViewIngredientPageRefactored({
  foodIngredients,
  characters,
}: FoodInterface) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!foodIngredients) {
    return <div>Ingredient not found.</div>;
  }

  const handleDelete = () => {
    setIsDeleting(true);
    deleteIngredient(foodIngredients.id)
      .then((data) => {
        if (data?.error) {
          toast.error("Error deleting ingredient", {
            description: data.error,
          });
        } else {
          toast.success("Ingredient deleted successfully");
          router.push("/dashboard/ingredients");
        }
      })
      .catch((error) => {
        toast.error("Error deleting ingredient", {
          description: error.message,
        });
      })
      .finally(() => {
        setIsDeleting(false);
        setIsDeleteDialogOpen(false);
      });
  };

  const basicInfo: InfoItem[] = [
    {
      label: "ID",
      value: foodIngredients.id.substring(0, 8) + "...",
    },
    {
      label: "Name",
      value: foodIngredients.name,
    },
    {
      label: "Image",
      value: foodIngredients.imageUrl || "/placeholder.svg",
      type: "image",
    },
    {
      label: "Location",
      value: foodIngredients.location,
    },
  ];

  const relatedFoodInfo: InfoItem[] = [
    {
      label: "Related Food Items",
      value: foodIngredients.foods?.map((food) => food.name) || [],
      type: "array",
    },
  ];

  const relatedCharactersInfo: InfoItem[] = [
    {
      label: "Characters Using This Ingredient",
      value:
        foodIngredients.characters
          ?.map((char) => char.name || "")
          .filter(Boolean) || [],
      type: "array",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {foodIngredients.name}
          </h2>
          <p className="text-gray-400">
            Detailed information about this ingredient
          </p>
        </div>

        <div className="flex gap-2">
          <Link href={`/dashboard/ingredients/edit/${foodIngredients.id}`}>
            <Button
              variant="outline"
              className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600"
            >
              Edit
            </Button>
          </Link>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="destructive" disabled={isDeleting}>
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-purple-900 border-purple-700 text-white">
              <DialogHeader>
                <DialogTitle>Delete Ingredient</DialogTitle>
                <DialogDescription className="text-gray-300">
                  Are you sure you want to delete &quot;{foodIngredients.name}
                  &quot;? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Information Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoSection title="Basic Information" items={basicInfo} columns={1} />

        {foodIngredients.foods && foodIngredients.foods.length > 0 && (
          <InfoSection
            title="Related Food Items"
            items={relatedFoodInfo}
            columns={1}
          />
        )}

        {foodIngredients.characters &&
          foodIngredients.characters.length > 0 && (
            <InfoSection
              title="Characters Using This Ingredient"
              items={relatedCharactersInfo}
              columns={1}
            />
          )}
      </div>

      {/* Navigation */}
      <div className="flex justify-center pt-6">
        <Link href="/dashboard/ingredients">
          <Button
            variant="outline"
            className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Ingredients
          </Button>
        </Link>
      </div>
    </div>
  );
}
