"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './skeleton';

interface LoadingStateProps {
  type?: 'skeleton' | 'spinner' | 'dots';
  className?: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  type = 'skeleton',
  className,
  text,
  size = 'md',
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12',
  };

  if (type === 'spinner') {
    return (
      <div className={cn('flex items-center justify-center space-x-2', className)}>
        <div className={cn('animate-spin rounded-full border-2 border-primary border-t-transparent', sizeClasses[size])} />
        {text && <span className="text-sm text-muted-foreground">{text}</span>}
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={cn('flex items-center justify-center space-x-1', className)}>
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        {text && <span className="text-sm text-muted-foreground ml-2">{text}</span>}
      </div>
    );
  }

  return <Skeleton className={className} />;
}

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  showBadge?: boolean;
  lines?: number;
}

export function SkeletonCard({
  className,
  showImage = true,
  showBadge = true,
  lines = 2,
}: SkeletonCardProps) {
  return (
    <div className={cn('rounded-lg border p-4 space-y-3', className)}>
      {showImage && (
        <Skeleton className="w-full h-48 rounded-md" />
      )}
      
      {showBadge && (
        <div className="flex gap-2">
          <Skeleton className="h-6 w-12 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} className={cn('h-4', i === 0 ? 'w-3/4' : 'w-full')} />
        ))}
      </div>
    </div>
  );
}

interface CharacterGridSkeletonProps {
  count?: number;
  className?: string;
}

export function CharacterGridSkeleton({
  count = 12,
  className,
}: CharacterGridSkeletonProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[3/4] rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-12 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: TableSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-8" />
        ))}
      </div>
      
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-6" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default LoadingState;