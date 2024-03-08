import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Function to initialize and return the Prisma client
function initPrisma() {
  const prisma = new PrismaClient();
  return prisma;
}

const db = globalThis.prisma || initPrisma();

// Only initialize Prisma if it's not already defined
if (!globalThis.prisma) {
  globalThis.prisma = db;
}

export default db;
