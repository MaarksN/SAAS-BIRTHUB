'use client';

import React, { useEffect } from 'react';
import { LinkedInAutomation, EnrichmentService } from '@salesos/social';
import { AuditService, WhiteLabelService } from '@salesos/enterprise';
import { ReferralSystem, CollaborationService, OnboardingService } from '@salesos/growth';
import { CommandPalette, ZeroInbox, usePredictivePrefetch } from '@salesos/ui';
import { mockUser } from '@salesos/auth';

export default function Page() {
  // Cycle 16
  const linkedIn = new LinkedInAutomation();
  const enrichment = new EnrichmentService();

  // Cycle 17
  const audit = new AuditService();
  const branding = new WhiteLabelService();

  // Cycle 19
  const referral = new ReferralSystem();
  const collab = new CollaborationService();
  const onboarding = new OnboardingService();

  // Cycle 20 (Hook)
  const prefetchData = usePredictivePrefetch(async () => {
    return "Prefetched Data Loaded!";
  }, '.prefetch-trigger');

  useEffect(() => {
    collab.updatePresence(mockUser.id, '/dashboard');
    branding.updateConfig({ companyName: 'My Agency' });
  }, []);

  const commands = [
    { id: '1', name: 'Go to Dashboard', action: () => alert('Going to dashboard') },
    { id: '2', name: 'Create Lead', action: () => alert('Creating lead') },
    { id: '3', name: 'Start Tour', action: () => console.log(onboarding.getTour('home')) },
  ];

  const tasks = [
    { id: '1', title: 'Review new leads', done: false },
    { id: '2', title: 'Email follow-up', done: false },
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{branding.getConfig().companyName} - Cycles 16-20 Demo</h1>

      <section style={{ marginBottom: '20px' }}>
        <h2>Cycle 16: Social Selling</h2>
        <button onClick={() => enrichment.enrichProfile('jules', 'linkedin')}>
          Enrich Profile (Check Console)
        </button>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Cycle 19: Growth</h2>
        <p>Referral Code: {referral.generateCode(mockUser.id)}</p>
        <p>Active User: {mockUser.name} ({mockUser.role})</p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h2>Cycle 20: Polish</h2>
        <div className="prefetch-trigger" style={{ padding: '10px', border: '1px solid #ccc', display: 'inline-block' }}>
          Hover me to Prefetch
        </div>
        {prefetchData && <p style={{ color: 'green' }}>{prefetchData}</p>}

        <div style={{ marginTop: '20px' }}>
          <ZeroInbox initialTasks={tasks} />
        </div>
      </section>

      <CommandPalette commands={commands} />
    </div>
  );
}
