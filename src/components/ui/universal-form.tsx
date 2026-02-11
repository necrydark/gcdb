"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import React, { useCallback } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { CustomMultiSelect } from "./custom-multi-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Switch } from "./switch";
import { Textarea } from "./textarea";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "url"
  | "textarea"
  | "select"
  | "multiselect"
  | "switch"
  | "date"
  | "array"
  | "object"
  | "conditional"
  | "custom";

export interface FieldConfig {
  key?: string;
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  validation?: z.ZodTypeAny;
  className?: string;
  column?: number | string;
  dataSource?: string;
  options?: Array<{ label: string; value: any; image?: string }>;
  default?: any;
  minItems?: number;
  maxItems?: number;
  fixedLength?: number;
  dependsOn?: string;
  condition?: (value: any, formData: any) => boolean;
  render?: (field: any, form: UseFormReturn<any>) => React.ReactNode;
  fields?: Record<string, FieldConfig>;
  arrayConfig?: {
    fields: Record<string, FieldConfig>;
    addButtonLabel?: string;
    removeButtonLabel?: string;
  };
  conditionalConfig?: {
    triggerField: string;
    condition: (value: any) => boolean;
    fields: Record<string, FieldConfig>;
  };
}

export interface TabConfig {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
  fields: Record<string, FieldConfig> | FieldConfig[];
  layout?: "grid" | "form";
  columns?: number;
}

export interface UniversalFormProps<T extends z.ZodSchema> {
  schema: T;
  defaultValues?: any;
  action: (values: z.infer<T>) => Promise<any>;
  tabs: TabConfig[];
  layout?: string;
  multiColumn?: boolean;
  dataSources?: Record<string, any[]>;
  submitText?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onSuccess?: (message: string) => void;
  onError?: (error: Error) => void;
}

// Array field component for dynamic fields
function ArrayFieldComponent({
  field,
  form,
  config,
  dataSources,
}: {
  field: any;
  form: UseFormReturn<any>;
  config: FieldConfig;
  dataSources?: Record<string, any[]>;
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: field.name,
  });

  const addField = useCallback(() => {
    const newItem = config.arrayConfig?.fields
      ? Object.keys(config.arrayConfig.fields).reduce((acc, key) => {
          acc[key] = config.arrayConfig!.fields[key].default;
          return acc;
        }, {} as any)
      : {};

    append(newItem);
  }, [append, config.arrayConfig]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <FormLabel>{config.label}</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addField}
          disabled={config.maxItems ? fields.length >= config.maxItems : false}
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          {config.arrayConfig?.addButtonLabel || "Add"}
        </Button>
      </div>

      {fields.map((fieldItem, index) => (
        <Card key={fieldItem.id} className="p-4">
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-medium">
              {config.label} {index + 1}
            </h4>
            {fields.length > (config.minItems || 1) && (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                <TrashIcon className="w-4 h-4" />
              </Button>
            )}
          </div>

          {config.arrayConfig?.fields &&
            Object.entries(config.arrayConfig.fields).map(
              ([fieldName, fieldConfig]) => (
                <FieldRenderer
                  key={`${fieldItem.id}-${fieldName}`}
                  config={fieldConfig}
                  name={`${field.name}.${index}.${fieldName}`}
                  dataSources={dataSources}
                  form={form}
                />
              ),
            )}
        </Card>
      ))}

      {fields.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
          No {config.label.toLowerCase()} added. Click &quot;Add&quot; to create
          one.
        </div>
      )}
    </div>
  );
}

