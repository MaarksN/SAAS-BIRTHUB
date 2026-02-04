export type TriggerType = 'NEW_LEAD' | 'DEAL_STAGE_CHANGE' | 'EMAIL_OPENED';

export interface Trigger {
  id: string;
  type: TriggerType;
  config: Record<string, any>;
}

export interface Workflow {
  id: string;
  name: string;
  trigger: Trigger;
  isActive: boolean;
  steps: any[];
}
