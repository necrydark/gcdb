'use client'
import MaxStatsTable from "@/src/components/Tables/maxStats";
import GearTable from "@/src/components/Tables/table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Star } from "lucide-react";
import React, { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("gear-sets");
  const gearData = [
    {
      id: 1,
      gearIcon: "ONSLAUGHT/ATTACK",
      name: "ONSLAUGHT/ATTACK",
      jpName: "猛攻",
      set: "4",
      setBonus: "+20% ATK",
    },
    {
      id: 2,
      gearIcon: "DEF",
      name: "IRON WALL/DEFENSE",
      jpName: "鉄壁",
      set: "2",
      setBonus: "+20% DEF",
    },
    {
      id: 3,
      gearIcon: "HP",
      name: "LIFE/HP",
      jpName: "生命",
      set: "4",
      setBonus: "+20% HP",
    },
    {
      id: 4,
      gearIcon: "Crit Rate",
      jpName: "集中",
      name: "CONCENTRATION/CRIT RATE",
      set: "4",
      setBonus: "+30% CR",
    },
    {
      id: 5,
      gearIcon: "Crit Res",
      jpName: "心眼",
      name: "MIND'S EYE/CRIT RESISTANCE",
      set: "2",
      setBonus: "+30% CRIT RES",
    },
    {
      id: 6,
      gearIcon: "Rec",
      jpName: "回復",
      name: "RECOVERY",
      set: "2",
      setBonus: "+20% REC",
    },
    {
      id: 7,
      gearIcon: "Crit DMG",
      jpName: "会心",
      name: "CONGENIALITY/CRIT DAMAGE",
      set: "2",
      setBonus: "+20% CDMG",
    },
    {
      id: 8,
      gearIcon: "CRIT DEF",
      jpName: "不屈",
      name: "FORTITUDE/CRIT DEF",
      set: "2",
      setBonus: "+40% CRIT DEF",
    },
    {
      id: 9,
      gearIcon: "LIFESTEAL",
      name: "LIFESTEAL",
      jpName: "吸血",
      set: "2",
      setBonus: "+15% LIFESTEAL",
    },
  ];

  const columns = [
    {
      key: "equipment",
      label: "Equipment",
    },
    {
      key: "Main Stat",
      label: "Main Stat",
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

  const baseStats = [
    {
      key: 1,
      equipment: "Bracelet",
      mainStat: "Attack",
      C: "90-120",
      UC: "120-160",
      R: "180-240",
      SR: "270-360",
      SSR: "390-520",
    },
    {
      key: 2,
      equipment: "Ring",
      mainStat: "Attack",
      C: "60-80",
      UC: "75-100",
      R: "105-140",
      SR: "150-200",
      SSR: "210-280",
    },
    {
      key: 3,
      equipment: "Necklace",
      mainStat: "Defense",
      C: "45-60",
      UC: "61-80",
      R: "91-120",
      SR: "135-180",
      SSR: "195-260",
    },
    {
      key: 4,
      equipment: "Earrings",
      mainStat: "Defense",
      C: "30-40",
      UC: "38-50",
      R: "53-70",
      SR: "75-100",
      SSR: "105-140",
    },
    {
      key: 5,
      equipment: "Belt",
      mainStat: "HP",
      C: "900-1200",
      UC: "1200-1600",
      R: "1800-2400",
      SR: "2700-3600",
      SSR: "3900-5200",
    },
    {
      key: 6,
      equipment: "Rune",
      mainStat: "HP",
      C: "600-800",
      UC: "750-1000",
      R: "1050-1400",
      SR: "1500-2000",
      SSR: "2100-2800",
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

  const subStatsColumns = [
    {
      key: "substat",
      label: "Substat EN/JP",
    },
    {
      key: "GearPiece",
      label: "Gear Piece EN/JP",
    },
    {
      key: "MinMaxRolls",
      label: "Min Max Rolls",
    },
  ];
  const subStatList = [
    {
      gearPiece: "Attack",
      gearPieceJP: "攻撃力",
      minMaxRolls: "1% - 3%",
    },
  ];


  return (
    <div className="container mx-auto max-w-7xl pt-[7rem] p-5 space-y-5">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 bg-purple-400 h-full w-full rounded-[5px] text-white">
          <TabsTrigger value="gear-sets" className={activeTab === "gear-sets" ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent"}>Gear Sets</TabsTrigger>
          <TabsTrigger value="gear-subsets" className={activeTab === "gear-subsets"  ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent"}>Gear Subsets</TabsTrigger>
          <TabsTrigger value="main-base-0" className={activeTab === "main-base-0" ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent"}>Main Base 0 <Star className="w-4 h-4 pl-1" /></TabsTrigger>
          <TabsTrigger value="main-base-5" className={activeTab === "main-base-5" ? "data-[state=active]:bg-purple-600 data-[state=active]:text-white" : "bg-transparent"}>Main Base 5 <Star className="w-4 h-4 pl-1" /></TabsTrigger>

        </TabsList>
     
     <TabsContent value="gear-sets">
     <div>
      <h1 className="text-3xl pt-4 font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">Gear Sets</h1>
      <GearTable
        headers={["Gear", "JP", "EN", "Set", "Set Bonus"]}
        data={gearData}
      />
      </div>
     </TabsContent>

      <TabsContent value="gear-subsets">
      <div>
        {/* TODO: Make table unique */}
        <h1 className="text-3xl  pt-4 font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">Gear Substats</h1>

        <table className="w-full text-sm mt-[15px] rtl:text-right text-white font-bold">
          <thead className="text-xs text-purple-700 uppercase bg-purple-50 dark:bg-purple-700 dark:text-purple-400">
            <tr className="dark:text-white text-purple-600">
              {subStatsColumns.map((col) => {
                return (
                  <th className="px-6 py-3" key={col.key}>
                    {col.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td
                rowSpan={4}
                className="border-r-1 border-purple-500 dark:border-purple-600"
              >
                Bracelet &amp; Ring / 腕輪 &amp; リング
              </td>
              <td className="px-6 py-4">Attack / 攻撃力</td>
              <td className="px-6 py-4">1% - 3%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900 text-purple-900 dark:text-white  border border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Pierce Rate / 貫通率</td>
              <td className="px-6 py-4">2% - 6%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Crit Chance / クリティカル確率</td>
              <td className="px-6 py-4">1.5% - 4.5%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border text-purple-900 dark:text-white border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Crit Damage / クリティカルダメージ</td>
              <td className="px-6 py-4">2% - 6%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td
                rowSpan={4}
                className="border-r-1 border-purple-500 dark:border-purple-600"
              >
                Necklace &amp; Earrings / 首飾り &amp; 耳飾り
              </td>
              <td className="px-6 py-4">Defense / 防御力</td>
              <td className="px-6 py-4">1% - 3%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500 text-purple-900 dark:text-white  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Resistance / 忍耐率</td>
              <td className="px-6 py-4">2% - 6%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Crit Resistance / クリティカル耐性</td>
              <td className="px-6 py-4">1.5% - 4.5%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 text-purple-900 dark:text-white even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Crit Defense / クリティカル防御</td>
              <td className="px-6 py-4">2% - 6%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td
                rowSpan={4}
                className="border-r-1 border-purple-500 dark:border-purple-600"
              >
                Belt &amp; Rune / ベルト &amp; ルーン
              </td>
              <td className="px-6 py-4">HP</td>
              <td className="px-6 py-4">1% - 3%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500 text-purple-900 dark:text-white  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Regeneration / 再生率</td>
              <td className="px-6 py-4">2% - 6%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Recovery / 回復率</td>
              <td className="px-6 py-4">2% - 6%</td>
            </tr>
            <tr className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500 text-purple-900 dark:text-white  even:bg-purple-50 even:dark:bg-purple-700 border-b dark:border-purple-600">
              <td className="px-6 py-4">Lifesteal / HP吸収率</td>
              <td className="px-6 py-4">1.5% - 4.5%</td>
            </tr>
          </tbody>
        </table>
      </div>

      </TabsContent>
    <TabsContent value="main-base-0">
    <div>
        <h1 className="text-3xl  pt-4 font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">Main Stat Base Stats (0★)</h1>
        <Table className="w-full text-sm mt-[15px]  rtl:text-right text-purple-700 dark:text-white font-bold">
          <TableHeader className="text-xs text-purple-700 uppercase bg-purple-300 dark:bg-purple-700 dark:text-purple-400">
            <TableRow className="odd:bg-purple-400 odd:dark:bg-purple-900 text-white   border border-purple-500  even:bg-purple-300 even:dark:bg-purple-700 border-b dark:border-purple-700">
              {columns.map((column) => (
                <TableHead className="px-6 py-3 text-white" key={column.key}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {baseStats.map((row) => (
              <TableRow 
                key={row.key}
                className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-white even:dark:bg-purple-700 border-b dark:border-purple-600"
              >
                <TableCell className="px-6 py-4">{row.equipment}</TableCell>
                <TableCell className="px-6 py-4">{row.mainStat}</TableCell>
                <TableCell className="px-6 py-4">{row.C}</TableCell>
                <TableCell className="px-6 py-4">{row.R}</TableCell>
                <TableCell className="px-6 py-4">{row.SR}</TableCell>
                <TableCell className="px-6 py-4">{row.SSR}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>

    <TabsContent value="main-base-5">
    <div>
        <h1 className="text-3xl  pt-4 font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-white">Main Stat Max Stats (5★ +5)</h1>
        <Table className="w-full text-sm mt-[15px]  rtl:text-right text-purple-700 dark:text-white font-bold">
          <TableHeader className="text-xs text-purple-700 uppercase bg-purple-300 dark:bg-purple-700 dark:text-purple-400">
            <TableRow className="odd:bg-purple-400 odd:dark:bg-purple-900 text-white   border border-purple-500  even:bg-purple-300 even:dark:bg-purple-700 border-b dark:border-purple-700">
              {columns.map((column) => (
                <TableHead className="px-6 py-3 text-white" key={column.key}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {maxStats.map((row) => (
              <TableRow
                key={row.key}
                className="odd:bg-purple-400 text-center odd:dark:bg-purple-900  border border-purple-500  even:bg-white even:dark:bg-purple-700 border-b dark:border-purple-600"
              >
                <TableCell className="px-6 py-4">{row.equipment}</TableCell>
                <TableCell className="px-6 py-4">{row.mainStat}</TableCell>
                <TableCell className="px-6 py-4">{row.C}</TableCell>
                <TableCell className="px-6 py-4">{row.R}</TableCell>
                <TableCell className="px-6 py-4">{row.SR}</TableCell>
                <TableCell className="px-6 py-4">{row.SSR}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
    </Tabs>

      {/* <MaxStatsTable /> */}
    </div>
  );
}

