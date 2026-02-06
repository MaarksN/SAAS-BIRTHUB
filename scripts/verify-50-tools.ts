
import { LDRService } from '../libs/prospector/src/services/ldr.service';
import { BDRService } from '../libs/communication/src/services/bdr.service';
import { SDRService } from '../libs/hub/src/services/sdr.service';
import { prisma } from '@salesos/database';

async function main() {
  console.log('--- Starting Verification of 50 AI Tools ---');

  const ldr = new LDRService();
  const bdr = new BDRService();
  const sdr = new SDRService();

  try {
    // --- LDR Verification ---
    console.log('\n[LDR] 1. Enrich CNPJ');
    const enriched = await ldr.enrichCNPJ('12345678000199');
    console.log('Enriched:', enriched.legalName, enriched.status);

    console.log('[LDR] 3. Calculate Reliability');
    // @ts-ignore
    const company = await prisma.companyProfile.findUnique({ where: { cnpj: '12345678000199' } });
    if (company) {
      const score = await ldr.calculateReliabilityScore(company.id);
      console.log('Reliability Score:', score.overallScore);
    }

    console.log('[LDR] 4. Detect Inactive');
    const inactive = await ldr.detectInactiveCompany('12345678000199');
    console.log('Is Inactive:', inactive.isInactive);

    // --- BDR Verification ---
    console.log('\n[BDR] 21. Map Buying Committee');
    if (company) {
      const committee = await bdr.mapBuyingCommittee(company.id);
      console.log('Committee Contacts:', committee.contacts.length);

      const cto = committee.contacts.find(c => c.role === 'CTO');
      if (cto) {
          console.log('Found CTO:', cto.name);
      }
    }

    console.log('[BDR] 24. Validate Email');
    const emailVal = await bdr.validateEmail('cto@mock.com');
    console.log('Email Valid:', emailVal.isValid);

    console.log('[BDR] 36. Generate Sequence');
    const seq = await bdr.generateSequence({ role: 'CTO' });
    // @ts-ignore
    console.log('Sequence Created:', seq.name, 'Steps:', seq.steps.length);

    // --- SDR Verification ---
    console.log('\n[SDR] 41. Score Lead');
    // Create dummy lead
    const lead = await prisma.lead.create({
        data: {
            email: 'lead@test.com',
            companyName: 'Test Corp',
            status: 'NEW'
        }
    });
    // Add mock scores
    // @ts-ignore
    await prisma.leadScore.create({
        data: {
            leadId: lead.id,
            score: 50,
            reason: 'High Intent'
        }
    });

    const scoredLead = await sdr.scoreLead(lead.id);
    console.log('Lead Score:', scoredLead.score);

    console.log('[SDR] 44. Get Cadence');
    const cadence = await sdr.getCadence(lead.id);
    // @ts-ignore
    console.log('Cadence Assigned:', cadence.name);

    console.log('[SDR] 46. Handle Objection');
    const obj = await sdr.handleObjection("It's too expensive");
    console.log('Objection Response:', obj.response);

  } catch (e) {
    console.error('Verification Failed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
