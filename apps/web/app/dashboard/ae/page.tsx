'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@salesos/ui';

export default function AEDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Closer (AE)</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Forecast AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Predictive Closing</p>
          </CardContent>
        </Card>
        {/* Placeholders for 19 tools */}
        <Card>
          <CardHeader>
            <CardTitle>Proposal Gen</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Dynamic creation.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
