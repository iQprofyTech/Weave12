import { create } from 'zustand';
import type { CanvasNode as DomainNode, Edge as DomainEdge } from '@weave12/shared';
import type { Node, Edge } from 'reactflow';
import { nanoid } from 'nanoid';

// Convert domain node to ReactFlow node
function toFlowNode(n: DomainNode): Node {
  return {
    id: n.id,
    type: 'box',
    position: n.position,
    data: {
      modelId: n.modelId,
      modality: n.modality,
      prompt: n.params?.prompt || '',
      output: n.output,
    },
  };
}

interface CanvasState {
  nodes: DomainNode[];
  edges: DomainEdge[];
  activeCanvasId?: string;
  addNode(modality: DomainNode['modality'], position: { x: number; y: number }): void;
  updateNode(id: string, patch: Partial<DomainNode>): void;
  addEdge(from: string, to: string): void;
  removeNode(id: string): void;
  flowNodes(): Node[];
  flowEdges(): Edge[];
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  nodes: [],
  edges: [],
  activeCanvasId: 'demo',
  addNode(modality, position) {
    set(s => ({
      nodes: s.nodes.concat({
        id: nanoid(6),
        canvasId: s.activeCanvasId || 'demo',
        type: modality,
        modality,
        position,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        params: {},
      } as DomainNode),
    }));
  },
  updateNode(id, patch) {
    set(s => ({
      nodes: s.nodes.map(n => n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n),
    }));
  },
  addEdge(from, to) {
    set(s => ({
      edges: s.edges.concat({
        id: nanoid(6),
        canvasId: s.activeCanvasId || 'demo',
        from, to,
        createdAt: new Date().toISOString(),
      }),
    }));
  },
  removeNode(id) {
    set(s => ({
      nodes: s.nodes.filter(n => n.id !== id),
      edges: s.edges.filter(e => e.from !== id && e.to !== id),
    }));
  },
  flowNodes() {
    return get().nodes.map(toFlowNode);
  },
  flowEdges() {
    return get().edges.map(e => ({ id: e.id, source: e.from, target: e.to }));
  },
}));
