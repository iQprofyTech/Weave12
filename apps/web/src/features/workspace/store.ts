import { create } from 'zustand';
import type { Canvas } from '@weave12/shared';
import { nanoid } from 'nanoid';

interface WorkspaceState {
  canvases: Canvas[];
  addCanvas(name?: string): Canvas;
  removeCanvas(id: string): void;
  renameCanvas(id: string, name: string): void;
}

const now = () => new Date().toISOString();

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  canvases: [
    { id: 'demo', workspaceId: 'local', name: 'Demo Canvas', createdAt: now(), updatedAt: now(), demo: true },
  ],
  addCanvas(name) {
    let canvas: Canvas = {
      id: nanoid(8),
      workspaceId: 'local',
      name: name || 'New Canvas',
      createdAt: now(),
      updatedAt: now(),
    };
    set(s => ({ canvases: [...s.canvases, canvas] }));
    return canvas;
  },
  removeCanvas(id) {
    set(s => ({ canvases: s.canvases.filter(c => c.id !== id) }));
  },
  renameCanvas(id, name) {
    set(s => ({ canvases: s.canvases.map(c => c.id === id ? { ...c, name, updatedAt: now() } : c) }));
  },
}));
