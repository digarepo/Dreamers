import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__db) {
    global.__db = new PrismaClient()
  }
  prisma = global.__db
}

export { prisma }

// Query helper for raw SQL
export async function query(sql: string, params?: any[]) {
  if (params && params.length > 0) {
    return prisma.$queryRawUnsafe(sql, ...params);
  } else {
    return prisma.$queryRawUnsafe(sql);
  }
}
