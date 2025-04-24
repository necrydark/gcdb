"use client";

import { ExtendedUser } from "@/src/next-auth";
import {
  Account,
  Character,
  Comments,
  Favourite,
  ProfileColour,
  TwoFactorConfirmation,
  User,
} from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "../../ui/use-toast";
import { use, useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { ArrowLeft, Edit, Loader2, Trash } from "lucide-react";
import { Badge } from "../../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import relic from "../../relics/relic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { getColourClasses } from "@/src/utils/colourClasses";
import { Separator } from "../../ui/separator";

interface UserInterface {
  user: User & {
    Favourite: Favourite[];
    Comments: Comments[];
  };
}

export default function ViewUserPage({ user }: UserInterface) {
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

      router.push("/dashboard/users");
    }, 1500);
  };

  const dateFormat = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
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
            <Link href={"/dashboard/users"}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl text-white font-bold tracking-tight">
              {user.username}
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>ID: {user.id.substring(0, 8)}...</span>
              <span>•</span>
              <Badge variant={"purple"}>{user.role}</Badge>
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
                  You are about to delete the user <strong>{user.name}</strong>{" "}
                  with ID <strong>{user.id.substring(0, 8)}...</strong>
                </p>
                {user.Comments.length > 0 && (
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
                    "Delete User"
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
            <Link href={`/dashboard/users/edit/${user.id}`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit User
            </Link>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="favourites">Favourites</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>
        <TabsContent className="space-y-4 pt-4" value="profile">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800 rounded-[5px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback className="text-2xl">
                        {user.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white ${getColourClasses(
                        user.profileColour
                      )}`}
                    ></div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Name</span>
                    <span>{user.name}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Username</span>
                    <span>{user.username}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Email</span>
                    <span>{user.email}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Email Verified</span>
                    <span>{user.emailVerified ? "Yes" : "No"}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">
                      Two-Factor Enabled?
                    </span>
                    <span>{user.isTwoFactorEnabled ? "Yes" : "No"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 rounded-[5px] dark:border-purple-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Game Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Role</span>
                    <Badge variant="purple">{user.role}</Badge>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Box CC</span>
                    <span>{user.boxCC || "Not set"}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">In-game Rank</span>
                    <span>{user.ingameRank || "Not set"}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Profile Colour</span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-4 w-4 rounded-full ${getColourClasses(
                          user.profileColour
                        )}`}
                      ></div>
                      <span>{user.profileColour}</span>
                    </div>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Comments</span>
                    <span>{user.Comments.length}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Favourites</span>
                    <span>{user.Favourite.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-purple-500  dark:bg-purple-900 border-purple-300 dark:border-purple-800 rounded-[5px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Account Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Created At</span>
                    <span>{dateFormat(user.createdAt.toISOString())}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">Last Updated</span>
                    <span>{dateFormat(user.updatedAt.toISOString())}</span>
                  </div>
                  <Separator className="bg-purple-500 dark:bg-purple-800" />
                  <div className="flex items-center justify-between py-1">
                    <span className="text-sm font-medium">ID</span>
                    <span>{user.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent className="space-y-4" value="favourites">
          <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800 rounded-[5px]">
            <CardContent className="flex justify-center items-center !pt-6">
              Coming soon...
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="space-y-4" value="comments">
          <Card className="bg-purple-500 dark:bg-purple-900 border-purple-300 dark:border-purple-800 rounded-[5px]">
            <CardContent className="flex justify-center items-center !pt-6">
              Coming soon...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
