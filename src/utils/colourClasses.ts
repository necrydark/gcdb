// colorUtils.ts

import { ProfileColour } from "@prisma/client";

// Define valid color options as a type for better type safety
// export type ColourOption = 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange' | 'pink' | 'cyan';

/**
 * Returns Tailwind CSS classes for a given color option
 * @param colour The colour to get classes for
 * @returns Tailwind CSS classes string
 */
export function getColourClasses(colour: ProfileColour | undefined): string {
  switch (colour) {
    case 'RED':
      return 'bg-red-400 text-white dark:bg-red-800';
    case 'BLUE':
      return 'bg-blue-400 text-white dark:bg-blue-800';
    case 'GREEN':
      return 'bg-green-400 text-white dark:bg-green-800';
    case 'YELLOW':
      return 'bg-yellow-400 text-white dark:bg-yellow-800';
    case 'PURPLE':
      return 'bg-purple-400 text-white dark:bg-purple-800';
    case 'ORANGE':
      return 'bg-orange-400 text-white dark:bg-orange-800';
    case 'PINK':
      return 'bg-pink-400 text-white dark:bg-pink-800';
    case 'CYAN':
      return 'bg-cyan-400 text-white dark:bg-cyan-800';
    default:
      return 'bg-purple-400 text-white dark:bg-purple-800'; // Return empty string if no color matches
  }
}