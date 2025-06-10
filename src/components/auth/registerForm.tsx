"use client";
import { register } from "@/src/actions/register";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";
import { registerSchema, signInSchema } from "@/src/schemas/schema";

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
import { UploadButton } from "@/src/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

export const RegisterForm = () => {
  const [err, setErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      displayUsername: "",
      password: "",
      email: "",
      name: "",
      confirm_password: "",
      bio: "",
      boxCC: "",
      ingameRank: ""
    },
  });



  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setErr("");
    setSuccess("");

    if(values.boxCC && !isNaN(Number(values.boxCC))) {
      setErr("Box CC must be a number.")
    }

      if(values.ingameRank && !isNaN(Number(values.ingameRank))) {
        setErr("Ingame Rank must be a number.")

      }

    startTransition(() => {
      register(values).then((data) => {
        setErr(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                    disabled={isPending}
                    placeholder="John Doe"
                    type="text"
                    className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"

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
                    disabled={isPending}
                    placeholder="johndoe@example.com"
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <div className="grid grid-cols-2 gap-4">
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      placeholder="johndoe"
                    type="text"
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
                <FormLabel className="text-white">Display Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      placeholder="johndoe"
                    type="text"
                  />
                </FormControl>
                <FormDescription>This will be the username displayed to users.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="boxCC"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Box CC</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      disabled={isPending}
                    placeholder="1110000"
                    type="text"
                    min={1}
                    max={20000000}
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
                      className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
                      {...field}
                    disabled={isPending}
                    placeholder="110"
                    type="text"
                    min={1}
                    max={130}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
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
        <FormError message={err} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-500 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-800 transition-all duration-250 w-full">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
