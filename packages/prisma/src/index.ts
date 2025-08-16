import { PrismaClient } from '@prisma/client';

let client: PrismaClient | undefined;

export function prisma() {
  if (!client) client = new PrismaClient();
  return client;
}

export * from '@prisma/client';
