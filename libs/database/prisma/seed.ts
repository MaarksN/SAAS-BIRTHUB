import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Seed...');

  const org = await prisma.organization.create({
    data: { name: 'Acme Corp', plan: 'ENTERPRISE' },
  });

  const user = await prisma.user.create({
    data: { email: 'admin@salesos.com', name: 'Admin', role: 'ADMIN', organizationId: org.id },
  });

  await prisma.pipeline.create({
    data: {
      name: 'Default Pipeline',
      stages: ["Discovery", "Demo", "Negotiation", "Closed Won"]
    }
  });

  await prisma.product.create({
    data: {
      organizationId: org.id,
      name: 'SalesOS License',
      price: 1000
    }
  });

  console.log('🚀 Seed Completed!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
