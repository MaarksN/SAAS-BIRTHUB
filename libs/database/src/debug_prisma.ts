import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log(Object.keys(prisma));
// This won't show model properties as they are lazy loaded or on prototype,
// but checking d.ts would be better.
