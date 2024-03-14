"use server";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";

function MaxStatsTable() {
  const columns = [
    {
      key: "equipment",
      label: "equipment",
    },
    {
      key: "Main Stat",
      label: "mainStat",
    },
    {
      key: "C",
      label: "C",
    },
    {
      key: "R",
      label: "R",
    },
    {
      key: "SR",
      label: "SR",
    },
    {
      key: "SSR",
      label: "SSR",
    },
  ];

  const maxStats = [
    {
      key: 1,
      equipment: "Bracelet",
      mainStat: "Attack",
      C: "210-240",
      UC: "300-340",
      R: "380-540",
      SR: "750-840",
      SSR: "1110-1240",
    },
    {
      key: 2,
      equipment: "Ring",
      mainStat: "Attack",
      C: "120-140",
      UC: "181-200",
      R: "271-300",
      SR: "375-420",
      SSR: "570-640",
    },
    {
      key: 3,
      equipment: "Necklace",
      mainStat: "Defense",
      C: "105-120",
      UC: "181-200",
      R: "271-300",
      SR: "135-180",
      SSR: "555-620",
    },
    {
      key: 4,
      equipment: "Earrings",
      mainStat: "Defense",
      C: "60-70",
      UC: "98-110",
      R: "143-160",
      SR: "195-220",
      SSR: "285-320",
    },
    {
      key: 5,
      equipment: "Belt",
      mainStat: "HP",
      C: "2100-2400",
      UC: "3000-3400",
      R: "4800-5400",
      SR: "7500-8400",
      SSR: "11100-12400",
    },
    {
      key: 6,
      equipment: "Rune",
      mainStat: "HP",
      C: "1200-1400",
      UC: "1650-1900",
      R: "2550-2900",
      SR: "3900-4400",
      SSR: "5700-6400",
    },
  ];
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={maxStats}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default MaxStatsTable;
