"use client";

import { addFriendSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ZodError, z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

type Props = {};

type FormData = z.infer<typeof addFriendSchema>;

const AddFriendButton = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(addFriendSchema),
    defaultValues: {
      username: "",
    },
  });

  const { toast } = useToast();
  // TODO: Change this to a server action.
  const addFriend = async (username: string) => {
    try {
      const validatedUsername = addFriendSchema.parse(username);

      await axios.post("/api/friends/add", {
        username: validatedUsername,
      });

      setShowSuccess(true);
    } catch (err) {
      if (err instanceof ZodError) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description: err.response?.data,
          variant: "destructive",
          duration: 5000,
        });
        return;
      }

      toast({
        title: "Error",
        description: "An Error Occurred",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.username);
    if (showSuccess) {
      toast({
        title: "Success",
        description: "Friend Added!",
        duration: 5000,
        draggable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <Label
        htmlFor="username"
        className="block text-sm font-medium leading-6 text-muted-foreground"
      >
        Username
      </Label>
      <div className="mt-2 flex gap-4">
        <Input
          type="text"
          placeholder="johndoe"
          {...register("username")}
          className="block w-ful rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <Button type="submit">Add</Button>
      </div>
    </form>
  );
};

export default AddFriendButton;
