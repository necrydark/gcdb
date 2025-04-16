"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/src/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/components/ui/input-otp";
import { client } from "@/src/lib/auth-client";
import { otpCodeSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { code } from "@nextui-org/react";
import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const OTPPage = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof otpCodeSchema>>({
    resolver: zodResolver(otpCodeSchema),
    defaultValues: {
      otpCode: "",
    },
  });

  const requestOTP = async () => {
    try {
      const res = await client.twoFactor.sendOtp();
      if (res?.data) {
        setMessage("OTP Sent to your email");
        setIsError(false);
        setIsOtpSent(true);
      } else {
        setMessage(res?.error.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (values: z.infer<typeof otpCodeSchema>) => {
    startTransition(() => {
      try {
        client.twoFactor.verifyOtp({ code: values.otpCode }).then((res) => {
          if (res?.data?.token) {
            setIsError(false);
            setMessage("Verified OTP");
            form.reset();
            router.push("/profile");
          } else {
            setIsError(true)
            setMessage("Invalid Code")
          }
        });
      } catch {
        console.log("error");
      }
    });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Two-Factor Auth</CardTitle>
          <CardDescription>
            Verify your account with a one-time password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {!isOtpSent ? (
              <Button onClick={requestOTP} className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Send OTP To Email
              </Button>
            ) : (
              <>
                <div className="flex flex-col space-y-1.5">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="otpCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TOTP Code</FormLabel>
                            <FormControl>
                              <InputOTP
                                maxLength={6}
                                pattern="\d{6}"
                                required
                                disabled={isPending}
                                {...field}
                              >
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
                          </FormItem>
                        )}
                      ></FormField>
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full mt-4"
                      >
                        Verify
                      </Button>
                    </form>
                  </Form>
                  {message && (
						<div
							className={`flex items-center gap-2 mt-4 ${
								isError ? "text-red-500" : "text-primary"
							}`}
						>
							{isError ? (
								<AlertCircle className="h-4 w-4" />
							) : (
								<CheckCircle2 className="h-4 w-4" />
							)}
							<p className="text-sm">{message}</p>
						</div>
					)}
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
