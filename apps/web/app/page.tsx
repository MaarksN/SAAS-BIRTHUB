'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Input } from '@salesos/ui';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold text-center mb-8">
          BIRTH HUB <span className="text-blue-600">INNOVATION 360</span>
        </h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Login to Platform</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" placeholder="sales@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>
          <Link href="/dashboard/ldr">
            <Button className="w-full mt-4">Sign In</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
