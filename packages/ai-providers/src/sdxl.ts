import { IAIProvider } from './types';

export class SDXLProvider implements IAIProvider {
  name = 'sdxl';

  async generate(params: Record<string, unknown>): Promise<{ url: string }> {
    // TODO: call SDXL image API
    return { url: 'https://example.com/image.png' };
  }
}
