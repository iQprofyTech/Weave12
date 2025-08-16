// Core shared domain types
import type { ModelId, Modality } from './models.registry';

export interface CanvasNode {
  id: string;
  canvasId: string;
  chainId?: string; // logical grouping
  type: string; // e.g. 'text', 'image', 'video', 'audio'
  modality: Modality; // redundancy for fast filtering
  modelId?: ModelId;
  params?: Record<string, any>; // generation params (prompt, size, etc.)
  position: { x: number; y: number };
  createdAt: string;
  updatedAt: string;
  // execution results (last)
  output?: NodeOutput;
}

export interface NodeOutput {
  type: 'text' | 'image' | 'video' | 'audio' | 'json';
  text?: string; // when type=text
  url?: string;  // when type=image/video/audio
  data?: any;    // structured
  modelId: ModelId;
  startedAt: string;
  finishedAt: string;
  durationMs: number;
  cached?: boolean;
}

export interface Edge {
  id: string;
  canvasId: string;
  from: string; // node id
  to: string;   // node id
  createdAt: string;
}

export interface Chain {
  id: string;
  canvasId: string;
  name: string;
  nodeIds: string[]; // ordered or just membership
  createdAt: string;
  updatedAt: string;
}

export interface Canvas {
  id: string;
  workspaceId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  demo?: boolean;
  coverUrl?: string; // optional preview image
}

export type GenerationMode = 'full' | 'changed' | 'single';

export interface GenerationJobRequest {
  canvasId: string;
  target: { nodeId?: string; chainId?: string };
  mode: GenerationMode;
  model: ModelId;
  prompt?: string;
  inputs?: Record<string, any>;
  force?: boolean;
}

export interface GenerationJob extends GenerationJobRequest {
  id: string;
  status: 'queued' | 'running' | 'succeeded' | 'failed';
  createdAt: string;
  updatedAt: string;
  resultNodeIds?: string[]; // nodes updated
  error?: string;
}

export interface ModelsQuery {
  modality?: Modality;
  include?: ModelId[];
  exclude?: ModelId[];
  providers?: string[];
  tagsAny?: string[];
}
