import { currentUser } from '@clerk/nextjs/server';

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
      <p className="text-muted-foreground">Here is your sales overview.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-medium text-sm text-muted-foreground">Total Prospects</h3>
          <p className="text-2xl font-bold mt-2">1,234</p>
        </div>
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-medium text-sm text-muted-foreground">Active Deals</h3>
          <p className="text-2xl font-bold mt-2">45</p>
        </div>
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-medium text-sm text-muted-foreground">Revenue (MRR)</h3>
          <p className="text-2xl font-bold mt-2">$12,500</p>
        </div>
      </div>
    </div>
  );
}
