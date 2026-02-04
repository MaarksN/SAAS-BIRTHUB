export interface EmailTemplate {
  id: string;
  subject: string;
  body: string;
}

export interface SequenceStep {
  id: string;
  delayDays: number;
  templateId: string;
}

export interface Sequence {
  id: string;
  name: string;
  steps: SequenceStep[];
}
