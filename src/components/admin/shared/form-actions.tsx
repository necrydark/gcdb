'use client';

import React from "react";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FormActionsProps {
  onCancelHref: string;
  onCancelLabel?: string;
  onSubmitLabel?: string;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  showCancel?: boolean;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function FormActions({
  onCancelHref,
  onCancelLabel = "Cancel",
  onSubmitLabel = "Save",
  isSubmitting = false,
  isDisabled = false,
  showCancel = true,
  variant = "default",
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-4 pt-6">
      {showCancel && (
        <Link href={onCancelHref}>
          <Button 
            type="button" 
            variant="outline" 
            disabled={isSubmitting}
            className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {onCancelLabel}
          </Button>
        </Link>
      )}
      
      <Button
        type="submit"
        disabled={isSubmitting || isDisabled}
        variant={variant}
        className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            Saving...
          </>
        ) : (
          onSubmitLabel
        )}
      </Button>
    </div>
  );
}