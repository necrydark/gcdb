import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/src/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium rounded-[5px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground text-white",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        purple:
        " bg-purple-700 hover:opacity-75 dark:bg-purple-950  !text-white",
      red: " bg-red-500 dark:bg-red-800 border-red-800  hover:bg-red-600  dark:hover:bg-red-900  dark:border-red-500 !text-white",
      green:
        " bg-green-500 dark:bg-green-800 border-green-800  hover:bg-green-600  dark:hover:bg-green-900  dark:border-green-500 !text-white",
      blue: " bg-blue-500 dark:bg-blue-800 border-blue-800  hover:bg-blue-600  dark:hover:bg-blue-900  dark:border-blue-500 !text-white",
      yellow:
        " bg-yellow-500 dark:bg-yellow-800 border-yellow-800  hover:bg-yellow-600  dark:hover:bg-yellow-900  dark:border-yellow-500 !text-white",
      orange:
        " bg-orange-500 dark:bg-orange-800 border-orange-800  hover:bg-orange-600  dark:hover:bg-orange-900  dark:border-orange-500 !text-white",
      pink: " bg-pink-500 dark:bg-pink-800 border-pink-800  hover:bg-pink-600  dark:hover:bg-pink-900  dark:border-pink-500 !text-white",
      cyan: " bg-cyan-500 dark:bg-cyan-800 border-cyan-800  hover:bg-cyan-600  dark:hover:bg-cyan-900  dark:border-cyan-500 !text-white",
      gradient: "text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
