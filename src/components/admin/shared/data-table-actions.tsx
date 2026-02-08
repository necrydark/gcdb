"use client";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface DataTableActionsProps {
  viewPath?: string;
  editPath?: string;
  onDelete?: (id: string) => void;
}

// Client component for actions
function ActionsDropdown({ item, props }: { item: any; props: DataTableActionsProps }) {
  const handleCopyId = () => {
    navigator.clipboard.writeText(item.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="dark:hover:bg-purple-950 bg-purple-600 dark:bg-purple-900 border-purple-400 border-[2px] rounded-[5px] hover:text-white hover:bg-purple-700"
        >
          <MoreHorizontal className="text-white" size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-purple-400 text-white dark:bg-purple-700">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
          onClick={handleCopyId}
        >
          Copy ID
        </DropdownMenuItem>
        {props.viewPath && (
          <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600" asChild>
            <Link href={`${props.viewPath}/${item.id}`}>View</Link>
          </DropdownMenuItem>
        )}
        {props.editPath && (
          <DropdownMenuItem className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600" asChild>
            <Link href={`${props.editPath}/${item.id}`}>Edit</Link>
          </DropdownMenuItem>
        )}
        {props.onDelete && (
          <DropdownMenuItem
            className="cursor-pointer dark:focus:bg-purple-900 rounded-[5px] focus:text-white focus:bg-purple-600"
            onClick={() => props.onDelete?.(item.id)}
          >
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Export a ColumnDef that can be used in server components
export const createActionsColumn = (props: DataTableActionsProps): ColumnDef<any> => {
  return {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionsDropdown item={row.original} props={props} />;
    },
  };
};