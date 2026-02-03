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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center mb-8">
          SalesOS <span className="text-blue-600">Ultimate</span>
        </h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login to Prospector</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" placeholder="sales@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Button className="w-full">Sign In</Button>
        </div>
      </div>
    </main>
  );
}
