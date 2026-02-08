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
import { AdminButton } from "@/src/components/admin/shared/admin-button";
import { AdminFormCard, AdminPageHeader } from "@/src/components/admin/shared/admin-layout-components";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";
import { Switch } from "@/src/components/ui/switch";

function AddUserForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      emailVerified: false,
      twoFactorEnabled: false,
      username: "",
      displayUsername: "",
      password: "",
      confirmPassword: "",
      image: "",
      boxCC: "",
      ingameRank: "",
      role: UserRole.USER,
    },
  });

  const router = useRouter();

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    startTransition(() => {
      addUser(values)
        .then((data) => {
          if (data.error) {
            toast.error("An error has occurred", {
              description: data.error,
              className: "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white",
            });
          }

          if (data.success) {
            toast.success("User created successfully", {
              description: data.success,
              className: "bg-purple-400 border-purple-500 dark:bg-purple-700 dark:border-purple-800 text-white",
            });
            setTimeout(() => {
              router.push("/dashboard/users");
            }, 1500);
          }
        })
        .catch((err) => {
          toast.error("An unexpected error occurred", {
            description: err.message,
          });
        });
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <AdminPageHeader
        title="Add User"
        description="Create a new user account"
        backHref="/dashboard/users"
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <AdminFormCard title="Basic Information" description="Enter user's basic information">
            <div className="space-y-4">
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
                      <FormMessage />
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
                          placeholder="john@example.com"
                          disabled={isPending}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                        />
                      </FormControl>
                      <FormMessage />
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
                          placeholder="johndoe"
                          disabled={isPending}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                        />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="•••••••••"
                          disabled={isPending}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="•••••••••"
                          disabled={isPending}
                          className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Image URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="https://example.com/image.jpg (optional)"
                        disabled={isPending}
                        className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950"
                      />
                    </FormControl>
                    <FormDescription>
                      URL to user's profile image
                    </FormDescription>
                    <FormMessage />
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
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable/disable 2FA for this account
                        </FormDescription>
                      </div>
                      <FormMessage />
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
                        <FormLabel>Email Verified</FormLabel>
                        <FormDescription>
                          Mark this email as verified
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </AdminFormCard>

          <AdminFormCard title="Game Information" description="Enter user's game-specific details">
            <div className="space-y-4">
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
                        <SelectTrigger className="rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white focus-visible:ring-0 border focus:border-purple-950">
                          <SelectValue placeholder="Select role for user" />
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
                      The user's permission level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AdminFormCard>
          
          <div className="flex justify-end gap-3 items-center">
            <AdminButton
              type="button"
              variant="secondary"
              onClick={() => router.push("/dashboard/users")}
            >
              Cancel
            </AdminButton>
            <AdminButton
              type="submit"
              isLoading={isPending}
              loadingText="Creating User..."
            >
              Create User
            </AdminButton>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AddUserForm;
