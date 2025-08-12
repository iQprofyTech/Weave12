import { IAIProvider } from './types';

export class ModelScopeT2VProvider implements IAIProvider {
  name = 'modelscope-t2v';

  async generate(params: Record<string, unknown>): Promise<{ url: string }> {
    // TODO: call ModelScope text2video API
    return { url: 'https://example.com/video.mp4' };
  }
}
