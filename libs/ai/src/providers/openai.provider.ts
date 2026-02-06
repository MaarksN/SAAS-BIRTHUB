import OpenAI from 'openai';

export class OpenAIProvider {
  private client: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else {
      console.warn("[OpenAIProvider] No API Key found. AI features will use mock data.");
    }
  }

  async generateText(prompt: string, model: string = 'gpt-4-turbo'): Promise<string> {
    if (!this.client) {
      return this.mockResponse(prompt);
    }

    try {
      const completion = await this.client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: model,
      });

      return completion.choices[0]?.message?.content || "No response generated.";
    } catch (error) {
      console.error("[OpenAIProvider] Error generating text:", error);
      throw error;
    }
  }

  private mockResponse(prompt: string): string {
    return `[MOCK AI RESPONSE] based on prompt: "${prompt.substring(0, 50)}..."\n\n(Configure OPENAI_API_KEY to get real responses)`;
  }
}
