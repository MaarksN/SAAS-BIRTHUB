import { Card, CardContent, CardHeader, CardTitle, Button, Input } from "@salesos/ui";
import { smartSearch, icpAnalysis } from "@salesos/ai-assistant";

export default async function AIAssistantPage() {
  // Mock data
  const icp = await icpAnalysis.analyzeDeals([]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Catarina AI Assistant</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Smart Prospecting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input placeholder="Ask Catarina: 'Find me Series B fintech companies in London...'" />
              <Button>Search</Button>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-500 mb-2">Try asking:</p>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                <li>"Who are the competitors of Salesforce?"</li>
                <li>"Find CTOs using React in New York"</li>
                <li>"Draft an email to this lead mentioning their recent funding"</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ICP Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Confidence Score</p>
                <p className="text-2xl font-bold text-blue-600">{icp.confidenceScore * 100}%</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Recommended Industries</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {icp.recommendedIndustries.map(ind => (
                    <span key={ind} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{ind}</span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
