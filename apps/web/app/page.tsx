'use client';

import React from 'react';
import { LinkedInAutomation } from '@salesos/social';
import { AuditService } from '@salesos/enterprise';
import { ReferralSystem } from '@salesos/growth';
import { CommandPalette } from '@salesos/ui';
import { AppError } from '@salesos/core';

export default function Page() {
  const linkedIn = new LinkedInAutomation();
  const audit = new AuditService();
  const referral = new ReferralSystem();

  // Just to demonstrate usage
  const error = new AppError('SalesOS Init', 200);
  console.log(error);

  const commands = [
    { id: '1', name: 'Go to Dashboard', action: () => alert('Going to dashboard') },
    { id: '2', name: 'Create Lead', action: () => alert('Creating lead') },
  ];

  return (
    <div>
      <h1>SalesOS Ultimate - Cycles 16-20 Demo</h1>
      <p>Referral Code: {referral.generateCode("user_123")}</p>
      <CommandPalette commands={commands} />
    </div>
  );
}
