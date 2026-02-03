import { Deal, DealStage } from '../types';

export class PipelineService {
  async getDeals(stage?: DealStage): Promise<Deal[]> {
    const deals: Deal[] = [
      {
        id: '1',
        title: 'Acme Corp Deal',
        value: 50000,
        stage: 'NEW',
        contactId: '1',
        createdAt: new Date(),
      },
      {
        id: '2',
        title: 'Tech Inc Renewal',
        value: 12000,
        stage: 'CLOSED_WON',
        contactId: '2',
        createdAt: new Date(),
      },
    ];

    if (stage) {
      return deals.filter((d) => d.stage === stage);
    }
    return deals;
  }

  async createDeal(deal: Omit<Deal, 'id' | 'createdAt'>): Promise<Deal> {
    return {
      ...deal,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
  }
}
