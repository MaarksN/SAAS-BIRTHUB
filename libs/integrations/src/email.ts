export interface EmailMessage {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export interface EmailProvider {
  sendEmail(message: EmailMessage): Promise<{ id: string; success: boolean }>;
  getTemplates?(): Promise<{ id: string; name: string }[]>;
}
