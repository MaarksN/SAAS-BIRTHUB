export * from './services/enterprise.service';
// Re-export existing AuditService if it exists, or create a mock one if needed for backward compat
export class AuditService {
    log(action: string) { console.log(action); }
}
