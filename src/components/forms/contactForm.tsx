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

//   const { toast } = useToast();

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
import { Loader } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export type ContactFormInputs = z.infer<typeof formSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({ resolver: zodResolver(formSchema) });
  const { toast } = useToast();

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    const result = await sendEmail(data);

    if (result?.success) {
      toast({
        title: "Success",
        description: "Email Sent!",
        duration: 5000,
        draggable: true,
      });
      return;
    }
    toast({
      variant: "destructive",
      title: "Error",
      description: "Failed to send email",
      duration: 5000,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-1 flex-col gap-4"
    >
      <div>
        <label className="pl-1 mb-2">Email</label>
        <input
          placeholder="Email - janedoe@example.com"
          className="flex h-10 w-full mt-2 rounded-md bg-[#020817] px-3 py-2 text-sm"
          required
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>
      <div>
        <label className="pl-1 mb-2">Subject</label>
        <input
          placeholder="Subject - Feedback - Change colour of homepage"
          className="flex h-10 w-full mt-2 rounded-md bg-[#020817] px-3 py-2 text-sm"
          {...register("subject")}
        />
        {errors.subject?.message && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.subject?.message}
          </p>
        )}
      </div>
      <div>
        <label className="pl-1 mb-2">Message</label>
        <textarea
          rows={10}
          cols={10}
          placeholder="Message - I would like to suggest a change in the homepage colour from blue to red."
          className="flex min-h-[80px] mt-2 w-full rounded-md bg-[#020817] px-3 py-2 text-sm resize-none h-64"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="mt-1 ml-1 text-sm text-red-600">
            {errors.message?.message}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <>
          {isSubmitting ? (
            <Button disabled>
              <Loader className="mt-2 w-4 h-4 animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="rounded-md p-2 w-[15%]  bg-[#5f7e9f] dark:bg-[#040D25] hover:bg-[#040D25] dark:hover:bg-[#5f7e9f] transition-colors duration-300 dark:text-white !mt-[2rem]"
            >
              Submit
            </Button>
          )}
        </>
      </div>
    </form>
  );
}
