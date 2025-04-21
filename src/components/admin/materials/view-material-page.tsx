"use client";
import { HolyRelic, Material } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
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
import { Badge } from "../../ui/badge";

interface MaterialsInterface {
  relicMaterials?: Material & {
    holyRelics: HolyRelic[];
  };
}

export default function ViewMaterialPage({
  relicMaterials,
}: MaterialsInterface) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isShowFull, setIsShowFull] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);

      toast({
        title: "Material deleted",
        description: "The material has been successfully deleted.",
      });

      router.push("/dashboard/materials");
    }, 1500);
  };

  const showFull = () => {
    setIsShowFull(!isShowFull);
  };

  const locations = relicMaterials?.location?.split(" | ");
  console.log(locations);

  const length = relicMaterials?.holyRelics.length;

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
              {relicMaterials?.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>ID: {relicMaterials?.id.substring(0, 8)}...</span>
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
                  Delete Material
                </DialogTitle>
                <DialogDescription className="text-gray-500 dark:text-gray-300">
                  Are you sure you want to delete this material? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-white">
                  You are about to delete the material w
                  <strong>{relicMaterials?.name}</strong> with ID{" "}
                  <strong>{relicMaterials?.id.substring(0, 8)}...</strong>
                </p>
                {relicMaterials?.holyRelics &&
                  relicMaterials.holyRelics.length > 0 && (
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
                    "Delete Material"
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
            <Link href={`/dashboard/materials/edit/${relicMaterials?.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Material
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
                  src={relicMaterials?.imageUrl || ""}
                  alt={relicMaterials?.name || "Material"}
                  width={50}
                  height={50}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Name</span>
                <span>{relicMaterials?.name}</span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">ID</span>
                <span>{relicMaterials?.id}</span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Image URL</span>
                <span className="flex flex-row gap-2 items-center">
                  {!isShowFull
                    ? relicMaterials?.imageUrl.substring(0, 20)
                    : relicMaterials?.imageUrl}
                  <Button
                    className="inline-flex dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all duration-250"
                    onClick={showFull}
                  >
                    {!isShowFull ? (
                      <Eye className="h-4 w-4 text-white" />
                    ) : (
                      <EyeClosed className="h-4 w-4 text-white" />
                    )}
                  </Button>
                </span>
              </div>
              <Separator className="bg-purple-500 dark:bg-purple-800" />
              <div className="flex items-center justify-between py-1">
                <span className="text-sm font-medium">Locations</span>
                <div className="flex flex-row gap-1">
                  {locations?.map((location) => (
                    <Badge variant={"purple"} key={location}>
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800">
          <CardHeader className="pb-2">
            <CardTitle>Used In Holy Relics</CardTitle>
            <CardDescription>
              This material is used in {length} holy relics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relicMaterials?.holyRelics.map((relic) => (
                <div
                  key={relic.id}
                  className="flex items-center gap-4 border rounded-[5px] border-purple-400 dark:border-purple-700 p-3"
                >
                  <div className="rounded-md overflow-hidden">
                    <Image
                      src={relic.imageUrl}
                      alt={relic.name}
                      width={50}
                      height={50}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/dashboard/relics/view/${relic.id}`}
                      className="font-medium hover:underline"
                    >
                      {relic.name}
                    </Link>
                    <p className="text-sm dark:text-gray-300 text-gray-500">
                      ID: {relic.id.substring(0, 8)}...
                    </p>
               
                  </div>
                  <Button
                      className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px]  hover:text-white dark:bg-purple-700 transition-all rounded-[5px] duration-250"
                      variant={"outline"}
                      size={"sm"}
                      asChild
                    >
                      <Link href={`/dashboard/relics/view/${relic.id}`}>
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
