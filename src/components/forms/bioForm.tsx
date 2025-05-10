"use client";
import { updateBio } from "@/src/actions/updateBio";
import Link from "next/link";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { SubmitButton } from "./submitButtons";

const initialState = {
  message: "",
  status: "",
};

function BioForm({ bio }: { bio: string | null | undefined }) {
  const [state, formAction] = useFormState(updateBio, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.status === "green") {
      toast({
        title: "Success",
        description: state?.message,
        duration: 5000,
        variant: 'purple'
      });
    } else if (state?.status === "error") {
      toast({
        title: "Error",
        description: state?.message,
        variant: "purple",
        duration: 5000,
      });
    }
  }, [state, toast]);

  return (
    <form action={formAction} className="mt-6">
      <Label className="text-lg">Bio</Label>
      <p className="text-muted-foreground text-sm">You can change your bio.</p>
      <Textarea
        defaultValue={bio ?? undefined}
        placeholder="Type your bio here."
        id="message-2"
        name="bio"
        required
        className="mt-2 resize-none h-64"
        minLength={10}
        maxLength={255}
      />
      <div className="w-full flex gap-x-3 justify-end mt-5">
        <Button variant="destructive" asChild type="button">
          <Link href={"/"}>Cancel</Link>
        </Button>
        <SubmitButton text="Update Bio" />
      </div>
    </form>
  );
}

export default BioForm;
