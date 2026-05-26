import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  dbTested: boolean | undefined;
};

// Check if DATABASE_URL is configured and accessible
function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  // In serverless environments (Vercel, etc.), file-based SQLite won't work
  if (url.startsWith("file:") && process.env.VERCEL) return false;
  return true;
}

let _prisma: PrismaClient | null = null;
let _dbAvailable = false;

if (isDatabaseConfigured()) {
  _prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: ["error"],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _prisma;

  // Test connection asynchronously — set flag on success/failure
  _prisma
    .$connect()
    .then(() => {
      _dbAvailable = true;
    })
    .catch((err: Error) => {
      console.warn("[Prisma] Database connection failed:", err.message);
      _dbAvailable = false;
    });
} else {
  console.warn(
    "[Prisma] Database not configured for this environment. API routes will return mock/empty data."
  );
}

export const prisma = _prisma;
export const isDbAvailable = (): boolean => _dbAvailable;
