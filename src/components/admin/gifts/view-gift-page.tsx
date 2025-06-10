"use client";
import { Character, Gift } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardCopy,
  Edit,
  Eye,
  EyeClosed,
  Loader2,
  Trash,
} from "lucide-react";
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

interface GiftInterface {
  gift?: Gift;
  giftCharacters?: Gift & {
    characters?: Character[];
  };
}

export default function ViewGiftPage({ gift, giftCharacters }: GiftInterface) {
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);

      toast({
        title: "Gift deleted",
        description: "The gift has been successfully deleted.",
      });

      router.push("/dashboard/gifts");
    }, 1500);
  };

  const length = giftCharacters?.characters?.length;

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
            <Link href={"/dashboard/materials"}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl text-white font-bold tracking-tight">
              {giftCharacters?.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>ID: {giftCharacters?.id.substring(0, 8)}...</span>
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
                <DialogTitle className="text-white">Delete Gift</DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this gift? This action cannot
                  be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-white">
                  You are about to delete the gift
                  <strong>{giftCharacters?.name}</strong> with ID{" "}
                  <strong>{giftCharacters?.id.substring(0, 8)}...</strong>
                </p>
                {giftCharacters?.characters &&
                  giftCharacters.characters.length > 0 && (
                    <p className="mr-2 text-destructive">
                      Warning: This gift is equipped by {length} character(s).
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
                    "Delete Gift"
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
            <Link href={`/dashboard/gifts/edit/${giftCharacters?.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Gift
            </Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Material Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-md overflow-hidden mb-4">
                <Image
                  src={giftCharacters?.imageUrl || ""}
                  alt={giftCharacters?.name || "Material"}
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Name</span>
                <span>{giftCharacters?.name}</span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">ID</span>
                <span>{giftCharacters?.id}</span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Image URL</span>
                <span className="flex flex-row gap-2 items-center">
                  {giftCharacters?.imageUrl.substring(0, 20)}
                  <Button
                    className="inline-flex dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        giftCharacters?.imageUrl as string
                      );
                      toast({
                        title: "Copied to clipboard."
                      })
                    }}
                  >
                    <ClipboardCopy className="h-4 w-4 text-white" />
                  </Button>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        {giftCharacters?.characters &&
        giftCharacters?.characters?.length > 0 ? (
          <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800">
            <CardHeader className="pb-2">
              <CardTitle>Equipped Characters</CardTitle>
              <CardDescription>
                This gift is used in {length} characters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {giftCharacters?.characters?.map((char) => (
                  <div
                    key={char.id}
                    className="flex items-center gap-4 border rounded-[5px] border-purple-400 dark:border-purple-700 p-3"
                  >
                    <div className="rounded-md overflow-hidden">
                      <Image
                        src={char.imageUrl}
                        alt={char.name as string}
                        width={50}
                        height={50}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Link
                        href={`/dashboard/characters/view/${char.id}`}
                        className="font-medium hover:underline"
                      >
                        {char.name}
                      </Link>
                      <p className="text-sm dark:text-gray-300 text-gray-500">
                        ID: {char.id.substring(0, 8)}...
                      </p>
                    </div>
                    <Button
                      className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all rounded-[5px] duration-250"
                      variant={"outline"}
                      size={"sm"}
                      asChild
                    >
                      <Link href={`/dashboard/characters/view/${char.id}`}>
                        View
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800">
            <CardHeader>
              <CardTitle>No characters have this equipped.</CardTitle>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
}
