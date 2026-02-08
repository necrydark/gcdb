import { cn } from "@/src/lib/utils";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";
import { ReactNode } from "react";

interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Alert({ variant = "info", title, children, className }: AlertProps) {
  const baseClass = "p-4 rounded-[5px] border-l-4";
  
  const variants = {
    info: {
      container: "bg-blue-50 dark:bg-blue-950 border-blue-500",
      icon: Info,
      iconClass: "text-blue-500",
      titleClass: "text-blue-800 dark:text-blue-200",
      textClass: "text-blue-700 dark:text-blue-300",
    },
    success: {
      container: "bg-green-50 dark:bg-green-950 border-green-500",
      icon: CheckCircle,
      iconClass: "text-green-500",
      titleClass: "text-green-800 dark:text-green-200",
      textClass: "text-green-700 dark:text-green-300",
    },
    warning: {
      container: "bg-yellow-50 dark:bg-yellow-950 border-yellow-500",
      icon: AlertTriangle,
      iconClass: "text-yellow-500",
      titleClass: "text-yellow-800 dark:text-yellow-200",
      textClass: "text-yellow-700 dark:text-yellow-300",
    },
    error: {
      container: "bg-red-50 dark:bg-red-950 border-red-500",
      icon: AlertTriangle,
      iconClass: "text-red-500",
      titleClass: "text-red-800 dark:text-red-200",
      textClass: "text-red-700 dark:text-red-300",
    },
  };

  const { container: containerClass, icon: Icon, iconClass, titleClass, textClass } = variants[variant];

  return (
    <div className={cn(baseClass, containerClass, className)} role="alert">
      <div className="flex items-start">
        <Icon className={`h-5 w-5 ${iconClass} flex-shrink-0 mt-0.5`} />
        <div className="ml-3">
          {title && (
            <h3 className={`text-sm font-medium ${titleClass}`}>{title}</h3>
          )}
          <div className={`text-sm ${textClass} ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}