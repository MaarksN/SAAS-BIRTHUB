import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Seed...');

  // 1. Create Organization
  const org = await prisma.organization.create({
    data: {
      name: 'Acme Corp',
      plan: 'ENTERPRISE',
    },
  });
  console.log(`✅ Created Org: ${org.name}`);

  // 2. Create User
  const user = await prisma.user.create({
    data: {
      email: 'admin@salesos.com',
      name: 'Admin User',
      role: 'ADMIN',
      organizationId: org.id,
    },
  });
  console.log(`✅ Created User: ${user.email}`);

  // 3. Create Leads
  await prisma.lead.createMany({
    data: [
      {
        organizationId: org.id,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@tech.com',
        companyName: 'Tech Inc',
        status: 'NEW',
        score: 45
      },
      {
        organizationId: org.id,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@fintech.com',
        companyName: 'Fintech Solutions',
        status: 'QUALIFIED',
        score: 88
      }
    ]
  });
  console.log(`✅ Created Leads`);

  // 4. Create Deals
  await prisma.deal.create({
    data: {
      organizationId: org.id,
      ownerId: user.id,
      title: 'Enterprise License - Tech Inc',
      value: 50000,
      stage: 'NEGOTIATION',
      probability: 70
    }
  });
  console.log(`✅ Created Deal`);

  console.log('🚀 Seed Completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
