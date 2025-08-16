import { PrismaClient } from '@prisma/client';

let _client: PrismaClient | null = null;

export const prisma = () => {
  if (!_client) {
    _client = new PrismaClient();
  }
  return _client;
};
