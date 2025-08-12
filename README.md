# Weave12

FlowForge – Weave12 monorepo containing web client, API server, worker queue and shared packages.

## Structure

- `apps/web` – Vite + React 18 client with React Flow canvas
- `apps/api` – Fastify API with Prisma and BullMQ
- `apps/worker` – queue processors for text/image/video/audio jobs
- `packages/ui` – shared shadcn/ui components
- `packages/core` – shared types, Zod schemas and API clients
- `packages/ai-providers` – pluggable adapters for AI providers
- `infra` – docker-compose, nginx config and prisma schema
- `docs` – Mermaid diagrams describing the system
- `scripts` – deployment helpers

## Development

Install dependencies and run tests:

```bash
npm install
npm test
```

Create `.env` from `.env.example` before running services.

## Deployment

Docker-compose stack is provided in `infra/docker`.
Nginx reverse proxy and SSL are configured via Let's Encrypt.
See `scripts/deploy.sh` for a minimal example.
