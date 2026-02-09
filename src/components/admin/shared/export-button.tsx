'use client'

import { Download } from "lucide-react";
import { Button } from "../../ui/button";

interface ExportButtonProps {
    data: any[];
    headers: string[];
}

const ExportButton = ({ data, headers}: ExportButtonProps) => {
    const handleExport= () => {
        const csvContent = [
            headers.join(","),
            ...data.map(item => 
                headers.map(header => {
                    const value = item[header as keyof any];
                    if(typeof value === 'string') {
                        return `"${value.replace(/"/g, '""')}"`;
                    }
                    return value;
                }).join(",")
            )
        ].join("\n")



        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute('href', url);
        link.setAttribute("download", "exported-data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
            <Button 
      size="sm" 
      onClick={handleExport}
    >
      <Download className="mr-2 h-4 w-4" />
      Export
    </Button>
    )

}

export default ExportButton;
