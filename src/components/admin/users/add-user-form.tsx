"use client";

import { addUser } from "@/src/actions/user";
import { userSchema } from "@/src/schemas/admin/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
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
import { Separator } from "../../ui/separator";
import { Switch } from "../../ui/switch";

interface UserInterface {}

function AddUserForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      emailVerified: undefined,
      twoFactorEnabled: undefined,
      username: undefined,
      displayUsername: undefined,
      password: undefined,
      confirmPassword: undefined,
      image: undefined,
      boxCC: undefined,
      ingameRank: undefined,
      role: UserRole.USER,
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    startTransition(() => {
      addUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.error("An error has occured", {
              description: data.error,
              className:
                "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white",
            });
          }

          if (data.success) {
            setSuccess(data.success);
            toast.success("Form submitted", {
              description: data.success,
              className:
                "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white",
            });
            setTimeout(() => {
              router.push("/dashboard/users");
            }, 1500);
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
              size="icon"
              variant="gradient"
              className=" border-[2px]  hover:text-white  transition-all duration-250"
              asChild
            >
              <Link href={"/dashboard/users"}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>

            <div className="flex flex-col">
              <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
                Add User
              </h1>
              <p className="text-gray-500 dark:text-gray-300">
                Create a new user account.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="container mx-auto p-10 bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px]">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Edit user&apos;s basic information.
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
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                        />
                      </FormControl>
                      <FormDescription>
                        This is the name shown to other users
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                          placeholder="*********"
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="*******"
                          disabled={isPending}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
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
                        className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                      />
                    </FormControl>
                    <FormDescription>
                      URL to the user&apos;s profile image
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Separator className="w-full bg-white" />

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

          <Card className="container mx-auto p-10 bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px]">
            <CardHeader>
              <CardTitle>Game Information</CardTitle>
              <CardDescription>
                Edit user&apos;s game information.
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
                        <Input
                          placeholder="Enter box CC (optional)"
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                          {...field}
                        />
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
                        <Input
                          placeholder="Enter in-game rank (optional)"
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                          {...field}
                        />
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
                          <SelectTrigger className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950 ">
                            <SelectValue placeholder="Select the role for the user!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border rounded-[5px] text-white">
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={UserRole.USER}
                          >
                            User
                          </SelectItem>

                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={UserRole.ADMIN}
                          >
                            Admin
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={UserRole.COOWNER}
                          >
                            Co-Owner
                          </SelectItem>
                          <SelectItem
                            className="focus:bg-gradient-to-r focus:from-purple-700 focus:to-blue-700 rounded-[5px]"
                            value={UserRole.OWNER}
                          >
                            Owner
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The user&apos;s permission level
                      </FormDescription>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end gap-3 items-center">
            <Button
              type="button"
              variant={"gradient"}
              className="text-white rounded-[5px]  border-[2px] flex flex-row items-center  hover:text-white  transition-all duration-250"
            >
              <Link href={"/dashboard/users"}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              variant={"gradient"}
              className="text-white rounded-[5px]  border-[2px] flex flex-row items-center  hover:text-white  transition-all duration-250"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddUserForm;
