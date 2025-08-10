import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { Queue } from 'bullmq';

const app = Fastify();

app.register(cors, { origin: true });
app.register(jwt, { secret: process.env.JWT_SECRET || 'secret' });

app.get('/api/health', async () => ({ status: 'ok' }));

app.post('/api/auth/telegram', async (req, res) => {
  // TODO: verify Telegram initData
  const token = app.jwt.sign({ id: 'demo' });
  return { token };
});

app.post('/api/jobs', async (req, res) => {
  // TODO: enqueue job via BullMQ
  return { id: 'job-demo' };
});

app.get('/api/jobs/:id', async (req, res) => {
  const id = (req.params as any).id;
  return { id, status: 'queued' };
});

app.listen({ port: Number(process.env.PORT) || 8080, host: '0.0.0.0' }).then(() => {
  console.log('API running');
});
