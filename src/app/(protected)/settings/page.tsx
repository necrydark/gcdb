"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { settings } from "@/src/actions/settings";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import { useToast } from "@/src/components/ui/use-toast";
import { UploadButton } from "@/src/lib/uploadthing";
import { settingsSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColour, UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsPage = () => {
  const user = useCurrentUser();

  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [image, setImage] = useState<string[] | undefined>();

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
      image: user?.image || undefined,
      banner: user?.banner || undefined,
      profileColour: user?.profileColor || undefined,
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    startTransition(() => {
      values.image = image?.[0] ?? undefined;
      settings(values)
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
            update();
            setSuccess(data.success);
            toast({
              title: "Success!",
              description: data.success,
              variant: "default",
            });
          }
        })
        .catch((err) => setError(err));
    });
  };

  return (
    <div className="container mx-auto p-10">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
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
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          type="text"
                          disabled={isPending}
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
                          placeholder="johndoe@example.com"
                          type="email"
                          disabled={isPending}
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
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe"
                          type="text"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
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
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
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
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel> Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enabled 2FA for your account
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select a colour for your profile!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={ProfileColour.RED}>Red</SelectItem>
                          <SelectItem value={ProfileColour.BLUE}>
                            Blue
                          </SelectItem>
                          <SelectItem value={ProfileColour.GREEN}>
                            Green
                          </SelectItem>
                          <SelectItem value={ProfileColour.YELLOW}>
                            Yellow
                          </SelectItem>
                          <SelectItem value={ProfileColour.PURPLE}>
                            Purple
                          </SelectItem>
                          <SelectItem value={ProfileColour.ORANGE}>
                            Orange
                          </SelectItem>
                          <SelectItem value={ProfileColour.PINK}>
                            Pink
                          </SelectItem>
                          <SelectItem value={ProfileColour.CYAN}>
                            Cyan
                          </SelectItem>
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
                    <FormItem className="flex flex-col items-center justify-center gap-4 rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5 text-center">
                        <FormLabel> User Image</FormLabel>
                        <FormDescription>
                          Change your profile picture
                        </FormDescription>
                      </div>
                      <FormControl>
                        <UploadButton
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            setImage(res.map((image) => image.url));
                            toast({
                              title: "Upload Complete",
                              description: "Image Uploaded!",
                            });
                          }}
                          onUploadError={(err) => {
                            toast({
                              title: "Upload Error",
                              description: `${err.message}`,
                              variant: "destructive",
                              duration: 5000,
                            });
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center justify-center gap-4 rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5 text-center">
                        <FormLabel> Banner Image</FormLabel>
                        <FormDescription>Change your banner</FormDescription>
                      </div>
                      <FormControl>
                        <UploadButton
                          endpoint="bannerUpload"
                          onClientUploadComplete={(res) => {
                            setImage(res.map((image) => image.url));
                            toast({
                              title: "Upload Complete",
                              description: "Image Uploaded!",
                            });
                          }}
                          onUploadError={(err) => {
                            toast({
                              title: "Upload Error",
                              description: `${err.message}`,
                              variant: "destructive",
                              duration: 5000,
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
              <Button type="submit">Update Settings</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;