export interface AiCompletionOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AiService {
  generateText(prompt: string, options?: AiCompletionOptions): Promise<string>;
  streamText(prompt: string, options?: AiCompletionOptions): Promise<ReadableStream>;
}
