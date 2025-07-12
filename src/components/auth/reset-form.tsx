"use client";
import { reset } from "@/src/actions/reset";
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
import { resetSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const ResetForm = () => {
  const [err, setErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    setErr("");
    setSuccess("");
    startTransition(() => {
      reset(values).then((data) => {
        setErr(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6  container mx-auto pt-10 max-w-[500px]">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="johndoe@example.com"
                    type="email"
                    className="border-purple-900 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0"
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
          {isPending ? (
            <>
              <Loader2 className="animate-spin pr-2 h-4 w-4" />
              Reset Password
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
