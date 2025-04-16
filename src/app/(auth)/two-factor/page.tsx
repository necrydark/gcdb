"use client"

import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/src/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/src/components/ui/input-otp";
import { useToast } from "@/src/components/ui/use-toast";
import { client } from "@/src/lib/auth-client";
import { otpCodeSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardFooter } from "@nextui-org/react";
import { error } from "console";
import { AlertCircle, CheckCircle2, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form";
import { z } from "zod";


export const TwoFactorPage = () => {
    const [err, setErr] = useState<string | undefined>("");
    const [success, setSuccess] = useState<boolean | undefined>(false);
    const[isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof otpCodeSchema>>({
        resolver: zodResolver(otpCodeSchema),
        defaultValues: {
            otpCode: ""
        }
    })

    const toast = useToast();
    const router = useRouter();


    const onSubmit = (values: z.infer<typeof otpCodeSchema>) => {
        setErr("")
        setSuccess(false)


        startTransition(() => {
            client.twoFactor.verifyTotp({
                code: values.otpCode,
            }).then((res) => {
                if(res.data?.token) {
                    setSuccess(true)
                    setErr("")
                    form.reset();
                    router.push("/")
                } else {
                    setErr("Invalid Code")
                    form.reset();
                }
            })
        })
    }

    
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
            <Card className="w-[350px]">
            <CardHeader>
                <CardTitle> TOTP Verification</CardTitle>
                <CardDescription>Enter your 6-digit TOTP code to authenticate.</CardDescription>
            </CardHeader>
            <CardContent>
               {!success ? (
                 <Form {...form}>
                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                     <FormField
                     control={form.control}
                     name="otpCode"
                     render={({ field }) => (
                        <FormItem>
                            <FormLabel>TOTP Code</FormLabel>
                            <FormControl>
                                <InputOTP maxLength={6} pattern="\d{6}" required disabled={isPending} {...field}>
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
                     )}>

                     </FormField>

                     {err && (
                            	<div className="flex items-center mt-2 text-red-500">
                                <AlertCircle className="w-4 h-4 mr-2" />
                                <span className="text-sm">{err}</span>
                            </div>
                        )}

                        <Button type="submit" disabled={isPending}  className="w-full mt-4">
                            Verify
                        </Button>
                 </form>
             </Form>
               ): (
                        <div className="flex flex-col items-center justify-center space-y-2">
							<CheckCircle2 className="w-12 h-12 text-green-500" />
							<p className="text-lg font-semibold">Verification Successful</p>
						</div>
               )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground gap-2">
                <Link href="/two-factor/otp">
                    <Button variant={"link"} size={"sm"}>
                        Switch To Email Verification
                    </Button>
                </Link>
            </CardFooter>
            </Card>
        </div>
    )
}