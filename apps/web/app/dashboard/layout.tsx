'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@salesos/ui';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard/ldr', label: 'LDR (Intel)' },
    { href: '/dashboard/bdr', label: 'BDR (Hunter)' },
    { href: '/dashboard/sdr', label: 'SDR (Inbound)' },
    { href: '/dashboard/ae', label: 'AE (Closer)' },
    { href: '/dashboard/cs', label: 'Customer Success' },
    { href: '/dashboard/support', label: 'Support' },
    { href: '/dashboard/ops', label: 'Sales Ops' },
    { href: '/dashboard/head', label: 'Head of Sales' },
    { href: '/dashboard/cro', label: 'CRO / Exec' },
    { href: '/dashboard/growth', label: 'Growth' },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r p-4 flex flex-col">
        <h1 className="text-xl font-bold mb-8 px-2">SalesOS Ultimate</h1>
        <nav className="flex-1 space-y-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === link.href
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
