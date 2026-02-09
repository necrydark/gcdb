'use client';

import React, { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface AdminPageLayoutProps {
  title: string;
  description?: string;
  backButtonHref?: string;
  backButtonLabel?: string;
  children: ReactNode;
  className?: string;
}

export function AdminPageLayout({
  title,
  description,
  backButtonHref,
  backButtonLabel = "Back",
  children,
  className = "container mx-auto py-10 max-w-[1440px]",
}: AdminPageLayoutProps) {
  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-8">
        {backButtonHref && (
          <div className="mb-4">
            <Link
              href={backButtonHref}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {backButtonLabel}
            </Link>
          </div>
        )}
        
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            {title}
          </h1>
          {description && (
            <p className="text-gray-400 dark:text-gray-300">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="h-full">
        {children}
      </div>
    </div>
  );
}