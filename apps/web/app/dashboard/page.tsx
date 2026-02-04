import { currentUser } from '@clerk/nextjs/server';
import { getDashboardStats } from '../actions/dashboard';

export default async function DashboardPage() {
  const user = await currentUser();
  const stats = await getDashboardStats();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Welcome back, {user?.firstName}!</h1>
      <p className="text-muted-foreground">Here is your sales overview.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-medium text-sm text-muted-foreground">Total Prospects</h3>
          <p className="text-2xl font-bold mt-2">{stats.totalProspects.toLocaleString()}</p>
        </div>
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-medium text-sm text-muted-foreground">Active Deals</h3>
          <p className="text-2xl font-bold mt-2">{stats.activeDeals}</p>
        </div>
        <div className="p-6 border rounded-lg bg-card shadow-sm">
          <h3 className="font-medium text-sm text-muted-foreground">Revenue (Pipeline)</h3>
          <p className="text-2xl font-bold mt-2">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(stats.totalRevenue)}
          </p>
        </div>
      </div>
    </div>
  );
}
