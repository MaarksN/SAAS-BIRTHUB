import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  // datasourceUrl is deprecated in Prisma 7, use constructor args if needed or env vars directly
  // datasources: { db: { url: ... } }
});

export default prisma;
