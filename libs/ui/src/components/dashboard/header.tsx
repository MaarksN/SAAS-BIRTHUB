'use client';

import { UserNav } from './user-nav';
import { ThemeProvider } from 'next-themes';
// Assuming ThemeToggle is something we might want, but for now just UserNav

export function Header() {
  return (
    <header className="border-b h-16 flex items-center px-6 justify-between bg-background">
      <div className="font-bold text-xl">SalesOS</div>
      <UserNav />
    </header>
  );
}
