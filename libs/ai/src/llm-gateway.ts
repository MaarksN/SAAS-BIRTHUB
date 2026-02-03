export type LLMProvider = 'openai' | 'anthropic';

export interface CompletionRequest {
  prompt: string;
  provider?: LLMProvider;
  temperature?: number;
}

export const llmGateway = {
  complete: async (request: CompletionRequest): Promise<string> => {
    // Mock LLM response
    return `[AI Response from ${request.provider || 'openai'}] Based on the context, I suggest focusing on value-based selling...`;
  }
};
