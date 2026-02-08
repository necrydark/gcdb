import { ColumnDef } from "@tanstack/react-table";
import { createActionsColumn } from "./data-table-actions";

interface ServerActionsColumnProps {
  viewPath?: string;
  editPath?: string;
  onDelete?: (id: string) => void;
}

// Server-side wrapper for actions column
export function createServerActionsColumn(props: ServerActionsColumnProps): ColumnDef<any> {
  // Defer to client-side component
  return createActionsColumn(props);
}