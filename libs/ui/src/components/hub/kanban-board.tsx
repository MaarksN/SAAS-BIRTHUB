'use client';

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: string;
  contactId: string;
}

interface KanbanBoardProps {
  deals: Deal[];
}

const STAGES = ['NEW', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST'];

export function KanbanBoard({ deals }: KanbanBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full">
      {STAGES.map((stage) => {
        const stageDeals = deals.filter((d) => d.stage === stage);
        const totalValue = stageDeals.reduce((acc, d) => acc + d.value, 0);

        return (
          <div key={stage} className="min-w-[280px] bg-muted/20 rounded-lg p-3 flex flex-col h-full">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">{stage}</h3>
              <span className="text-xs text-muted-foreground">{stageDeals.length}</span>
            </div>
            <div className="text-xs text-muted-foreground mb-4">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalValue)}
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto">
              {stageDeals.map((deal) => (
                <div key={deal.id} className="bg-card p-3 rounded shadow-sm border text-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="font-medium mb-1">{deal.title}</div>
                  <div className="text-muted-foreground flex justify-between">
                    <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(deal.value)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
