"use client";

import { addUser } from "@/src/actions/add-user";
import { Button } from "@/src/components/ui/button";
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
import { addNewUserSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileColour, UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";

const AddUserForm = () => {
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof addNewUserSchema>>({
    resolver: zodResolver(addNewUserSchema),
    defaultValues: {
      name: undefined,
      email: undefined,
      username: undefined,
      password: undefined,
      twoFactorEnabled: false,
      emailVerified: false,
      image: `https://avatar.vercel.sh/necrydark`,
      role: UserRole.USER,
      profileColour: ProfileColour.PURPLE,
      bio: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = (values: z.infer<typeof addNewUserSchema>) => {
    startTransition(() => {
      addUser(values)
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
            form.reset();
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

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl leading-tight font-extrabold pb-5">Add User</h1>
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
              name="twoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel> Two Factor Authentication</FormLabel>
                    <FormDescription>
                      Enable 2FA for your account
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
              name="emailVerified"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel> Email Verified</FormLabel>
                    <FormDescription>
                      Toggle whether the users email is verified.
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
                        <SelectValue placeholder="Select a role for the user!" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.USER}>User</SelectItem>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.COOWNER}>Co-Owner</SelectItem>
                      <SelectItem value={UserRole.OWNER}>Owner</SelectItem>

                    </SelectContent>
                  </Select>
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select a colour for your profile!" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={ProfileColour.RED}>Red</SelectItem>
                      <SelectItem value={ProfileColour.BLUE}>Blue</SelectItem>
                      <SelectItem value={ProfileColour.GREEN}>Green</SelectItem>
                      <SelectItem value={ProfileColour.YELLOW}>
                        Yellow
                      </SelectItem>
                      <SelectItem value={ProfileColour.PURPLE}>
                        Purple
                      </SelectItem>
                      <SelectItem value={ProfileColour.ORANGE}>
                        Orange
                      </SelectItem>
                      <SelectItem value={ProfileColour.PINK}>Pink</SelectItem>
                      <SelectItem value={ProfileColour.CYAN}>Cyan</SelectItem>
                    </SelectContent>
                  </Select>
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
                    className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 resize-none focus-visible:ring-0"

                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          {/* <FormError message={error} />
              <FormSuccess message={success} /> */}
          <Button type="submit">Add User</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddUserForm;
