import { Worker } from 'bullmq';
import { GeminiProvider, SDXLProvider, ModelScopeT2VProvider } from '@weave12/ai-providers';

const connection = { connection: { host: 'redis', port: 6379 } };

new Worker('text', async job => {
  const provider = new GeminiProvider();
  return provider.generate(job.data);
}, connection);

new Worker('image', async job => {
  const provider = new SDXLProvider();
  return provider.generate(job.data);
}, connection);

new Worker('video', async job => {
  const provider = new ModelScopeT2VProvider();
  return provider.generate(job.data);
}, connection);

console.log('Workers started');
