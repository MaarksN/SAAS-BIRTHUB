import { Workflow, Trigger } from './types';

export class WorkflowEngine {
  async run(workflowId: string, context: any): Promise<void> {
    console.log(`Running workflow ${workflowId} with context`, context);
  }

  async getActiveWorkflows(): Promise<Workflow[]> {
    return [
      {
        id: '1',
        name: 'New Lead Nurture',
        isActive: true,
        trigger: { id: 't1', type: 'NEW_LEAD', config: {} },
        steps: [],
      },
    ];
  }
}
