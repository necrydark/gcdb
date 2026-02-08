import { PrismaClient } from "@prisma/client";

/**
 * Singleton pattern for Prisma client to prevent multiple instances in development.
 * In production, a single instance is created and reused.
 * In development, the instance is cached on the global object to prevent hot-reloading issues.
 * 
 * @returns Prisma client instance
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * Database client singleton instance.
 * Use this import throughout the application for database operations.
 */
const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

// Cache the Prisma client in development to prevent creating multiple instances
if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = db;
}
