"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchableColumns?: string[];
  className?: string;
}

export function UniversalDataTable<TData, TValue>({
  columns,
  data,
  searchableColumns = ["email", "username"],
  className = "",
}: DataTableProps<TData, TValue>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnFilters: searchTerm
        ? [
            {
              id: "global-search",
              value: searchTerm,
            },
          ]
        : [],
      columnVisibility,
    },
    getRowId: (row) => (row as any).id,
    globalFilterFn: (row, searchTerm, column) => {
      if (!searchTerm) return true;

      return searchableColumns.some((columnId) => {
        const value = (row as any)[columnId];
        return value && typeof value === "string"
          ? value.toLowerCase().includes(searchTerm.toLowerCase())
          : String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    },
  });

  const commonInputClass =
    "max-w-md border-purple-900 bg-purple-600 border-[2px] ring-0 focus:ring-0 rounded-[5px] placeholder:text-white text-white dark:bg-purple-800 focus:border-purple-900 focus-visible:ring-0";
  const commonButtonClass =
    "dark:hover:bg-purple-950 rounded-[5px] border-purple-900 bg-purple-400 border-[2px] hover:text-white dark:bg-purple-700 transition-all duration-250 hover:bg-purple-600";

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-5 pb-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder={`Search across ${searchableColumns.join(", ")}...`}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className={commonInputClass}
          />
          {searchTerm && (
            <Button
              onClick={() => setSearchTerm("")}
              className="h-fit rounded-[5px] transition-all duration-300"
            >
              Clear
            </Button>
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-[5px] transition-all duration-300">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-purple-400 dark:bg-purple-700"
            align="end"
          >
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize dark:hover:bg-purple-900 rounded-[5px] hover:bg-purple-600"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-[5px] border">
        <Table className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-center text-white" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-white"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          className="rounded-[5px] transition-all duration-300"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          size="sm"
          className="rounded-[5px] transition-all duration-300"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
