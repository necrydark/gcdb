import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge Tailwind CSS classes efficiently.
 * Combines clsx for conditional class names with tailwind-merge for proper merging.
 * 
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string with Tailwind conflicts resolved
 * 
 * @example
 * ```tsx
 * cn("px-4 py-2", isActive && "bg-blue-500", "text-white")
 * // Returns: "px-4 py-2 bg-blue-500 text-white"
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
