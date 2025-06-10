"use client";

import { Button } from "@/src/components/ui/button";
import { Download } from "lucide-react";
import { Materials } from "./columns"; // Make sure to adjust the import path as needed

interface ExportButtonProps {
  data: Materials[];
}

const ExportButton = ({ data }: ExportButtonProps) => {
  const handleExport = () => {
    // Convert data to CSV
    const headers = ["id", "name", "imageUrl", "location"];
    const csvContent = [
      headers.join(","),
      ...data.map(item => 
        headers.map(header => {
          // Handle commas and quotes in the data to ensure proper CSV format
          const value = item[header as keyof Materials];
          if (typeof value === 'string') {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(",")
      )
    ].join("\n");

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'enhance-materials.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="dark:hover:bg-purple-950 rounded-[5px] border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600"
      onClick={handleExport}
    >
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
  );
};

export default ExportButton;