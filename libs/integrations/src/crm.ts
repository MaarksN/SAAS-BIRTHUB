export interface CRMContact {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
}

export interface CRMProvider {
  getContacts(): Promise<CRMContact[]>;
  createContact(contact: Omit<CRMContact, 'id'>): Promise<CRMContact>;
  syncContacts(lastSync: Date): Promise<{ created: number; updated: number }>;
}
