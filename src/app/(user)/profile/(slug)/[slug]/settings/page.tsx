"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { settings } from "@/src/actions/settings";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
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
import { Switch } from "@/src/components/ui/switch";
import { Textarea } from "@/src/components/ui/textarea";
import { toast } from "sonner";

import { UploadButton } from "@/src/lib/uploadthing";
import { settingsSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { ArrowRight } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsPage = () => {
  const user = useCurrentUser();

  console.log("user:", user);

  if (!user) {
    redirect("/");
  }

  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [profilePicture, setProfilePicture] = useState<string | undefined>("");

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      username: user?.username || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      image: user?.image as string,
      bio: user?.bio || undefined,
      boxCC: user?.boxCC || undefined,
      ingameRank: user?.ingameRank || undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    startTransition(() => {
      values.image = profilePicture as string;
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.error("An error has occurred!", {
              description: data.error,
            });
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            toast("Success!", {
              description: data.success,
            });
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="container mx-auto  p-10 pt-[5rem] min-h-screen">
      <Card
        className={`bg-gradient-to-br from-card via-card  to-muted/20 border-border/50 shadow-xl  rounded-[5px]`}
      >
        <CardHeader>
          <CardTitle className="text-white">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          type="text"
                          disabled={isPending}
                          className={`rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white`}
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
                      <FormLabel className="dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe@example.com"
                          type="email"
                          disabled={isPending}
                          className={` rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe"
                          type="text"
                          disabled={isPending}
                          className={` rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        About You
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          maxLength={255}
                          placeholder="Tell us a little bit about yourself"
                          className={` rounded-[5px] bg-background border-border  dark:text-white dark:placeholder:text-white ring-0 resize-none`}
                        />
                      </FormControl>
                      <div className="text-right text-muted-foreground text-xs">
                        {field.value?.length || 0}/255
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          className={` rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white`}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                          className={` rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem
                      className={`  ring-0 dark:text-white dark:placeholder:text-white flex flex-row items-center justify-between   rounded-[5px] bg-background border-border p-3 shadow-md`}
                    >
                      <div className="space-y-0.5">
                        <FormLabel className="dark:text-white">
                          Two Factor Authentication
                        </FormLabel>
                        <FormDescription className="text-gray-400">
                          Enabled 2FA for your account
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <h1 className="text-2xl font-extrabold pl-0 p-6 pb-0 text-white">
                  Extra Info{" "}
                </h1>
                <FormField
                  control={form.control}
                  name="boxCC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-white">Box CC</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="100000"
                          type="text"
                          disabled={isPending}
                          className={` rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white`}
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
                      <FormLabel className="dark:text-white">
                        In Game Rank
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="110"
                          type="text"
                          disabled={isPending}
                          className={` rounded-[5px] bg-background border-border ring-0 dark:text-white dark:placeholder:text-white`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem
                      className={` ring-0 dark:text-white dark:placeholder:text-white flex flex-col items-center justify-center   rounded-[5px] bg-background border-border p-3 shadow-md`}
                    >
                      <div className="space-y-0.5 text-center">
                        <FormLabel className="dark:text-white">
                          {" "}
                          User Image
                        </FormLabel>
                        <FormDescription>
                          Change your profile picture
                        </FormDescription>
                      </div>
                      <FormControl>
                        <UploadButton
                          {...field}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setProfilePicture(res[0].url);
                            toast("Success", {
                              description:
                                "Image has been uploaded successfully",
                            });
                          }}
                          onUploadError={(err) => {
                            toast.error("An error has occurred", {
                              // Explicitly stringify, or use a specific error message property
                              description:
                                typeof err === "string"
                                  ? err
                                  : err?.message || "Unknown error",
                            });
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormError message={error} />
              <FormSuccess message={success} /> */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-[5px] bg-purple-600  hover:bg-purple-700 flex justify-end"
                >
                  Update Settings
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
