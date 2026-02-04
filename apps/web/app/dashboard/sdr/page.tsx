'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@salesos/ui';

export default function SDRDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Inbound Response (SDR)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Lead Scoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">AI Behavioral Analysis</p>
          </CardContent>
        </Card>
        {/* Placeholders for 19 tools */}
        <Card>
          <CardHeader>
            <CardTitle>Objection Copilot</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Live assistance.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
