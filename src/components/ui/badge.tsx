import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        purple:
        " bg-purple-500 dark:bg-purple-800 border-purple-800 dark:border-purple-500  !text-white",
      red: " bg-red-500 dark:bg-red-800 border-red-800 dark:border-red-500 !text-white",
      green:
        " bg-green-500 dark:bg-green-800 border-green-800 dark:border-green-500 !text-white",
      blue: " bg-blue-500 dark:bg-blue-800 border-blue-800 dark:border-blue-500 !text-white",
      yellow:
        " bg-yellow-500 dark:bg-yellow-800 border-yellow-800 dark:border-yellow-500 !text-white",
      orange:
        " bg-orange-500 dark:bg-orange-800 border-orange-800 dark:border-orange-500 !text-white",
      pink: " bg-pink-500 dark:bg-pink-800 border-pink-800 dark:border-pink-500 !text-white",
      cyan: " bg-cyan-500 dark:bg-cyan-800 border-cyan-800 dark:border-cyan-500 !text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
