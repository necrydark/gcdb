"use client"
import React, { startTransition, useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { cardColours } from '../lib/rarity-colours'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { EllipsisVertical } from 'lucide-react'
import { Input, user } from '@nextui-org/react'
import { Button } from '@/src/components/ui/button'
import { Character, Comments, User, UserRole } from '@prisma/client'
import { formatDate } from "@/src/lib/date-format";
import { deleteComment, updateComment } from '../actions/comments'
import Link from 'next/link'
import { toast } from './ui/use-toast'
import { useRouter } from 'next/navigation'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { useForm } from 'react-hook-form'
import * as z from "zod";
import { commentSchema } from '../schemas/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Textarea } from './ui/textarea'

type Props = {
  colour: string;
  idx: number;
  comment: Comments & {
    character: Character
  }
  userId: string;
  userRole: UserRole
}

export default function CommentCard({
    idx,
    colour,
    comment,
    userId,
    userRole
}: Props) {

  const { update } = useSession();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const router = useRouter();

  const deleteCommentTimeout = (commentId: string) => {
    setIsDeleting(true)

    setTimeout(() => {
        setIsDeleting(false);
        deleteComment(commentId);

        toast({
          title: "Commented Deleted",
          description: "The comment has been succesfully deleted."
        })

        router.refresh();
    }, 3000);
  }

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      characterId: comment.characterId,
      comment: comment.comment,

    }
  })


  const onSubmit = (values: z.infer<typeof commentSchema>) => {
    startTransition(() => {
      updateComment(values, comment.id)
      .then((data) => {
        if(data.error) {
          setError(data.error);
          toast({
            title: "Error",
            description: data.error,
            variant: "purple",
          });
        }
        
        if (data.success) {
          update();
          form.reset();
          setSuccess(data.success);
          toast({
            title: "Success!",
            description: data.success,
            variant: "purple",
          });
          router.back();
        }
      })
      .catch((err) => setError(err))
    }
    )
  }

  console.log(isPending);

  return (
    <Card
    key={idx}
    className={`${cardColours(colour as string)} border-0`}
  >
   <CardHeader className="flex flex-row justify-between">
    <div>
    <CardTitle className="flex flex-row gap-2">
      <h1> {comment.character.name}</h1>
       ・{" "} 
       <p>{comment.character.tag}</p>
     </CardTitle>
     <p className="text-xs mt-2">
      {formatDate(comment.createdAt.toLocaleDateString())}
     </p>
    </div>
       {(comment.userId === userId || userRole === "ADMIN" || userRole === "OWNER" || userRole ==="COOWNER") && (
    <DropdownMenu modal={false}>
     <DropdownMenuTrigger className='hover:bg-purple-950 rounded-full' asChild>
     <EllipsisVertical className="h-4 w-4 text-white" />
     </DropdownMenuTrigger>
     <DropdownMenuContent className="dark:bg-purple-950 bg-purple-700">
       <DropdownMenuItem onClick={(e) => {
              e.preventDefault();
              setIsEditDialogOpen(true)
       }} className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600">
        Edit
       

       </DropdownMenuItem>
       <DropdownMenuItem  className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
       onClick={() => deleteCommentTimeout(comment.id)}
       >Delete</DropdownMenuItem>

     </DropdownMenuContent>
    </DropdownMenu>
       )}
   </CardHeader>


   
    <CardContent>
      <div className="flex flex-row items-center justify-between">
      <p className="text-white">{comment.comment}</p>
      <p className="text-sm text-white dark:text-muted-foreground mt-2">
      </p>
      </div>
      <Link
      href={`/characters/${comment.character.slug}`}>
     
      <Button
        variant={
          colour as
            | "red"
            | "green"
            | "blue"
            | "yellow"
            | "orange"
            | "pink"
            | "cyan"
            | "purple"
            | null
            | undefined
        }
        className="mt-4 rounded-[5px]"
      >
        View
      </Button>
        </Link>
    </CardContent>

    <Dialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          >
            <DialogContent  className="bg-purple-300 dark:bg-purple-700 z-[100]">
              <DialogHeader>
                <DialogTitle>
                  Edit Comment
                </DialogTitle>
              </DialogHeader>
              <div className='space-y-6'>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Comment"
                        className="border-purple-900 resize-none h-32 bg-purple-600 rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white dark:bg-purple-800  focus:border-purple-900 focus-visible:ring-0 "
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

<DialogFooter>
              <Button
                  variant={"outline"}
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isDeleting}
                  type='button'
                  className="text-white rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 hover:bg-purple-600 border-[2px] flex flex-row items-center  hover:text-white dark:bg-purple-700 transition-all duration-250"
                >
                  Cancel
                </Button>
                <Button
                type="submit"
className="dark:hover:bg-purple-950 border-purple-900 bg-purple-400 rounded-[5px] hover:bg-purple-600 border-[2px] flex flex-row items-center text-white  hover:text-white dark:bg-purple-700 transition-all duration-250"              >
                Save Changes
              </Button>
              </DialogFooter>
                    </form>
                  </Form>
              </div>
          
            </DialogContent>
          </Dialog>

  </Card>
  )
}
