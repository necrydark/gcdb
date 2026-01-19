"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"; // Corrected import path
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"; // Corrected import path
import { Star } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("gear-sets")
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
  ]

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
  ]

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
  ]

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
  ]

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
  ]

  return (
    <main className="container mx-auto max-w-7xl pt-[7rem] p-5 space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-1 md:grid-cols-4 h-full w-full">
          <TabsTrigger
            value="gear-sets"
            className="text-black dark:text-white transition-all duration-300"
          >
            Gear Sets
          </TabsTrigger>
          <TabsTrigger
            value="gear-subsets"
            className="text-black dark:text-white transition-all duration-300"
          >
            Gear Subsets
          </TabsTrigger>
          <TabsTrigger
            value="main-base-0"
            className=" text-black dark:text-white  transition-all duration-300"
          >
            Main Base 0 <Star className="w-4 h-4 ml-1" />
          </TabsTrigger>
          <TabsTrigger
            value="main-base-5"
            className=" text-black dark:text-white   transition-all duration-300"
          >
            Main Base 5 <Star className="w-4 h-4 ml-1" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gear-sets" className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Gear Sets
          </h1>
          <div className="rounded-xl border border-border/50 shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50 dark:bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground">Gear</TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground">JP</TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground">EN</TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground">Set</TableHead>
                  <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground">Set Bonus</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gearData.map((gear, idx) => (
                  <TableRow key={gear.id} className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                    <TableCell className="px-6 py-4 font-medium text-foreground">{gear.gearIcon}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{gear.jpName}</TableCell>
                    <TableCell className="px-6 py-4 text-foreground">{gear.name}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{gear.set}</TableCell>
                    <TableCell className="px-6 py-4 text-foreground">{gear.setBonus}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="gear-subsets" className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 ">
            Gear Substats
          </h1>
          <div className="rounded-xl border border-border/50 shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50 dark:bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  {subStatsColumns.map((col) => (
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground" key={col.key}>
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Bracelet & Ring */}
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell rowSpan={4} className="px-6 py-4 font-medium text-foreground border-r border-border/50">
                    Bracelet &amp; Ring / 腕輪 &amp; リング
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground">Attack / 攻撃力</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">1% - 3%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Pierce Rate / 貫通率</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">2% - 6%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Crit Chance / クリティカル確率</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">1.5% - 4.5%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Crit Damage / クリティカルダメージ</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">2% - 6%</TableCell>
                </TableRow>

                {/* Necklace & Earrings */}
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell rowSpan={4} className="px-6 py-4 font-medium text-foreground border-r border-border/50">
                    Necklace &amp; Earrings / 首飾り &amp; 耳飾り
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground">Defense / 防御力</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">1% - 3%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Resistance / 忍耐率</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">2% - 6%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Crit Resistance / クリティカル耐性</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">1.5% - 4.5%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Crit Defense / クリティカル防御</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">2% - 6%</TableCell>
                </TableRow>

                {/* Belt & Rune */}
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell rowSpan={4} className="px-6 py-4 font-medium text-foreground border-r border-border/50">
                    Belt &amp; Rune / ベルト &amp; ルーン
                  </TableCell>
                  <TableCell className="px-6 py-4 text-foreground">HP</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">1% - 3%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Regeneration / 再生率</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">2% - 6%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Recovery / 回復率</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">2% - 6%</TableCell>
                </TableRow>
                <TableRow className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                  <TableCell className="px-6 py-4 text-foreground">Lifesteal / HP吸収率</TableCell>
                  <TableCell className="px-6 py-4 text-muted-foreground">1.5% - 4.5%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="main-base-0" className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 ">
            Main Stat Base Stats (0★)
          </h1>
          <div className="rounded-xl border border-border/50 shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50 dark:bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground" key={column.key}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {baseStats.map((row) => (
                  <TableRow key={row.key} className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                    <TableCell className="px-6 py-4 font-medium text-foreground">{row.equipment}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{row.mainStat}</TableCell>
                    <TableCell className="px-6 py-4 text-foreground">{row.C}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{row.R}</TableCell>
                    <TableCell className="px-6 py-4 text-foreground">{row.SR}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{row.SSR}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="main-base-5" className="mt-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Main Stat Max Stats (5★ +5)
          </h1>
          <div className="rounded-xl border border-border/50 shadow-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50 dark:bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  {columns.map((column) => (
                    <TableHead className="px-6 py-3 text-left text-sm font-semibold text-foreground" key={column.key}>
                      {column.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {maxStats.map((row) => (
                  <TableRow key={row.key} className="even:bg-card odd:bg-muted/20 hover:bg-muted/40 transition-colors">
                    <TableCell className="px-6 py-4 font-medium text-foreground">{row.equipment}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{row.mainStat}</TableCell>
                    <TableCell className="px-6 py-4 text-foreground">{row.C}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{row.R}</TableCell>
                    <TableCell className="px-6 py-4 text-foreground">{row.SR}</TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">{row.SSR}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
