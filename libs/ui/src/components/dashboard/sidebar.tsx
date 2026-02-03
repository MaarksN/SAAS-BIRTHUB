'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils'; // Assuming utils exists or using clsx/tailwind-merge directly if not

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const items = [
    { href: '/dashboard', title: 'Overview' },
    { href: '/dashboard/prospector', title: 'Prospector' },
    { href: '/dashboard/hub', title: 'Hub' },
    { href: '/dashboard/settings', title: 'Settings' },
  ];

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground",
             pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
