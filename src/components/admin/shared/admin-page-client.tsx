'use client';

import { ReactNode } from "react";
import { UniversalDataTable } from "@/src/components/admin/shared/universal-data-table";
import { AdminPageHeader } from "@/src/components/admin/shared/admin-layout-components";
import ExportButton from "@/src/components/admin/shared/export-button";
import { ColumnDef } from "@tanstack/react-table";

interface AdminPageClientProps<TData = any> {
  title: string;
  description: string;
  actionText: string;
  actionHref: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  searchableColumns?: string[];
  exportHeaders?: string[];
  children?: ReactNode;
}

export function AdminPageClient<TData = any>({
  title,
  description,
  actionText,
  actionHref,
  data,
  columns,
  searchableColumns = ["name"],
  exportHeaders,
  children,
}: AdminPageClientProps<TData>) {
  // Generate default headers from data keys if not provided
  const defaultHeaders = data.length > 0 ? Object.keys(data[0] as any) : [];
  
  return (
    <div className="px-10 container mx-auto py-20">
      <AdminPageHeader
        title={title}
        description={description}
        actionText={actionText}
        actionHref={actionHref}
      >
        {children || (
          <ExportButton data={data} headers={exportHeaders || defaultHeaders} />
        )}
      </AdminPageHeader>
      
      <UniversalDataTable 
        columns={columns} 
        data={data}
        searchableColumns={searchableColumns}
      />
    </div>
  );
}