// Field renderer component
function FieldRenderer({
  config,
  name,
  form,
  dataSources,
  className,
}: {
  config: FieldConfig;
  name: string;
  form: UseFormReturn<any>;
  dataSources?: Record<string, any[]>;
  className?: string;
}) {
  if (config.render) {
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) =>
          config.render!(field, form) as React.ReactElement
        }
      />
    );
  }

  switch (config.type) {
    case "text":
    case "email":
    case "password":
    case "number":
    case "url":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {config.label}{" "}
                {config.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type={config.type}
                  placeholder={config.placeholder}
                  disabled={config.disabled}
                />
              </FormControl>
              {config.description && (
                <FormDescription>{config.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "textarea":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {config.label}{" "}
                {config.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder={config.placeholder}
                  disabled={config.disabled}
                />
              </FormControl>
              {config.description && (
                <FormDescription>{config.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "select":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {config.label}{" "}
                {config.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={config.placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {config.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.image && (
                        <img
                          src={option.image}
                          alt=""
                          className="w-4 h-4 mr-2 rounded"
                        />
                      )}
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {config.description && (
                <FormDescription>{config.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "multiselect":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {config.label}{" "}
                {config.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <FormControl>
                <CustomMultiSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={config.options}
                  placeholder={config.placeholder}
                  dataSource={config.dataSource}
                  form={form}
                  dataSources={dataSources}
                />
              </FormControl>
              {config.description && (
                <FormDescription>{config.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "switch":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem
              className={cn(
                "flex flex-row items-center justify-between",
                className,
              )}
            >
              <div className="space-y-0.5">
                <FormLabel>{config.label}</FormLabel>
                {config.description && (
                  <FormDescription>{config.description}</FormDescription>
                )}
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={config.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "date":
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>
                {config.label}{" "}
                {config.required && <span className="text-red-500">*</span>}
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                      disabled={config.disabled}
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
                    disabled={config.disabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {config.description && (
                <FormDescription>{config.description}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      );

    case "array":
      return (
        <ArrayFieldComponent
          field={{ name }}
          form={form}
          config={config}
          dataSources={dataSources}
        />
      );

    case "object":
      if (config.fields) {
        return (
          <div className="space-y-4 border rounded-lg p-4">
            <h4 className="font-medium">{config.label}</h4>
            <FormLayout
              fields={config.fields}
              form={form}
              dataSources={dataSources}
              columns={1}
            />
          </div>
        );
      }
      break;

    default:
      return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <FormLabel>{config.label}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
  }
}

// Layout component for multi-column grids
function FormLayout({
  fields,
  form,
  dataSources,
  layout,
  columns = 1,
}: {
  fields: Record<string, FieldConfig> | FieldConfig[];
  form: UseFormReturn<any>;
  dataSources?: Record<string, any[]>;
  layout?: string;
  columns?: number;
}) {
  if (Array.isArray(fields)) {
    return (
      <div className="space-y-6">
        {fields.map((field, index) => (
          <FieldRenderer
            key={field.key || `${index}`}
            config={field}
            name={field.name}
            form={form}
            dataSources={dataSources}
          />
        ))}
      </div>
    );
  }

  const fieldEntries = Object.entries(fields);

  if (columns === 1) {
    return (
      <div className="space-y-6">
        {fieldEntries.map(([key, config]) => (
          <FieldRenderer
            key={key}
            config={config}
            name={key}
            form={form}
            dataSources={dataSources}
          />
        ))}
      </div>
    );
  }

  // Multi-column layout
  const columnClasses = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
    7: "md:grid-cols-7",
  };

  return (
    <div
      className={cn(
        "grid gap-6 grid-cols-1",
        columnClasses[columns as keyof typeof columnClasses],
      )}
    >
      {fieldEntries.map(([key, config]) => (
        <FieldRenderer
          key={key}
          config={config}
          name={key}
          form={form}
          dataSources={dataSources}
        />
      ))}
    </div>
  );
}

export function UniversalForm<T extends z.ZodSchema>({
  schema,
  defaultValues,
  action,
  tabs,
  layout = "character",
  multiColumn = true,
  dataSources = {},
  submitText = "Save",
  loading = false,
  disabled = false,
  className,
  onSuccess,
  onError,
}: UniversalFormProps<T>) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (values: z.infer<T>) => {
      try {
        setIsSubmitting(true);
        const result = await action(values);

        if (result?.error) {
          throw new Error(result.error);
        }

        onSuccess?.(result?.success || "Operation completed successfully");
      } catch (error) {
        onError?.(error as Error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [action, onSuccess, onError],
  );

  const nextStep = useCallback(() => {
    if (currentStep < tabs.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, tabs.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < tabs.length) {
        setCurrentStep(step);
      }
    },
    [tabs.length],
  );

  const currentTab = tabs[currentStep];

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Step {currentStep + 1} of {tabs.length}
              </h2>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentStep + 1) / tabs.length) * 100)}% complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tabs.length) * 100}%` }}
              />
            </div>
            {/* Step indicators */}
            <div className="flex justify-between mt-4">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => goToStep(index)}
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors",
                    index === currentStep
                      ? "bg-primary text-primary-foreground"
                      : index < currentStep
                        ? "bg-primary/50 text-white"
                        : "bg-gray-200 text-gray-500 hover:bg-gray-300",
                  )}
                  disabled={tab.disabled}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Current step content */}
          <Card>
            <CardHeader>
              <CardTitle>{currentTab.label}</CardTitle>
              {currentTab.description && (
                <CardDescription>{currentTab.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <FormLayout
                fields={currentTab.fields}
                form={form}
                dataSources={dataSources}
                layout={layout}
                columns={currentTab.columns || (multiColumn ? 2 : 1)}
              />
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeftIcon className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="flex gap-2">
              {currentStep < tabs.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Next
                  <ChevronRightIcon className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={disabled || isSubmitting || loading}
                  size="lg"
                >
                  {isSubmitting || loading ? "Saving..." : submitText}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
