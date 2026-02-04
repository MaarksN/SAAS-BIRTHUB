import { KanbanBoard } from '@salesos/ui';
import { getPipeline } from '../../actions/hub';

export default async function HubPage() {
  const deals = await getPipeline();

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pipeline</h1>
        <p className="text-muted-foreground">Manage your deals.</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <KanbanBoard deals={deals} />
      </div>
    </div>
  );
}
