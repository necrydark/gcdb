'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface AdminFormLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function AdminFormLayout({
  title,
  description,
  children,
  maxWidth = "max-w-2xl",
}: AdminFormLayoutProps) {
  return (
    <div className="flex flex-col gap-6">
      <Card className={`mx-auto ${maxWidth} w-full`}>
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
        <CardContent className="space-y-6">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}