import React from 'react';
import { Type, Image, Video, Waveform } from 'lucide-react';

interface AddNodeMenuProps {
  x: number;
  y: number;
  onSelect(modality: 'text' | 'image' | 'video' | 'audio'): void;
  onClose(): void;
}

const items: { key: 'text'|'image'|'video'|'audio'; label: string; icon: React.ReactNode; hint: string }[] = [
  { key: 'text', label: 'Text', icon: <Type size={16} />, hint: 'Generate text' },
  { key: 'image', label: 'Image', icon: <Image size={16} />, hint: 'Generate images' },
  { key: 'video', label: 'Video', icon: <Video size={16} />, hint: 'Generate video' },
  { key: 'audio', label: 'Audio', icon: <Waveform size={16} />, hint: 'Generate audio' },
];

export default function AddNodeMenu({ x, y, onSelect, onClose }: AddNodeMenuProps) {
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest?.('[data-add-node-menu]')) onClose();
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      data-add-node-menu
      className="absolute z-50 w-56 rounded-lg border border-black/10 dark:border-white/10 bg-white/90 dark:bg-slate-900/90 backdrop-blur shadow-lg p-2 space-y-1"
      style={{ left: x, top: y }}
    >
      <div className="text-[11px] uppercase tracking-wide font-medium text-slate-500 dark:text-slate-400 px-1">Add Node</div>
      {items.map(it => (
        <button
          key={it.key}
          onClick={() => { onSelect(it.key); onClose(); }}
          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm hover:bg-slate-100 dark:hover:bg-white/10 text-left"
        >
          <span className="shrink-0 opacity-70">{it.icon}</span>
          <span className="flex flex-col items-start leading-tight">
            <span className="font-medium">{it.label}</span>
            <span className="text-[11px] opacity-60">{it.hint}</span>
          </span>
        </button>
      ))}
      <div className="flex justify-end pt-1 border-t border-slate-200 dark:border-slate-700">
        <button onClick={onClose} className="text-[11px] px-2 py-0.5 rounded hover:bg-slate-200/50 dark:hover:bg-white/10">Close</button>
      </div>
    </div>
  );
}
