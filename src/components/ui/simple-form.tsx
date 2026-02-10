"use client";

import React, { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';
import { Textarea } from './textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Switch } from './switch';
import { Calendar } from './calendar';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'switch' | 'date';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  options?: { label: string; value: string | number }[];
  validation?: z.ZodTypeAny;
  className?: string;
  render?: (field: any, form: any) => React.ReactNode;
}

export interface SimpleFormProps {
  schema: z.ZodSchema;
  fields: FormFieldConfig[];
  onSubmit: (values: any) => Promise<void> | void;
  defaultValues?: any;
  submitText?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  formClassName?: string;
  submitButtonClassName?: string;
  onSuccess?: (message: string) => void;
  onError?: (error: Error) => void;
  resetOnSubmit?: boolean;
}

export function SimpleForm({
  schema,
  fields,
  onSubmit,
  defaultValues,
  submitText = "Submit",
  loading = false,
  disabled = false,
  className,
  formClassName,
  submitButtonClassName,
  onSuccess,
  onError,
  resetOnSubmit = false,
}: SimpleFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = useCallback(async (values: any) => {
    try {
      setIsSubmitting(true);
      await onSubmit(values);
      
      if (resetOnSubmit) {
        form.reset();
      }
      
      onSuccess?.("Form submitted successfully!");
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  }, [onSubmit, form, resetOnSubmit, onSuccess, onError]);

  const renderField = (fieldConfig: FormFieldConfig) => {
    const { name, type, placeholder, required, disabled: fieldDisabled, options, className: fieldClassName, render } = fieldConfig;

    if (render) {
      return render(form.getValues(name), form);
    }

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={fieldClassName}>
                <FormLabel>
                  {fieldConfig.label} {required && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    disabled={fieldDisabled || disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'textarea':
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={fieldClassName}>
                <FormLabel>
                  {fieldConfig.label} {required && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={placeholder}
                    disabled={fieldDisabled || disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'select':
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={fieldClassName}>
                <FormLabel>
                  {fieldConfig.label} {required && <span className="text-red-500">*</span>}
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options?.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'switch':
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={cn("flex flex-row items-center justify-between", fieldClassName)}>
                <div className="space-y-0.5">
                  <FormLabel>{fieldConfig.label}</FormLabel>
                  {fieldConfig.description && (
                    <p className="text-sm text-muted-foreground">{fieldConfig.description}</p>
                  )}
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={fieldDisabled || disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case 'date':
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={fieldClassName}>
                <FormLabel>
                  {fieldConfig.label} {required && <span className="text-red-500">*</span>}
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={fieldDisabled || disabled}
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date)}
                      disabled={fieldDisabled || disabled}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return (
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={fieldClassName}>
                <FormLabel>
                  {fieldConfig.label} {required && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={placeholder}
                    disabled={fieldDisabled || disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
    }
  };

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-6", formClassName)}>
          {fields.map(renderField)}
          
          <Button
            type="submit"
            className={cn("w-full", submitButtonClassName)}
            disabled={disabled || isSubmitting || loading}
          >
            {isSubmitting || loading ? "Submitting..." : submitText}
          </Button>
        </form>
      </Form>
    </div>
  );
}