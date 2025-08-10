export type NodeType = 'TextGen' | 'ImageGen' | 'VideoGen' | 'AudioGen' | 'AssetSlot';

export interface NodeData {
  id: string;
  type: NodeType;
  aspectRatio: string;
  model: string;
  prompt: string;
  inputs: string[];
  outputs: string[];
  status: 'idle' | 'queued' | 'running' | 'done' | 'error';
  previewURL?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobData {
  id: string;
  nodeId: string;
  type: NodeType;
  status: 'queued' | 'running' | 'done' | 'error';
  inputRefs: string[];
  outputRefs: string[];
  error?: string;
  createdAt: string;
  updatedAt: string;
}
