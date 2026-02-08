import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  backHref?: string;
  children?: ReactNode;
}

export function AdminPageHeader({
  title,
  description,
  actionText,
  actionHref,
  backHref,
  children,
}: AdminPageHeaderProps) {
  return (
    <div className="flex justify-between items-center pb-5">
      <div className="flex gap-2 items-center">
        {backHref && (
          <Button
            size="icon"
            variant="gradient"
            className="border-[2px] hover:text-white transition-all duration-250"
            asChild
          >
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
        )}
        <div className="flex flex-col">
          <h1 className="text-2xl leading-tight tracking-tight font-extrabold text-white">
            {title}
          </h1>
          <p className="text-gray-500 dark:text-gray-300">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {children}
        {actionText && actionHref && (
          <Button
            size="sm"
            variant="outline"
            className="rounded-[5px] dark:hover:bg-purple-950 border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600"
            asChild
          >
            <Link href={actionHref}>
              <Plus className="mr-2 h-4 w-4" />
              {actionText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export function AdminFormCard({
  title,
  description,
  children,
  className = "",
}: {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card className={`container mx-auto p-10 bg-gradient-to-br from-card via-card to-purple-50/50 dark:to-purple-900/10 border-border/50 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-[5px] ${className}`}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}