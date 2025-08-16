import { useWorkspaceStore } from '../features/workspace/store';
import CanvasCard from '../components/CanvasCard';
import { Plus } from 'lucide-react';

export default function WorkspacePage() {
  const canvases = useWorkspaceStore(s => s.canvases);
  const add = useWorkspaceStore(s => s.addCanvas);

  return (
    <div className="pt-14 px-6 pb-10 min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(120,119,198,0.08),transparent)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold">Workspace</h1>
          <button onClick={() => add()} className="flex items-center gap-1 text-sm px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700">
            <Plus size={14} /> Add Canvas
          </button>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))' }}>
          {canvases.map(c => <CanvasCard key={c.id} id={c.id} />)}
        </div>
      </div>
    </div>
  );
}
