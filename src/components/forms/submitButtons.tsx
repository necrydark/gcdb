"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="w-4 h-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="text-white bg-[#5f7e9f] dark:bg-[#040D25] hover:bg-[#5f7e9f]/50 hover:dark:bg-[#040D25]/50"
        >
          {text}
        </Button>
      )}
    </>
  );
}
