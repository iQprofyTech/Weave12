import { Link } from 'react-router-dom';
import { useWorkspaceStore } from '../features/workspace/store';
import { Trash2, Pencil, ArrowRight } from 'lucide-react';
import React from 'react';

interface CanvasCardProps { id: string; }

export default function CanvasCard({ id }: CanvasCardProps) {
  const canvas = useWorkspaceStore(s => s.canvases.find(c => c.id === id)!);
  const remove = useWorkspaceStore(s => s.removeCanvas);
  const rename = useWorkspaceStore(s => s.renameCanvas);
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(canvas.name);

  return (
    <div className="group relative rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-900 to-slate-950 p-4 flex flex-col shadow-sm hover:shadow-md transition">
      <div className="flex-1 flex items-center justify-center text-xs text-slate-500 select-none">
        preview
      </div>
      <div className="mt-3 flex items-center gap-2">
        {editing ? (
          <input
            className="bg-slate-800/60 text-sm px-2 py-1 rounded w-full"
            value={name}
            autoFocus
            onChange={e => setName(e.target.value)}
            onBlur={() => { rename(id, name || 'Untitled'); setEditing(false); }}
            onKeyDown={e => { if (e.key === 'Enter') { (e.target as HTMLInputElement).blur(); } }}
          />
        ) : (
          <button className="text-left font-medium text-sm truncate flex-1" onClick={() => setEditing(true)}>
            {canvas.name}
          </button>
        )}
        <Link to={`/canvas/${id}`} className="p-1.5 rounded bg-slate-700/40 hover:bg-slate-600/50" title="Open">
          <ArrowRight size={14} />
        </Link>
        <button onClick={() => remove(id)} className="p-1.5 rounded bg-slate-800/50 hover:bg-red-500/50" title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
      <button
        onClick={() => setEditing(true)}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1.5 rounded bg-slate-800/60 hover:bg-slate-700 transition"
        title="Rename"
      >
        <Pencil size={14} />
      </button>
    </div>
  );
}
