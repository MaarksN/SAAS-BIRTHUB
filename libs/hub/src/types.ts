export type DealStage = 'NEW' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'CLOSED_WON' | 'CLOSED_LOST';

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: DealStage;
  contactId: string;
  createdAt: Date;
}

export interface Pipeline {
  id: string;
  name: string;
  stages: DealStage[];
  deals: Deal[];
}
