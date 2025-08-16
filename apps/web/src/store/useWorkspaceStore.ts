import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CanvasMeta = {
  id: string;
  name: string;
  createdAt: number;
  coverUrl?: string;
};

type State = {
  canvases: CanvasMeta[];
  addCanvas: (name?: string) => CanvasMeta | null;
  removeCanvas: (id: string) => void;
  renameCanvas: (id: string, name: string) => void;
  getCanvas: (id: string) => CanvasMeta | undefined;
};

const MAX_CANVASES = 12 * 12; // 144

export const useWorkspaceStore = create<State>()(
  persist(
    (set, get) => ({
      canvases: [
        {
          id: 'demo',
          name: 'Demo холст',
          createdAt: Date.now(),
          coverUrl: undefined,
        },
      ],
      addCanvas: (name = 'Новый холст') => {
        const current = get().canvases;
        if (current.length >= MAX_CANVASES) return null;
        const id = `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
        const meta: CanvasMeta = { id, name, createdAt: Date.now() };
        set({ canvases: [meta, ...current] });
        return meta;
      },
      removeCanvas: (id) =>
        set({ canvases: get().canvases.filter((c) => c.id !== id) }),
      renameCanvas: (id, name) =>
        set({
          canvases: get().canvases.map((c) => (c.id === id ? { ...c, name } : c)),
        }),
      getCanvas: (id) => get().canvases.find((c) => c.id === id),
    }),
    {
      name: 'weave12-workspace',
      version: 1,
      partialize: (s) => ({ canvases: s.canvases }),
    }
  )
);
