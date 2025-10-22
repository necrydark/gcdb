// "use client";
// import { sendEmail } from "@/app/api/send/route";
// import { formSchema } from "@/app/schemas/schema";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import react, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { useToast } from "../ui/use-toast";

// export type ContactFormInputs = z.infer<typeof formSchema>;

// export function ContactForm() {
//   const form = useForm<ContactFormInputs>({
//     // Use the ContactFormInputs type as a value in the useForm function
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     },
//   });

//

//   const [isMounted, setIsMounted] = useState(false);
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   if (!isMounted) {
//     return null;
//   }

//   function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       const formData = new FormData();
//       formData.append("message", values.message);
//       formData.append("name", values.name);
//       formData.append("email", values.email);
//       formData.append("subject", values.subject);

//       sendEmail(formData);
//       form.reset({
//         name: "",
//         email: "",
//         subject: "",
//         message: "",
//       });

//       toast({
//         title: "Success",
//         description: "Email Sent!",
//         duration: 5000,
//         draggable: true,
//       });
//     } catch (err) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to send email",
//         duration: 5000,
//       });
//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 mt-[5rem] flex flex-col"
//       >
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="name">Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="John Doe" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="email">Email</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="johndoe@mail.com"
//                   type="email"
//                   {...field}
//                   required
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="subject"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="subject">Subject</FormLabel>
//               <FormControl>
//                 <Input
//                   placeholder="I want to work with you."
//                   {...field}
//                   required
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="message"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel htmlFor="message">Message</FormLabel>
//               <FormControl>
//                 <Textarea
//                   placeholder="Type your message here..."
//                   {...field}
//                   className="resize-none h-64"
//                   rows={5}
//                   maxLength={400}
//                   required
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button
//           type="submit"
//           className="w-[15%] md:w-[10%] mx-auto md:m-0 bg-[#5f7e9f] dark:bg-[#040D25] hover:bg-[#040D25] dark:hover:bg-[#5f7e9f] transition-colors duration-300 dark:text-white !mt-[2rem]"
//         >
//           Submit
//         </Button>
//       </form>
//     </Form>
//   );
// }

"use client";

import { sendEmail } from "@/src/actions/send-email";
import { formSchema } from "@/src/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveRight } from "lucide-react";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export type ContactFormInputs = z.infer<typeof formSchema>;

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
      subject: "",
    },
  });
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isSubmitting },
  // } = useForm<ContactFormInputs>({ resolver: zodResolver(formSchema) });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    startTransition(() => {
      sendEmail(data).then((data) => {
        if (data?.success) {
          toast("Success", {
            description: "Email Sent!",
            duration: 5000,
            className: "bg-purple-700 text-white",
          });
          form.reset();
        } else {
          toast("Error", {
            description: "Failed to send email",
            duration: 5000,
            className: "bg-purple-700 text-white",
          });
        }
      });
    });
    // const result = await sendEmail(data);

    // if (result?.success) {
    //   toast({
    //     title: "Success",
    //     description: "Email Sent!",
    //     duration: 5000,
    //     draggable: true,
    //   });
    //   return;
    // }
    // toast({
    //   variant: "destructive",
    //   title: "Error",
    //   description: "Failed to send email",
    //   duration: 5000,
    // });
  };

  return (
    <Form {...form}>
      <form className="space-y-6 pt-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@example.com"
                    type="text"
                    disabled={isPending}
                    {...field}
                    className="border-border/50  bg-background/80 glass-effect rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white   focus:border-purple-900 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Subject"
                    type="text"
                    disabled={isPending}
                    {...field}
                    className="border-border/50  bg-background/80 glass-effect rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white   focus:border-purple-900 focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Message</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={isPending}
                    maxLength={255}
                    placeholder="Your Message"
                    className="border-border/50  bg-background/80 glass-effect   h-64 min-h-[80px] rounded-[5px] border-[2px] ring-0 focus:ring-0 placeholder:text-white text-white   focus:border-purple-900 resize-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="text-white rounded-[5px] border-border/50 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700  border-[2px] flex flex-row items-center  hover:text-white  transition-all duration-250"
          >
            Submit <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
