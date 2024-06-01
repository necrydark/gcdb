"use client";

import { updateUsername } from "@/src/actions/updateUsername";
import { Separator } from "@/src/components/ui/separator";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";
import { SubmitButton } from "./submitButtons";

const initialState = {
  message: "",
  status: "",
};

export function SettingsForm({
  username,
}: {
  username: string | null | undefined;
}) {
  const [state, formAction] = useFormState(updateUsername, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Success",
        description: state?.message,
        duration: 5000,
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state?.message,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [state, toast]);
  return (
    <form action={formAction}>
      <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
      <Separator className="my-4" />
      <Label className="text-lg">Username</Label>
      <p className="text-muted-foreground text-sm">
        You can change your username.
      </p>

      <Input
        defaultValue={username ?? undefined}
        name="username"
        required
        className="mt-2"
        minLength={3}
        maxLength={21}
      />
      {state?.status === "error" && (
        <p className="text-red-500 mt-2">{state.message}</p>
      )}
      <div className="w-full flex gap-x-3 justify-end mt-5">
        <Button variant="destructive" asChild type="button">
          <Link href={"/"}>Cancel</Link>
        </Button>
        <SubmitButton text="Change Username" />
      </div>
    </form>
  );
}
