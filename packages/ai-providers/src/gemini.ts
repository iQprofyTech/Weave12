import { IAIProvider } from './types';

export class GeminiProvider implements IAIProvider {
  name = 'gemini';

  async generate(params: Record<string, unknown>): Promise<{ text: string }> {
    // TODO: call Google Gemini API
    return { text: 'demo response' };
  }
}
