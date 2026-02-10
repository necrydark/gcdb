"use client";

import React, { useState, useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from '@/lib/utils';

interface CustomMultiSelectProps {
  value: any[];
  onChange: (value: any[]) => void;
  options?: Array<{ label: string; value: any; image?: string }>;
  placeholder?: string;
  dataSource?: string;
  form: UseFormReturn<any>;
  dataSources?: Record<string, any[]>;
}

export function CustomMultiSelect({ 
  value, 
  onChange, 
  options,
  placeholder,
  dataSource,
  form,
  dataSources
}: CustomMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const selectedOptions = useMemo(() => {
    if (!value) return [];
    
    if (dataSource && form && dataSources) {
      const sourceData = dataSources[dataSource] || [];
      return value.map((id: any) => sourceData.find((item: any) => item.id === id)).filter(Boolean);
    }
    
    return options ? value.map((id: any) => options.find((opt: any) => opt.value === id)).filter(Boolean) : [];
  }, [value, options, dataSource, form, dataSources]);

  const handleRemove = useCallback((index: number) => {
    const newValues = value.filter((_: any, i: number) => i !== index);
    onChange(newValues);
  }, [value, onChange]);

  const handleSelect = useCallback((item: any) => {
    if (!value.includes(item.id || item.value)) {
      onChange([...value, item.id || item.value]);
    }
    setIsOpen(false);
  }, [value, onChange]);

  const availableOptions = useMemo(() => {
    if (dataSource && dataSources) {
      return dataSources[dataSource] || [];
    }
    return options || [];
  }, [dataSource, dataSources, options]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div 
        className="flex flex-wrap gap-2 min-h-[40px] cursor-pointer border rounded-md p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.length === 0 ? (
          <span className="text-muted-foreground">{placeholder || 'Select options...'}</span>
        ) : (
          selectedOptions.map((option, index) => (
            <Badge key={option.id || option.value || index} variant="secondary" className="flex items-center gap-1">
              {option.image && (
                <img src={option.imageUrl || option.image} alt="" className="w-4 h-4 rounded" />
              )}
              {option.name || option.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="ml-1 hover:text-destructive text-xs"
              >
                ×
              </button>
            </Badge>
          ))
        )}
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 p-2 bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto w-full">
          {availableOptions.map((option, index) => (
            <div
              key={option.id || option.value || index}
              className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer rounded"
              onClick={() => handleSelect(option)}
            >
              {option.image && (
                <img src={option.imageUrl || option.image} alt="" className="w-6 h-6 rounded" />
              )}
              <span>{option.name || option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}