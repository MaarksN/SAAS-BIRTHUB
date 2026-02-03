import { Header, Sidebar } from '@salesos/ui';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex w-64 flex-col border-r bg-muted/20">
        <div className="p-6">
          <span className="font-bold text-2xl">SalesOS</span>
        </div>
        <div className="flex-1 px-4 py-2">
          <Sidebar />
        </div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
