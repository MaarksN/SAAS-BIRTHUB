import { guard, features, logger } from '@salesos/core';
import { OpenAIProvider } from './providers/openai.provider';

export type LLMProvider = 'openai' | 'anthropic';

export interface CompletionRequest {
  prompt: string;
  provider?: LLMProvider;
  temperature?: number;
  userId?: string;
  model?: string;
}

export const llmGateway = {
  provider: new OpenAIProvider(),

  complete: async (request: CompletionRequest): Promise<string> => {
    const userId = request.userId || 'anonymous';

    // 1. Feature Flag Check
    if (!features.isEnabled('AI_ENABLED')) {
      logger.warn('AI feature is disabled', { userId });
      throw new Error('AI services are temporarily disabled.');
    }

    // 2. Rate Limit Check
    try {
      guard.checkRateLimit('ai', userId);
    } catch (error) {
      logger.warn('Rate limit blocked AI request', { userId });
      throw error;
    }

    // 3. Cost Guard Check
    try {
      guard.checkCost('ai', userId, 1); // Assume 1 unit cost per call
    } catch (error) {
      logger.warn('Cost guard blocked AI request', { userId });
      throw error;
    }

    // 4. Execute Real AI Call
    const response = await llmGateway.provider.generateText(request.prompt, request.model);

    // Log the cost event (Audit)
    logger.info('COST_EVENT: AI Completion success', {
      userId,
      provider: request.provider,
      cost: 1
    });

    return response;
  }
};
