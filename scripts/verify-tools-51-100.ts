
import { AEService } from '../libs/hub/src/services/ae.service';
import { OnboardingService } from '../libs/onboarding/src/services/onboarding.service';
import { CSService } from '../libs/customer-success/src/services/cs.service';
import { prisma } from '@salesos/database';

async function main() {
  console.log('--- Starting Verification of Tools 51-100 ---');

  const ae = new AEService();
  const onboarding = new OnboardingService();
  const cs = new CSService();

  try {
    // --- AE Verification ---
    console.log('\n[AE] 55. Generate Proposal');
    // Create dummy deal
    // @ts-ignore
    const company = await prisma.companyProfile.upsert({
        where: { cnpj: '99999999000199' },
        create: { cnpj: '99999999000199', name: 'Test Corp 2' },
        update: {}
    });
    // @ts-ignore
    const owner = await prisma.user.findFirst();
    if (!owner) {
        console.log('Skipping AE tests (no user found)');
        return;
    }

    // @ts-ignore
    const deal = await prisma.deal.create({
        data: {
            title: 'Big Deal',
            value: 50000,
            stage: 'Negotiation',
            probability: 80,
            companyId: company.id,
            ownerId: owner.id
        }
    });

    const proposal = await ae.generateProposal(deal.id, [{ name: 'License', price: 5000 }]);
    console.log('Proposal Value:', proposal.totalValue);

    console.log('[AE] 61. Forecast Deal');
    const forecast = await ae.forecastDeal(deal.id);
    console.log('Forecast Value:', forecast.value);

    // --- Onboarding Verification ---
    console.log('\n[Onboarding] 75. Auto Assign Tasks');
    // @ts-ignore
    const project = await prisma.onboardingProject.create({
        data: {
            companyId: company.id,
            name: 'Project Alpha',
            status: 'PLANNED',
            startDate: new Date(),
            targetGoLive: new Date()
        }
    });

    await onboarding.autoAssignTasks(project.id);
    // @ts-ignore
    const tasks = await prisma.implementationTask.findMany({ where: { projectId: project.id } });
    console.log('Tasks Created:', tasks.length);

    console.log('[Onboarding] 84. Check Readiness');
    const readiness = await onboarding.checkReadiness(project.id);
    console.log('Readiness:', readiness);

    // --- CS Verification ---
    console.log('\n[CS] 91. Calculate Health Score');
    const health = await cs.calculateHealthScore(company.id);
    console.log('Health Score:', health.score);

    console.log('[CS] 99. Generate QBR');
    const qbr = await cs.generateQBR(company.id);
    // @ts-ignore
    console.log('QBR Created:', qbr.summary);

  } catch (e) {
    console.error('Verification Failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
