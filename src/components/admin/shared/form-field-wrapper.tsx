'use client';

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldWrapperProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "textarea" | "url";
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

export function FormFieldWrapper<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled = false,
  description,
}: FormFieldWrapperProps<T>) {
  const inputProps = {
    placeholder,
    disabled,
    className: "border-purple-900 bg-purple-950 border-[2px] focus:border-purple-900 focus-visible:ring-0 rounded-[5px] text-white placeholder:text-gray-400",
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-white font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                {...field}
                {...inputProps}
                rows={3}
              />
            ) : (
              <Input
                {...field}
                {...inputProps}
                type={type}
              />
            )}
          </FormControl>
          {description && (
            <p className="text-sm text-gray-400 dark:text-gray-300">
              {description}
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}