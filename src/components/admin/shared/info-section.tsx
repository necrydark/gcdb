'use client';

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";

interface InfoItem {
  label: string;
  value: string | number | boolean | null | undefined | any[];
  type?: "text" | "image" | "boolean" | "array" | "date";
  format?: (value: any) => string;
}

interface InfoSectionProps {
  title?: string;
  items: InfoItem[];
  columns?: number;
}

const InfoSection: React.FC<InfoSectionProps> = ({ 
  title, 
  items, 
  columns = 1 
}) => {
  const gridClass = columns > 1 ? `grid grid-cols-1 md:grid-cols-2` : "space-y-4";

  const renderValue = (item: InfoItem) => {
    const { value, type = "text", format } = item;

    if (value === null || value === undefined) {
      return <span className="text-gray-400">Not specified</span>;
    }

    if (format) {
      return <span className="text-white">{format(value)}</span>;
    }

    switch (type) {
      case "image":
        return (
          <div className="flex items-center space-x-4">
            <Image
              src={value as string}
              alt={item.label}
              width={64}
              height={64}
              className="rounded-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
        );
      
      case "boolean":
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}>
            {value ? "Yes" : "No"}
          </span>
        );
      
      case "array":
        return (
          <div className="flex flex-wrap gap-2">
            {(Array.isArray(value) ? value : [])?.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
              >
                {item}
              </span>
            ))}
          </div>
        );
      
      case "date":
        return (
          <span className="text-white">
            {new Date(value as string).toLocaleDateString()}
          </span>
        );
      
      default:
        return <span className="text-white">{String(value)}</span>;
    }
  };

  return (
    <Card className="w-full">
      {title && (
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={gridClass}>
        {items.map((item, index) => (
          <div key={index} className="space-y-1">
            <label className="text-sm font-medium text-gray-400">
              {item.label}
            </label>
            <div className="text-sm">
              {renderValue(item)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export { InfoSection, type InfoItem };