import db from "@/src/lib/db";
import { Prisma } from "@prisma/client";

// Simple data fetch without complex typing issues
export async function getPaginatedData<T>({
  model,
  page = 1,
  limit = 10,
  where = {},
  include = {},
  select = {},
}: {
  model: any;
  page?: number;
  limit?: number;
  where?: any;
  include?: any;
  select?: any;
}) {
  const skip = (page - 1) * limit;
  
  const findManyOptions: any = {
    where,
    skip,
    take: limit,
  };

  if (Object.keys(include).length > 0) {
    findManyOptions.include = include;
  }
  
  if (Object.keys(select).length > 0) {
    findManyOptions.select = select;
  }
  
  const [data, total] = await Promise.all([
    model.findMany(findManyOptions),
    model.count({ where }),
  ]);

  return {
    data,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

// Alternative function with explicit orderBy for models that support it
export async function getPaginatedDataWithOrder<T>({
  model,
  page = 1,
  limit = 10,
  where = {},
  orderBy = { createdAt: "desc" },
  include = {},
  select = {},
}: {
  model: any;
  page?: number;
  limit?: number;
  where?: any;
  orderBy?: any;
  include?: any;
  select?: any;
}) {
  const skip = (page - 1) * limit;
  
  const findManyOptions: any = {
    where,
    orderBy,
    skip,
    take: limit,
  };

  if (Object.keys(include).length > 0) {
    findManyOptions.include = include;
  }
  
  if (Object.keys(select).length > 0) {
    findManyOptions.select = select;
  }
  
  const [data, total] = await Promise.all([
    model.findMany(findManyOptions),
    model.count({ where }),
  ]);

  return {
    data,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  };
}

// Cached dashboard stats with proper typing
export interface DashboardStats {
  userGrowth: {
    currentMonthUsers: number;
    percentageChange: number | null;
  };
  counts: {
    characters: number;
    relics: number;
    materials: number;
    food: number;
    ingredients: number;
  };
}

export async function getCachedDashboardStats(): Promise<DashboardStats> {
  // Implement Redis or similar caching here
  // For now, using parallel queries to reduce round trips
  const { getUserGrowthStats } = await import("@/src/actions/get-user-stats");
  
  const [
    userGrowth,
    characters,
    relics,
    materials,
    food,
    ingredients,
  ] = await Promise.all([
    getUserGrowthStats(),
    db.character.count(),
    db.holyRelic.count(),
    db.material.count(),
    db.food.count(),
    db.ingredient.count(),
  ]);

  return {
    userGrowth,
    counts: {
      characters,
      relics,
      materials,
      food,
      ingredients,
    },
  };
}