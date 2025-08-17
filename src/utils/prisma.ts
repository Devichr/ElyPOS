import { PrismaClient } from '../generated/prisma'

export const prisma = new PrismaClient()

// (Opsional) tangani graceful shutdown saat bun dev dihentikan
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})