import { currentRole } from "@/src/utils/auth";
import { getCachedDashboardStats } from "@/src/lib/admin-queries";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface DashboardCard {
  title: string;
  value: number | string;
  extra?: React.ReactNode;
}

const AdminPage = async () => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN && role !== UserRole.OWNER) {
    redirect("/");
  }
  
  // Use optimized cached stats
  const stats = await getCachedDashboardStats();

  const cards: DashboardCard[] = [
    {
      title: "User Growth",
      value: stats.userGrowth.currentMonthUsers,
      extra: stats.userGrowth.percentageChange !== null && (
        <div className="mt-2 flex items-center">
          {stats.userGrowth.percentageChange > 0 ? (
            <>
              <ArrowUpIcon className="h-4 w-4 text-green-500" />
              <span className="text-xs text-muted-foreground font-medium">
                {stats.userGrowth.percentageChange}% from last month
              </span>
            </>
          ) : stats.userGrowth.percentageChange < 0 ? (
            <>
              <ArrowDownIcon className="h-4 w-4 text-red-500" />
              <span className="text-xs text-muted-foreground text-red-500">
                {Math.abs(stats.userGrowth.percentageChange)}% from last month
              </span>
            </>
          ) : (
            <span className="text-xs text-muted-foreground text-gray-500">
              No change from last month
            </span>
          )}
        </div>
      )
    },
    {
      title: "Total Characters",
      value: stats.counts.characters,
    },
    {
      title: "Total Relics",
      value: stats.counts.relics
    },
    {
      title: "Total Materials",
      value: stats.counts.materials
    },
    {
      title: "Total Food",
      value: stats.counts.food
    },
    {
      title: "Total Ingredients",
      value: stats.counts.ingredients
    },
  ];

  return (
    <div className="text-white px-10 container mx-auto py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl leading-tight font-extrabold pb-5">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Card 
            key={card.title} 
            className="bg-gradient-to-br from-card via-card to-muted/20 border-border/50 shadow-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <CardHeader>
              <CardTitle className="font-bold">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{card.value}</p>
              {card.extra}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;


