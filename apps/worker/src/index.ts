import { Worker } from 'bullmq';
import { GeminiProvider, SDXLProvider, ModelScopeT2VProvider } from '@weave12/ai-providers';
import { MODELS } from '@weave12/shared-ai';

// Simple provider factory mapping by modelId (expand later)
function resolveProvider(modelId: string) {
  if (modelId.startsWith('gpt') || modelId.startsWith('claude')) return new GeminiProvider(); // placeholder
  if (modelId === 'sdxl' || modelId === 'sdxl-turbo' || modelId === 'stable-cascade' || modelId.startsWith('flux') || modelId.includes('imagen')) return new SDXLProvider();
  if (modelId === 'stable-video-diffusion' || modelId === 'minimax-video' || modelId === 'veo-sora') return new ModelScopeT2VProvider();
  // Fallback
  return new GeminiProvider();
}

const connection = { connection: { host: 'redis', port: 6379 } };

function createModalityWorker(modality: 'text' | 'image' | 'video' | 'audio') {
  return new Worker(modality, async job => {
    const { modelId, model, prompt, inputs } = job.data as any;
    const id = modelId || model;
    const modelMeta = MODELS.find(m => (m as any).id === id);
    if (!modelMeta) throw new Error('Unknown model');
    if (modelMeta.modality !== modality) throw new Error('Modality mismatch');
    const provider = resolveProvider(id);
    const result = await provider.generate({ prompt, ...inputs, model: id });
    return { modelId: id, result };
  }, connection);
}

createModalityWorker('text');
createModalityWorker('image');
createModalityWorker('video');
createModalityWorker('audio');

console.log('Workers started');
