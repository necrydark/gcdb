import React, { memo, useMemo, useCallback } from 'react';

export function memoWithCompare<P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: P, nextProps: P) => boolean
) {
  return memo(Component, areEqual);
}

export function useMemoCallback<T extends (...args: any[]) => any>(
  fn: T,
  deps: React.DependencyList
): T {
  return useCallback(fn, deps) as T;
}

export function useDeepMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const valueRef = React.useRef<T | undefined>(undefined);
  const depsRef = React.useRef<React.DependencyList | undefined>(undefined);

  if (!depsRef.current || !depsAreEqual(depsRef.current, deps)) {
    depsRef.current = deps;
    valueRef.current = factory();
  }

  return valueRef.current as T;
}

function depsAreEqual(prevDeps: React.DependencyList, nextDeps: React.DependencyList): boolean {
  if (prevDeps.length !== nextDeps.length) return false;
  
  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== nextDeps[i]) return false;
  }
  
  return true;
}

export function useMemoizedArray<T>(array: T[]): T[] {
  return useMemo(() => array, [JSON.stringify(array)]);
}

export function useOptimizedCallback<T extends (...args: any[]) => any>(
  fn: T,
  deps: React.DependencyList
): T {
  return useCallback(fn, deps) as T;
}

interface OptimizationOptions {
  memo?: boolean;
  deepCompare?: boolean;
  cache?: boolean;
}

export function optimizeComponent<P extends object>(
  Component: React.ComponentType<P>,
  options: OptimizationOptions = {}
): React.ComponentType<P> {
  const { memo: shouldMemo = true, deepCompare = false } = options;

  if (!shouldMemo) {
    return Component;
  }

  if (deepCompare) {
    return memo(Component, (prevProps, nextProps) => {
      return deepEqual(prevProps, nextProps);
    });
  }

  return memo(Component);
}

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return false;
  
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object') return obj1 === obj2;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  
  return true;
}

export const performance = {
  mark: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(name);
    }
  },
  
  measure: (name: string, startMark: string, endMark?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.measure(name, startMark, endMark);
    }
  },
  
  getEntriesByName: (name: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      return window.performance.getEntriesByName(name);
    }
    return [];
  },
  
  clearMarks: (name?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks(name);
    }
  },
  
  clearMeasures: (name?: string) => {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMeasures(name);
    }
  }
};