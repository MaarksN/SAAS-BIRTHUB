export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>;
}

export class AuditService {
  async log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
    const logEntry: AuditLogEntry = {
      ...entry,
      id: Math.random().toString(36).substring(7),
      timestamp: new Date()
    };
    console.log("AUDIT LOG:", JSON.stringify(logEntry));
    // Implementation would write to immutable storage
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async query(_userId: string): Promise<AuditLogEntry[]> {
    // Mock query
    return [];
  }
}
