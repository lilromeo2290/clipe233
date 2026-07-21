import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// ─── Serverless-safe Prisma Client (legacy compat) ──────────────────────────
// Prefer using @/lib/prisma which has lazy initialization.
// This file is kept for backward compatibility.

function isServerless(): boolean {
  if (process.env.VERCEL === "1") return true
  if (process.env.AWS_LAMBDA_FUNCTION_NAME) return true
  if (process.env.NETLIFY === "true") return true
  return false
}

function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL
  if (!url) return false
  if (url.startsWith("file:") && isServerless()) return false
  return true
}

// Only create client if DB is configured
export const db = isDatabaseConfigured()
  ? (globalForPrisma.prisma ?? new PrismaClient({ log: ['error'] }))
  : null

if (db && process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}
