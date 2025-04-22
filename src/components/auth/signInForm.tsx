"use client";
import { login } from "@/src/actions/login";
import { FormError } from "@/src/components/auth/form-error";
import { FormSuccess } from "@/src/components/auth/form-success";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { signInSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [err, setErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setErr("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then((data: any) => {
          if (data?.error) {
            form.reset();
            setErr(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setErr("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Two Factor Code
                    </FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} disabled={isPending} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {!showTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="johndoe@example.com"
                        type="email"
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
                    <FormLabel className="text-white">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <Button
                      size={"sm"}
                      variant={"link"}
                      asChild
                      className="px-0 font-normal"
                    >
                      <Link href={"/auth/reset"}>Forgot Password?</Link>
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <FormError message={err} />
        <FormSuccess message={success} />
        <Button type="submit" disabled={isPending} className="w-full">
          {showTwoFactor ? "Verify" : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;