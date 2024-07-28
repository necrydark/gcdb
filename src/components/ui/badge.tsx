import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/src/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-emerald-500 text-primary-foreground",
        purple:
          " bg-purple-300 dark:bg-purple-950 border-purple-950 dark:border-purple-300  !text-white",
        red: " bg-red-300 dark:bg-red-950 border-red-950 dark:border-red-300 !text-white",
        green:
          " bg-green-300 dark:bg-green-950 border-green-950 dark:border-green-300 !text-white",
        blue: " bg-blue-300 dark:bg-blue-950 border-blue-950 dark:border-blue-300 !text-white",
        yellow:
          " bg-yellow-300 dark:bg-yellow-950 border-yellow-950 dark:border-yellow-300 !text-white",
        orange:
          " bg-orange-300 dark:bg-orange-950 border-orange-950 dark:border-orange-300 !text-white",
        pink: " bg-pink-300 dark:bg-pink-950 border-pink-950 dark:border-pink-300 !text-white",
        cyan: " bg-cyan-300 dark:bg-cyan-950 border-cyan-950 dark:border-cyan-300 !text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
