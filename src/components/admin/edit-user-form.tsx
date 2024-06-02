"use client"

import { getUserById } from '@/data/user'
import { ExtendedUser } from '@/src/next-auth'
import { ProfileColour, UserRole } from '@prisma/client';
import React from 'react'
import { adminSchema } from '@/src/schemas/schema';
import { useState, useTransition } from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from '../ui/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { editUser } from '@/src/actions/admin';
import { Button } from '../ui/button';

interface UserInterface {
    name: string;
    username: string;
    email: string;
    isTwoFactorEnabled: boolean;
    role: UserRole;
}

function EditUserForm({
    name,
    username,
    email,
    isTwoFactorEnabled,
    role,
}: UserInterface) {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof adminSchema>>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            name: name || undefined,
            email: email || undefined,
            username: username || undefined,
            isTwoFactorEnabled: isTwoFactorEnabled || undefined,
            role: role || undefined,
        }
    })

    const { toast } = useToast();

    const onSubmit = (values: z.infer<typeof adminSchema>) => {
        startTransition(() => {
            editUser(values)
            .then((data) => {
                if(data.error){
                    setError(data.error);
                    toast({
                        title: "Error",
                        description: data.error,
                        variant: "destructive"
                    })
                }

                if(data.success) {
                    form.reset();
                    setSuccess(data.success);
                    toast({
                        title: "Success",
                        description: data.success,
                        variant: "default"
                    })
                }
            })
            .catch((err) => setError(err));
        })
    }




  return (
    <div className='container mx-auto'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                <div className='space-y-4'>
                    <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='text'
                                    placeholder="John Doe"
                                    disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )} 
                    />
                     <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='text'
                                    placeholder="John Doe"
                                    disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )} 
                    />
                     <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type='email'
                                    placeholder="John Doe"
                                    disabled={isPending}
                                />
                            </FormControl>
                        </FormItem>
                    )} 
                    />
                     <FormField
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel> Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enabled / Disabled 2FA for this account!
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          disabled={isPending}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Colour</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a colour for your profile!" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>
                            User
                          </SelectItem>
                          
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <Button type="submit">Update User</Button>
            </form>
        </Form>
    </div>
  )
}

export default EditUserForm