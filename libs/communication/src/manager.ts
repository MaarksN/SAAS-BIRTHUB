import { Sequence, EmailTemplate } from './types';

export class SequenceManager {
  async createSequence(name: string, steps: any[]): Promise<Sequence> {
    return {
      id: Math.random().toString(36).substr(2, 9),
      name,
      steps,
    };
  }

  async getSequences(): Promise<Sequence[]> {
    return [
      {
        id: '1',
        name: 'Cold Outreach V1',
        steps: [
          { id: 's1', delayDays: 0, templateId: 't1' },
          { id: 's2', delayDays: 3, templateId: 't2' },
        ],
      },
    ];
  }
}
