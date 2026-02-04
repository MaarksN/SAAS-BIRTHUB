export type ContentType = 'EMAIL' | 'LINKEDIN_POST' | 'TWEET';

export class ContentGenerator {
  async generate(type: ContentType, prompt: string): Promise<string> {
    console.log(`Generating ${type} with prompt: ${prompt}`);
    return `Generated content for ${type}: ${prompt}`;
  }
}
