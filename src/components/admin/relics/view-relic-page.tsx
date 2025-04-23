"use client";

import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
import { useState } from "react";
import { Beast, Character, HolyRelic, Material } from "@prisma/client";
import { Button } from "../../ui/button";
import Link from "next/link";
import { ArrowLeft, Edit, Loader2, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Image from "next/image";
import { Separator } from "../../ui/separator";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface RelicInterface {
  characters?: Character[] | null;
  materials?: Material[] | null;
  relic: HolyRelic;
  relicMaterials?: HolyRelic & {
    materials: Material[];
    characters: Character[];
  };
}

export default function ViewRelicPage({
  characters,
  materials,
  relic,
  relicMaterials,
}: RelicInterface) {
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
        title: "Holy relic deleted",
        description: "The holy relic has been successfully deleted.",
      });

      router.push("/dashboard/relics");
    }, 1500);
  };

  // 関連するキャラクターを表示するためのテーブルコンポーネント
  // if (!relicMaterials?.characters || relicMaterials.characters.length === 0) {
  //   return (
  //     <div className="bg-purple-400 dark:bg-purple-700 rounded-md p-4 text-white text-center">
  //       There are no characters with this relic.
  //     </div>
  //   );
  // }

  const length = relicMaterials?.characters.length;

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
            <Link href={"/dashboard/relics"}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl text-white font-bold tracking-tight">
              {relic.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>ID: {relic.id.substring(0, 8)}...</span>
              <span>•</span>
              <span>Beast: {relic.beast}</span>
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
                  Delete Holy Relic
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this holy relic? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-white">
                  You are about to delete the holy relic{" "}
                  <strong>{relic.name}</strong> with ID{" "}
                  <strong>{relic.id.substring(0, 8)}...</strong>
                </p>
                {relicMaterials?.characters && relicMaterials.characters.length > 0 && (
                  <p className="mr-2 text-destructive">
                    Warning: This holy relic is equipped by {length}{" "}
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
                    "Delete Holy Relic"
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
            <Link href={`/dashboard/relics/edit/${relic.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Holy Relic
            </Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="characters">Characters</TabsTrigger>
        </TabsList>
        {/* Details View */}
        <TabsContent value="details" className="space-y-4 pt-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-purple-500 dark:bg-purple-900 rounded-[5px] border-purple-300 dark:border-purple-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Holy Relic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <div className="rounded-md overflow-hidden mb-4">
                    <Image
                      src={relic.imageUrl || "/placeholder.svg"}
                      alt={relic.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Name</span>
                    <span>{relic.name}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">ID</span>
                    <span>{relic.id}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Beast</span>
                    <Badge variant={"purple"}>{relic.beast}</Badge>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Effect</span>
                    <span className="text-right max-w-[250px]">
                      {relic.effect}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Attack</span>
                    <span className="font-semibold">{relic.attack}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Defense</span>
                    <span className="font-semibold">{relic.defense}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">HP</span>
                    <span className="font-semibold">{relic.hp}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Total Stats</span>
                    <span className="font-semibold">
                      {Number.parseInt(relic.attack) +
                        Number.parseInt(relic.defense) +
                        Number.parseInt(relic.hp)}
                    </span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* Materials View */}
        <TabsContent value="materials" className="space-y-4 pt-4">
          <Card className="bg-purple-500 rounded-[5px] dark:bg-purple-900 border-purple-300 dark:border-purple-800">
            <CardHeader>
              <CardTitle> Required Materials</CardTitle>
              <CardDescription>
                Materials needed to craft this relic.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relicMaterials?.materials?.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center gap-4 rounded-[5px] border p-3"
                  >
                    <div className="rounded-md overflow-hidden">
                      <Image
                        src={material.imageUrl}
                        alt={material.name}
                        className="h-full w-full object-cover"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className="flex-1">
                      <Link href={`/dashboard/materials/view/${material.id}`}>
                        {material.name}
                      </Link>
                      <p className="text-sm">
                        ID: {material.id.substring(0, 8)}...
                      </p>
                    </div>
                    <Button
                      variant={"outline"}
                      className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all rounded-[5px] duration-250"
                      size={"sm"}
                      asChild
                    >
                      <Link href={`/dashboard/materials/view/${material.id}`}>
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
                Characters that can use this holy relic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {relicMaterials?.characters.map((character) => (
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

{
  /* <Button variant={"outline"}             className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all rounded-[5px] duration-250"
 size={"sm"} asChild></Button> */
}
