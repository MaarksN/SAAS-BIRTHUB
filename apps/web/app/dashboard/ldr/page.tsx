import React from 'react';
import { LDRToolGrid } from '../../../components/ldr/LDRToolGrid';
import { EnrichmentTool } from '../../../components/ldr/EnrichmentTool';

export default function LDRDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market Intelligence (LDR)</h1>
        <p className="text-gray-500">Autonomous data enrichment and validation agents.</p>
      </div>

      <EnrichmentTool />

      <div className="pt-8">
        <h2 className="text-xl font-semibold mb-4">Available Tools</h2>
        <LDRToolGrid />
      </div>
    </div>
  );
}
