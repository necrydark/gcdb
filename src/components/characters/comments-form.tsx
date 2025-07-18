"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addComment } from "@/src/actions/comments";
import { commentSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";

type Props = {
  characterId: string;
  slug: string;
};

function CommentsForm({ characterId, slug }: Props) {
  const user = useCurrentUser();
  const [err, setErr] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      characterId: characterId,
      comment: "",
    },
  });



  const onSubmit = (values: z.infer<typeof commentSchema>) => {
    setErr("");
    setSuccess("");
    startTransition(() => {


      addComment(values, slug).then((data) => {
        if (data?.error) {
          toast({
            title: "Error",
            variant: "destructive",
            description: data?.error,
            duration: 5000,
          });
        }
        if (data?.success) {
          toast({
            title: "Success",
            variant: "purple",
            description: data?.success,
            duration: 5000,
          });
        }
        form.reset() 
      });
    });
  };
  return (
    <>
      {user ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      maxLength={300}
                      placeholder="Leave a comment about this character..."
                      className="resize-none dark:bg-purple-900 bg-purple-400 rounded-[5px] placeholder:text-white text-white dark:border-purple-600 focus-visible:ring-0"
                    />
                  </FormControl>
                  <div className="text-right text-white">
                    {field.value?.length || 0}/300
                  </div>
                </FormItem>
              )}
            />
           <div className="flex justify-end mt-5 w-full">
           <Button type="submit" className="rounded-[5px] border-white border-[1px] bg-purple-500/70 z-50 hover:bg-purple-600 dark:hover:bg-purple-900 transition-all text-white duration-300" disabled={isPending}>
              Add Comment
            </Button>
           </div>
          </form>
        </Form>
      ) : (
        <div className="container flex justify-center">
          <h1>You need to be logged in to add a comment!</h1>
        </div>
      )}
    </>
  );
}

export default CommentsForm;
