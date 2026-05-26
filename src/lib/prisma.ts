import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ─── Serverless-safe Prisma Client ──────────────────────────────────────────
// Key fixes for serverless deployment:
// 1. No top-level side effects (no $connect() at import time)
// 2. Lazy singleton — client is created only when first accessed
// 3. Detects serverless environments and skips file-based SQLite
// 4. API routes must call ensureConnection() before using prisma

function isServerless(): boolean {
  // Vercel sets VERCEL=1 automatically (don't rely on .env)
  if (process.env.VERCEL === "1") return true;
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return true;
  if (process.env.NETLIFY === "true") return true;
  if (process.env.CF_PAGES) return true;
  // Alibaba Cloud / Tencent Cloud function compute
  if (process.env.ALIYUN_FC) return true;
  if (process.env.TENCENTSCF) return true;
  return false;
}

function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url) return false;
  // In serverless environments, file-based SQLite won't work
  if (url.startsWith("file:") && isServerless()) return false;
  return true;
}

// Lazy singleton — only create when accessed
let _prisma: PrismaClient | null = null;
let _connectionPromise: Promise<void> | null = null;

function createPrismaClient(): PrismaClient {
  if (_prisma) return _prisma;

  _prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error"] : ["error"],
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });

  // In development, cache on global to survive hot reloads
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = _prisma;
  }

  return _prisma;
}

/**
 * Get the Prisma client instance.
 * Returns null if the database is not configured (e.g., SQLite on serverless).
 */
export function getPrisma(): PrismaClient | null {
  if (!isDatabaseConfigured()) return null;
  return createPrismaClient();
}

/**
 * Ensure the database connection is ready before using it.
 * Call this at the start of each API route handler.
 * Returns the PrismaClient if available, or null if DB is not configured.
 */
export async function ensureConnection(): Promise<PrismaClient | null> {
  if (!isDatabaseConfigured()) return null;

  const client = createPrismaClient();

  // Only connect once — reuse the promise for concurrent requests
  if (!_connectionPromise) {
    _connectionPromise = client.$connect().catch((err: Error) => {
      console.error("[Prisma] Connection failed:", err.message);
      _connectionPromise = null; // Allow retry on next request
      throw err;
    });
  }

  await _connectionPromise;
  return client;
}

/**
 * Check if the database is available (non-blocking check).
 * For a reliable check, use ensureConnection() instead.
 */
export function isDbAvailable(): boolean {
  return isDatabaseConfigured() && _connectionPromise !== null;
}

// Backward compatibility — export as `prisma` (may be null)
export const prisma = getPrisma();
