import { Card, CardContent, CardHeader, CardTitle, Button } from "@salesos/ui";
import { searchEngine } from "@salesos/prospector";
import { contactService, pipelineService } from "@salesos/hub";

export default async function DashboardPage() {
  // Simulate data fetching
  const searchResults = await searchEngine.search({});
  const contacts = await contactService.list();
  const deals = await pipelineService.getDeals();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button>New Campaign</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Leads Found</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{searchResults.length * 124}</div>
            <p className="text-xs text-slate-500">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <p className="text-xs text-slate-500">+12 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${deals.reduce((acc, deal) => acc + deal.value, 0).toLocaleString()}
            </div>
            <p className="text-xs text-slate-500">Across {deals.length} deals</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Prospecting</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{lead.name}</p>
                    <p className="text-sm text-slate-500">{lead.role} at {lead.company}</p>
                  </div>
                  <Button variant="outline" className="h-8 text-xs">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CRM Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {deals.map((deal) => (
                <div key={deal.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{deal.title}</p>
                    <p className="text-sm text-slate-500">{deal.stage}</p>
                  </div>
                  <span className="font-bold text-green-600">${deal.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
