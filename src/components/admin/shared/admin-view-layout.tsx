'use client';

import React, { ReactNode, Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface AdminViewLayoutProps {
  title: string;
  description?: string;
  loadingText?: string;
  children: ReactNode;
  fallback?: ReactNode;
}

const DefaultFallback = ({ text = "Loading Data..." }: { text?: string }) => (
  <div className="flex justify-center items-center text-3xl flex-row gap-2 h-full text-white">
    {text}
    <Loader2 className="animate-spin h-6 w-6" />
  </div>
);

export function AdminViewLayout({
  title,
  description,
  loadingText = "Loading Data...",
  children,
  fallback,
}: AdminViewLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="mx-auto max-w-6xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            {title}
          </CardTitle>
          {description && (
            <p className="text-gray-400 dark:text-gray-300">
              {description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <Suspense fallback={fallback || <DefaultFallback text={loadingText} />}>
            {children}
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}