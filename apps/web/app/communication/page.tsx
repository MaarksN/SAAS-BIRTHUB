import { Card, CardContent, CardHeader, CardTitle, Button } from "@salesos/ui";
import { emailClient, sequenceBuilder } from "@salesos/communication";

export default async function CommunicationPage() {
  const inbox = await emailClient.getInbox();
  const sequences = await sequenceBuilder.list();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Communication</h1>
        <Button>Compose</Button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inbox ({inbox.filter(e => !e.read).length} unread)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inbox.map((email) => (
                <div key={email.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className={`font-medium ${!email.read ? 'text-blue-600' : ''}`}>{email.from}</span>
                    <span className="text-xs text-slate-500">{new Date(email.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="font-semibold text-sm mb-1">{email.subject}</p>
                  <p className="text-sm text-slate-600 truncate">{email.body}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Sequences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sequences.map((seq) => (
                <div key={seq.id} className="flex justify-between items-center border-b pb-4 last:border-0">
                  <div>
                    <p className="font-medium">{seq.name}</p>
                    <p className="text-sm text-slate-500">{seq.steps.length} steps</p>
                  </div>
                  <Button variant="outline" className="h-8 text-xs">Manage</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
