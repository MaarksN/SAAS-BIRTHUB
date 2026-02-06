export class CacheManager {
  async get(key: string): Promise<string | null> { return null; }
  async set(key: string, val: string): Promise<void> {}
}
export class SecurityService {
  async hash(pwd: string): Promise<string> { return 'hashed_secret'; }
  async sanitize(input: string): Promise<string> { return input.replace(/<script>/g, ''); }
}
export class HealthCheck {
  async check(): Promise<boolean> { return true; }
}
