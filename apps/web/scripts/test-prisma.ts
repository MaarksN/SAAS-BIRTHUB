import { prisma } from '@salesos/database';

async function main() {
  console.log('Prisma instance:', prisma);
  try {
    const users = await prisma.user.findMany();
    console.log('Users:', users);
  } catch (e) {
    console.error(e);
  }
}

main();
