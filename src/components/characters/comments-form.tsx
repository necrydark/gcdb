"use client";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addComment } from "@/src/actions/add-comment";
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

  const { toast } = useToast();

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
            variant: "default",
            description: data?.success,
            duration: 5000,
          });
        }
      });
    });
  };
  return (
    <>
      <h1 className="text-3xl leading-tight font-extrabold py-5">Comments</h1>
      {user ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPending}
                      {...field}
                      maxLength={300}
                      placeholder="Leave a comment about this character..."
                      className="resize-none"
                    />
                  </FormControl>
                  <div className="text-right text-white">
                    {field.value?.length || 0}/300
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              Add Comment
            </Button>
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