"use client";

import { getUserById } from "@/data/user";
import { editUser } from "@/src/actions/admin";
import { ExtendedUser } from "@/src/next-auth";
import { adminSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColour, UserRole } from "@prisma/client";
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

interface UserInterface {
  name: string;
  username: string;
  email: string;
  isTwoFactorEnabled: boolean;
  role: UserRole;
  image: string;
  banner: string;
}

function EditUserForm({
  name,
  username,
  email,
  isTwoFactorEnabled,
  role,
  image,
  banner,
}: UserInterface) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [profilePicture, setProfilePicture] = useState<string | undefined>("");
  const [profileBanners, setProfileBanners] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: name || undefined,
      email: email || undefined,
      username: username || undefined,
      isTwoFactorEnabled: isTwoFactorEnabled || undefined,
      role: role || undefined,
      image: image as string,
      banner: banner,
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof adminSchema>) => {
    startTransition(() => {
      values.image = profilePicture as string;
      values.banner = profileBanners as string;
      editUser(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast({
              title: "Error",
              description: data.error,
              variant: "destructive",
            });
          }

          if (data.success) {
            form.reset();
            setSuccess(data.success);
            toast({
              title: "Success",
              description: data.success,
              variant: "default",
            });
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="container mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
                      placeholder="John Doe"
                      disabled={isPending}
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
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel> Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enabled / Disabled 2FA for this account!
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select the role for the user!" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                      <SelectItem value={UserRole.OWNER}>Owner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
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
            />
            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reset Banner</FormLabel>
                  <FormControl>
                    <Button
                      {...field}
                      className="ml-2"
                      onClick={() =>
                        setProfileBanners(
                          "https://utfs.io/f/77555729-337d-465d-8651-c4986d7191b2-rmj2b0.png"
                        )
                      }
                    >
                      Reset Banner
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">Update User</Button>
        </form>
      </Form>
    </div>
  );
}

export default EditUserForm;
