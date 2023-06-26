import { PrismaClient } from '@prisma/client';

export let prisma: PrismaClient;

export function connectDb(): void {
  if (!prisma) {
    prisma = new PrismaClient();
  }
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}