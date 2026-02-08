import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

// Consistent button variants with proper accessibility
export const AdminButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "gradient";
    isLoading?: boolean;
    loadingText?: string;
  }
>(({ className, variant = "primary", isLoading, loadingText, children, disabled, ...props }, ref) => {
  const baseClass = "rounded-[5px] transition-all duration-250 disabled:opacity-50";
  
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white border-purple-900 border-[2px]",
    secondary: "bg-purple-400 hover:bg-purple-600 text-white border-purple-900 border-[2px]",
    outline: "bg-transparent hover:bg-purple-600 text-white border-purple-900 border-[2px]",
    gradient: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white",
  };

  return (
    <Button
      ref={ref}
      className={cn(baseClass, variantClasses[variant], className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </Button>
  );
});

AdminButton.displayName = "AdminButton";