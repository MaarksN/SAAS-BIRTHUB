'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@salesos/ui';

export default function SupportDashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Technical Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Ticket AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">Auto-classification.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
