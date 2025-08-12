import { z } from 'zod';

export const nodeSchema = z.object({
  id: z.string(),
  type: z.enum(['TextGen','ImageGen','VideoGen','AudioGen','AssetSlot']),
  aspectRatio: z.string(),
  model: z.string(),
  prompt: z.string().default(''),
  inputs: z.array(z.string()),
  outputs: z.array(z.string()),
  status: z.enum(['idle','queued','running','done','error']),
  previewURL: z.string().url().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const jobSchema = z.object({
  id: z.string(),
  nodeId: z.string(),
  type: z.enum(['TextGen','ImageGen','VideoGen','AudioGen','AssetSlot']),
  status: z.enum(['queued','running','done','error']),
  inputRefs: z.array(z.string()),
  outputRefs: z.array(z.string()),
  error: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export type Node = z.infer<typeof nodeSchema>;
export type Job = z.infer<typeof jobSchema>;
