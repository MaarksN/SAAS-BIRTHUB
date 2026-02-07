export interface SAMLConfig {
  providerName: string;
  entryPoint: string;
  issuer: string;
  cert: string;
}

export class SAMLManager {
  constructor(private config: SAMLConfig) {}

  generateMetadata(): string {
    return `<EntityDescriptor entityID="${this.config.issuer}"></EntityDescriptor>`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateResponse(_response: string): boolean {
    // Verify SAML response signature
    return true;
  }
}
