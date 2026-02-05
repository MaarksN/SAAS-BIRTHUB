import { LDRService } from '@salesos/prospector';
import { BDRService } from '@salesos/communication';

async function main() {
  console.log('--- Verifying Services ---');

  const ldr = new LDRService();
  const bdr = new BDRService();

  // 1. Test LDR Enrichment
  console.log('\n[LDR] Enriching CNPJ 12345678000199...');
  try {
    const enriched = await ldr.enrichCNPJ('12345678000199');
    console.log('[LDR] Result:', enriched.legalName, enriched.status);
  } catch (e) {
    console.error('[LDR] Error:', e);
  }

  // 2. Test BDR Validation
  console.log('\n[BDR] Validating Email...');
  const emailVal = await bdr.validateEmail('test@example.com');
  console.log('[BDR] Email Valid:', emailVal.isValid);

  const badEmail = await bdr.validateEmail('fake@tempmail.com');
  console.log('[BDR] Disposable Email Valid:', badEmail.isValid);

  console.log('\n--- Verification Complete ---');
}

main().catch(console.error);
