import * as React from "react";
import { Sidebar } from "./Sidebar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: "Overview", href: "/dashboard", active: true },
    { label: "Prospector", href: "/dashboard/prospector" },
    { label: "CRM", href: "/dashboard/crm" },
    { label: "Communication", href: "/communication" },
    { label: "Catarina AI", href: "/ai-assistant" },
    { label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar items={navItems} />
      <main className="flex-1 p-8 bg-slate-50 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
