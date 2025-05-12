import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const GearTable = ({ headers, data }: { headers: any[]; data: any[] }) => {
  return (
    <Table className="w-full text-sm  rtl:text-right even:text-white odd:text-black  font-bold">
      <TableHeader className="text-xs text-white uppercase bg-purple-50 dark:bg-purple-700 dark:text-white">
        <TableRow className="odd:bg-purple-400 odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 text-center even:dark:bg-purple-700 border-b dark:border-purple-700">
          {headers.map((header) => (
            <TableHead className="px-6 py-3" key={header}>
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            className="odd:bg-purple-400 odd:dark:bg-purple-900 odd:text-white even:text-black dark:even:text-white  border border-purple-500  even:bg-purple-50 text-center even:dark:bg-purple-700 border-b dark:border-purple-700"
          >
            <TableCell className="px-6 py-4" key={row.id}>
              {row.gearIcon}
            </TableCell>
            <TableCell className="px-6 py-4" key={row.id}>
              {row.jpName}
            </TableCell>
            <TableCell className="px-6 py-4" key={row.id}>
              {row.name}
            </TableCell>
            <TableCell className="px-6 py-4" key={row.id}>
              {row.set}
            </TableCell>
            <TableCell className="px-6 py-4" key={row.id}>
              {row.setBonus}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GearTable;
