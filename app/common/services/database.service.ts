import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

/**
 * Singleton instance to connect to database
 */
export const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') globalForPrisma.prisma = prisma
