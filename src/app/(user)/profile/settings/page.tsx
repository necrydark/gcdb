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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import { Textarea } from "@/src/components/ui/textarea";
import { useToast } from "@/src/components/ui/use-toast";
import { UploadButton } from "@/src/lib/uploadthing";
import { settingsSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColour, UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsPage = () => {
  const user = useCurrentUser();

  if(!user) {
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
      profileColour: user?.profileColor || undefined,
      boxCC: user?.boxCC || undefined,
      ingameRank: user?.ingameRank || undefined,
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    startTransition(() => {
      values.image = profilePicture as string;
      settings(values)
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
            update();
            setSuccess(data.success);
            toast({
              title: "Success!",
              description: data.success,
              variant: "purple",
            });
          }
        })
        .catch((err) => setError(err));
    });
  };

  const colour = user?.profileColor.toLocaleLowerCase();
  const stringedColour = colour.toString();

  return (
    <div className="container mx-auto  p-10 pt-[3rem]">
      <Card className={`dark:bg-${colour}-950 bg-${colour}-800 border-0 rounded-[5px] shadow-md dark:shadow-${colour}-300` }>
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
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          type="text"
                          disabled={isPending}
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white`}
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
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe@example.com"
                          type="email"
                          disabled={isPending}
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white`}

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
                      <FormLabel className="text-white">Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="johndoe"
                          type="text"
                          disabled={isPending}
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white`}

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
                      <FormLabel className="text-white">About You</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          maxLength={255}
                          placeholder="Tell us a little bit about yourself"
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white resize-none`}
                        />
                      </FormControl>
                      <div className="text-right text-white">
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
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white`}
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
                      <FormLabel className="text-white">New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="******"
                          type="password"
                          disabled={isPending}
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white`}

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
                   className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white flex flex-row items-center justify-between rounded-lg  p-3 shadow-md`}
                    
                    >
                      <div className="space-y-0.5">
                        <FormLabel className="text-white"> Two Factor Authentication</FormLabel>
                        <FormDescription className="text-gray-400">
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
                <h1 className="text-2xl font-extrabold pl-0 p-6 text-white">Extra Info </h1>
                <FormField
                  control={form.control}
                  name="boxCC"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Box CC</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="100000"
                          type="text"
                          disabled={isPending}
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white`}

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
                      <FormLabel className="text-white">In Game Rank</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="110"
                          type="text"
                          disabled={isPending}
                          className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white`}

                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
             
                <FormField
                  control={form.control}
                  name="profileColour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Profile Colour</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger 
                          className={`dark:bg-${colour}-800 !bg-${colour}-800 border-${colour}-500 dark:border-${colour}-600 ring-0 border-0 dark:text-white dark:placeholder:text-white`}

                          >
                            <SelectValue placeholder="Select a colour for your profile!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent 
                        
                          className={`dark:bg-${stringedColour}-800 bg-${stringedColour}-300  border-0 ring-0 text-white placeholder:text-white transition-all duration-300 rounded-[5px]`}
                        >
                          <SelectItem
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600`}
                          value={ProfileColour.RED}>Red</SelectItem>
                          <SelectItem 
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600`}
                          value={ProfileColour.BLUE}>
                            Blue
                          </SelectItem>
                          <SelectItem 
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600`}
                          value={ProfileColour.GREEN}>
                            Green
                          </SelectItem>
                          <SelectItem 
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600`}
                          value={ProfileColour.YELLOW}>
                            Yellow
                          </SelectItem>
                          <SelectItem 
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600`}
                          value={ProfileColour.PURPLE}>
                            Purple
                          </SelectItem>
                          <SelectItem 
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600`}
                          value={ProfileColour.ORANGE}>
                            Orange
                          </SelectItem>
                          <SelectItem 
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600`}
                          value={ProfileColour.PINK}>
                            Pink
                          </SelectItem>
                          <SelectItem 
                          className={`dark:hover:bg-${stringedColour}-950 hover:bg-${stringedColour}-600 dark:focus:bg-${stringedColour}-950 focus:bg-${stringedColour}-600 `} 
                          value={ProfileColour.CYAN}>
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

                    <FormItem 
                   className={`dark:bg-${colour}-800 bg-${colour}-950 border-0 ring-0 dark:text-white dark:placeholder:text-white flex flex-col items-center justify-center gap-4 rounded-lg  p-3 shadow-sm`}
                    
                    >
                      <div className="space-y-0.5 text-center">
                        <FormLabel className="text-white"> User Image</FormLabel>
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
                            toast({
                              title: "Upload Complete",
                              description: "Image Uploaded!",
                            });
                          }}
                          onUploadError={(err) => {
                            toast({
                              title: "Upload Error",
                              description: `${err.message}`,
                              variant: "purple",
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
             <div className="flex justify-end">
             <Button      variant={
                      colour as
                        | "red"
                        | "green"
                        | "blue"
                        | "yellow"
                        | "orange"
                        | "pink"
                        | "cyan"
                        | "purple"
                        | null
                        | undefined
                    } type="submit" className="rounded-[5px] flex justify-end">Update Settings</Button>
             </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
