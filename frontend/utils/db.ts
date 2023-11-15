import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = new PrismaClient().$extends(withAccelerate())

let prisma: PrismaClient;

const globalForPrisma = global as any;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // In development, use a global singleton to avoid multiple instances in hot-reloading
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient().$extends(withAccelerate());
  }
  prisma = globalForPrisma.prisma;
}

export { prisma };
