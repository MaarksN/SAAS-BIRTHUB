import OpenAI from 'openai';
import { AiService, AiCompletionOptions } from '../AiService';

export class OpenAiProvider implements AiService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateText(prompt: string, options?: AiCompletionOptions): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: options?.model || 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
    });

    return response.choices[0]?.message?.content || '';
  }

  async streamText(prompt: string, options?: AiCompletionOptions): Promise<ReadableStream> {
    const stream = await this.client.chat.completions.create({
      model: options?.model || 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: options?.temperature,
      max_tokens: options?.maxTokens,
      stream: true,
    });

    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      },
    });
  }
}
