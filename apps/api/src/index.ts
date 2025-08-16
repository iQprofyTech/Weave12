import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { Queue } from 'bullmq';
import { filterModels, MODELS } from '@weave12/shared/models.registry';
import type { GenerationJobRequest, ModelsQuery } from '@weave12/shared/types';

const app = Fastify();

app.register(cors, { origin: true });
app.register(jwt, { secret: process.env.JWT_SECRET || 'secret' });

app.get('/api/health', async () => ({ status: 'ok' }));

app.post('/api/auth/telegram', async (req, res) => {
  // TODO: verify Telegram initData
  const token = app.jwt.sign({ id: 'demo' });
  return { token };
});

// Simple in-memory queue instance placeholders (per modality)
const textQueue = new Queue('text', { connection: { host: 'redis', port: 6379 } });
const imageQueue = new Queue('image', { connection: { host: 'redis', port: 6379 } });
const videoQueue = new Queue('video', { connection: { host: 'redis', port: 6379 } });
const audioQueue = new Queue('audio', { connection: { host: 'redis', port: 6379 } });

app.get('/api/models', async (req) => {
  const q = req.query as Partial<ModelsQuery>;
  const { modality, include, exclude, providers, tagsAny } = q;
  const list = filterModels({
    modality: modality as any,
    include: include ? (Array.isArray(include) ? include : [include]) as any : undefined,
    exclude: exclude ? (Array.isArray(exclude) ? exclude : [exclude]) as any : undefined,
    providers: providers ? (Array.isArray(providers) ? providers : [providers]) as any : undefined,
    tagsAny: tagsAny ? (Array.isArray(tagsAny) ? tagsAny : [tagsAny]) : undefined,
  });
  return { models: list };
});

app.get('/api/models/:id', async (req, res) => {
  const id = (req.params as any).id;
  const model = MODELS.find(m => m.id === id);
  if (!model) {
    res.code(404);
    return { error: 'Not found' };
  }
  return { model };
});

app.post('/api/ai/generate', async (req, res) => {
  const body = req.body as GenerationJobRequest;
  if (!body?.model) {
    res.code(400); return { error: 'model required' };
  }
  const modelMeta = MODELS.find(m => m.id === body.model);
  if (!modelMeta) { res.code(400); return { error: 'unknown model' }; }
  const prompt = body.prompt || body.inputs?.prompt;
  if (!prompt) { res.code(400); return { error: 'prompt required' }; }

  // Select queue by modality
  let queue: Queue;
  switch (modelMeta.modality) {
    case 'text': queue = textQueue; break;
    case 'image': queue = imageQueue; break;
    case 'video': queue = videoQueue; break;
    case 'audio': queue = audioQueue; break;
    default: queue = textQueue;
  }

  const job = await queue.add(modelMeta.modality, {
    model: body.model,
    prompt,
    inputs: body.inputs || {},
    mode: body.mode,
    canvasId: body.canvasId,
    target: body.target,
    force: body.force,
  });

  return { jobId: job.id, status: job.status, model: body.model };
});

app.get('/api/jobs/:id', async (req, res) => {
  const id = (req.params as any).id;
  // Try each queue (could optimize by prefixing id with modality later)
  const queues = [textQueue, imageQueue, videoQueue, audioQueue];
  for (const q of queues) {
    const job = await q.getJob(id);
    if (job) {
      const state = await job.getState();
      const returnJson: any = { id: job.id, state };
      if (state === 'completed') returnJson.returnvalue = job.returnvalue;
      if (state === 'failed') returnJson.failedReason = job.failedReason;
      return returnJson;
    }
  }
  res.code(404);
  return { error: 'Not found' };
});

app.listen({ port: Number(process.env.PORT) || 8080, host: '0.0.0.0' }).then(() => {
  console.log('API running');
});
