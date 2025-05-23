"use client";

import { getUserById } from "@/data/user";
import { editUser } from "@/src/actions/user";
import { ExtendedUser } from "@/src/next-auth";
import { userSchema } from "@/src/schemas/admin/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColour, User, UserRole } from "@prisma/client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Switch } from "../../ui/switch";
import { useToast } from "../../ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface UserInterface {
  user: User
}

function EditUserForm({
 user
}: UserInterface) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [profilePicture, setProfilePicture] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      emailVerified: user.emailVerified || undefined,
      twoFactorEnabled: user.isTwoFactorEnabled || undefined,
      username: user.username || undefined,
      displayUsername: user.displayUsername || undefined,
      image: user.image as string,
      boxCC: user.boxCC || undefined,
      ingameRank: user.ingameRank || undefined,
      role: user.role || undefined,
      profileColour: user.profileColour || "CYAN"
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    startTransition(() => {
      editUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "purple",
            });
          }

          if (data.success) {
            form.reset();
            setSuccess(data.success);
            toast({
              title: "Success",
              description: data.success,
              variant: "purple",
            });
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      
      <div>
        <div className="flex justify-between flex-row items-center pb-5 gap-5">
          <div className="flex gap-2 items-center">
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

            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
                Edit User
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                Update info for {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="container mx-auto p-10 bg-purple-400 rounded-[5px] dark:bg-purple-700 border-0">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit {user.username}&apos;s basic information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="John Doe"
                          disabled={isPending}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="John Doe"
                          disabled={isPending}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                          placeholder="John Doe"
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayUsername"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="John Doe"
                          disabled={isPending}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                        />
                      </FormControl>
                      <FormDescription>
                        This is the name shown to other users
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter profile image URL (optional)"
                        disabled={isPending}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

                      />
                    </FormControl>
                    <FormDescription>
                      URL to the user&apos;s profile image
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="twoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 border-purple-700 dark:border-purple-950 space-y-0 rounded-[5px] border p-4">
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-purple-700 data-[state=unchecked]:bg-purple-600 dark:data-[state=checked]:bg-purple-950 dark:data-[state=unchecked]:bg-purple-800  rounded-[5px]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel> Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enabled / Disabled 2FA for this account!
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emailVerified"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-[5px] border border-purple-700 dark:border-purple-950 p-4">
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-purple-700 rounded-[5px] data-[state=unchecked]:bg-purple-600 dark:data-[state=checked]:bg-purple-950 dark:data-[state=unchecked]:bg-purple-800 "

                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel> Email Verified</FormLabel>
                        <FormDescription>
                          Enabled / Disabled 2FA for this account!
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Image</FormLabel>
                  <FormControl>
                    <Button
                    className="ml-2"
                      {...field}
                      onClick={() =>
                        setProfilePicture(
                          "https://utfs.io/f/0cb4aa39-afe3-4154-b278-4ec44717ad17-vgqkrm.jpg"
                        )
                      }
                    >
                      Reset Image
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            </CardContent>
          </Card>

          <Card className="container mx-auto p-10 rounded-[5px] bg-purple-400 dark:bg-purple-700 border-0">
            <CardHeader>
              <CardTitle>Game Information</CardTitle>
              <CardDescription>
                Edit {user.username}&apos;s game information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                    control={form.control}
                    name="boxCC"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Box CC</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter box CC (optional)"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                          
                          {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                        <FormField
                    control={form.control}
                    name="ingameRank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>In-game Rank</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter in-game rank (optional)"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                          
                          {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                      className="border-purple-900 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 "
                      >
                            <SelectValue placeholder="Select the role for the user!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-purple-600  text-white dark:bg-purple-800">
                        <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={UserRole.USER}>User</SelectItem>
                          
                          <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={UserRole.ADMIN}>Admin</SelectItem>
                 
                          <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                          
                          value={UserRole.OWNER}>Owner</SelectItem>
                        </SelectContent>
                      </Select>
                  <FormDescription>The user&apos;s permission level</FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
              control={form.control}
              name="profileColour"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Colour</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger 
                      className="border-purple-900 bg-purple-600 border-[2px] rounded-[5px]  text-white dark:bg-purple-800  focus:border-purple-900 "
                      >
                        <SelectValue placeholder="Select a colour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent 
                     className="bg-purple-600  text-white dark:bg-purple-800">
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      
                      value={ProfileColour.RED}>Red</SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      value={ProfileColour.BLUE}>Blue</SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      value={ProfileColour.GREEN}>Green</SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      value={ProfileColour.YELLOW}>
                        Yellow
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      
                      value={ProfileColour.PURPLE}>
                        Purple
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      value={ProfileColour.ORANGE}>
                        Orange
                      </SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      value={ProfileColour.PINK}>Pink</SelectItem>
                      <SelectItem 
                      className="hover:bg-purple-400 rounded-[5px] dark:hover:bg-purple-950"
                      value={ProfileColour.CYAN}>Cyan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The user&apos;s profile accent colour</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
              </div>
            </CardContent>
          </Card>
         <div className="flex justify-end gap-3 items-center">
         
         <Button type="button"                   className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >
                <Link href={"/dashboard/users"}>Cancel</Link>
              </Button>
              <Button type="submit"                   className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
              >Save Changes</Button>
         </div>
        </form>
      </Form>
    </div>
  );
}

export default EditUserForm;
