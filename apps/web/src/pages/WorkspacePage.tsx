import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '@/store/useWorkspaceStore';
import { Plus, Pencil, Trash2 } from 'lucide-react';
// NOTE: Adjust this import if your Button component lives elsewhere
import { Button } from '@/components/ui/button';

export default function WorkspacePage() {
  const navigate = useNavigate();
  const canvases = useWorkspaceStore(s => s.canvases);
  const addCanvas = useWorkspaceStore(s => s.addCanvas);
  const removeCanvas = useWorkspaceStore(s => s.removeCanvas);
  const renameCanvas = useWorkspaceStore(s => s.renameCanvas);

  const capacity = 12 * 12;
  const used = canvases.length;
  const left = capacity - used;

  const gridCols = useMemo(() => 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12', []);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 pt-16 pb-8">
      <div className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-xl font-semibold">Рабочий стол</h1>
          <div className="text-xs text-slate-500">Холстов: {used} / {capacity} (доступно {left})</div>
        </div>
        <Button
          onClick={() => {
            const meta = addCanvas();
            if (meta) navigate(`/w/${meta.id}`);
          }}
          disabled={left <= 0}
          className="gap-2"
          title="Добавить холст"
        >
          <Plus className="h-4 w-4" />
          Добавить холст
        </Button>
      </div>

      <div className={`mt-4 grid ${gridCols} gap-3`}>
        {canvases.map(c => (
          <div key={c.id} className="group rounded-2xl border bg-white/70 dark:bg-slate-900/40 overflow-hidden hover:shadow transition-shadow">
            <button
              className="w-full aspect-video bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 grid place-items-center text-slate-400"
              onClick={() => navigate(`/w/${c.id}`)}
            >
              {c.coverUrl ? (
                <img src={c.coverUrl} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs">Нет превью</span>
              )}
            </button>
            <div className="p-3 flex items-center justify-between">
              <div className="truncate text-sm font-medium" title={c.name}>{c.name}</div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  title="Переименовать"
                  onClick={() => {
                    const name = prompt('Новое имя холста', c.name);
                    if (name && name.trim()) renameCanvas(c.id, name.trim());
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                {c.id !== 'demo' && (
                  <Button
                    size="icon"
                    variant="ghost"
                    title="Удалить"
                    onClick={() => {
                      if (confirm('Удалить холст? Это действие необратимо.')) {
                        removeCanvas(c.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../features/workspace/store';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function WorkspacePage() {
  const navigate = useNavigate();
  const canvases = useWorkspaceStore(s => s.canvases);
  const addCanvas = useWorkspaceStore(s => s.addCanvas);
  const removeCanvas = useWorkspaceStore(s => s.removeCanvas);
  const renameCanvas = useWorkspaceStore(s => s.renameCanvas);

  const capacity = 12 * 12; // logical limit 144
  const used = canvases.length;
  const left = capacity - used;

  const gridCols = useMemo(() => 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12', []);

  return (
    <div className="max-w-screen-2xl mx-auto px-4 pt-16 pb-8">
      <div className="flex items-center justify-between py-2">
        <div>
          <h1 className="text-xl font-semibold">Рабочий стол</h1>
          <div className="text-xs text-slate-500">Холстов: {used} / {capacity} (доступно {left})</div>
        </div>
        <button
          onClick={() => {
            const meta = addCanvas();
            if (meta) navigate(`/canvas/${meta.id}`);
          }}
          disabled={left <= 0}
          className="gap-2 inline-flex items-center rounded-md bg-slate-900 text-white text-sm px-3 py-1.5 disabled:opacity-40"
          title="Добавить холст"
        >
          <Plus className="h-4 w-4" />
          Добавить холст
        </button>
      </div>

      <div className={`mt-4 grid ${gridCols} gap-3`}>
        {canvases.map(c => (
          <div key={c.id} className="group rounded-2xl border bg-white/70 dark:bg-slate-900/40 overflow-hidden hover:shadow transition-shadow">
            <button
              className="w-full aspect-video bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 grid place-items-center text-slate-400"
              onClick={() => navigate(`/canvas/${c.id}`)}
            >
              {c.coverUrl ? (
                <img src={c.coverUrl} className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs">Нет превью</span>
              )}
            </button>
            <div className="p-3 flex items-center justify-between">
              <div className="truncate text-sm font-medium" title={c.name}>{c.name}</div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="p-1.5 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700"
                  title="Переименовать"
                  onClick={() => {
                    const name = prompt('Новое имя холста', c.name);
                    if (name && name.trim()) renameCanvas(c.id, name.trim());
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                {c.id !== 'demo' && (
                  <button
                    className="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-500/30"
                    title="Удалить"
                    onClick={() => {
                      if (confirm('Удалить холст? Это действие необратимо.')) removeCanvas(c.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
