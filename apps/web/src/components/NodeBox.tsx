import { Handle, Position, NodeProps } from 'reactflow';
import NodeToolbar from './NodeToolbar';
import { useCanvasStore } from '../features/canvas/store';
import { Image, Type, Video, Waveform } from 'lucide-react';
import { filterModels } from '@weave12/shared/models.registry';

function iconFor(modality?: string) {
  switch (modality) {
    case 'image': return <Image size={18} />;
    case 'video': return <Video size={18} />;
    case 'audio': return <Waveform size={18} />;
    case 'text':
    default: return <Type size={18} />;
  }
}

export default function NodeBox(props: NodeProps) {
  const updateNode = useCanvasStore(s => s.updateNode);
  const prompt = (props.data?.prompt as string) || '';
  const modality = props.data?.modality || 'text';
  const models = filterModels({ modality: modality as any });
  const selectedModel = props.data?.modelId || models[0]?.id;

  const onModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateNode(props.id, { modelId: e.target.value as any });
  };

  const placeholderByModality: Record<string,string> = {
    text: 'Enter a prompt to generate text.',
    image: 'Try "A vibrant graffiti art style character"',
    video: 'Describe the scene to generate a video...',
    audio: 'Describe sound or paste transcript...'
  };

  return (
    <div className="relative rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm p-4 w-[340px] h-[220px] flex flex-col group">
      <Handle type="target" position={Position.Left} className="!w-3 !h-3" />
      <div className="flex items-center gap-2 text-sm mb-2">
        <span className="text-slate-500 dark:text-slate-300 flex items-center gap-1">{iconFor(modality)}<span className="font-medium capitalize">{modality} Generation Node</span></span>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <select value={selectedModel} onChange={onModelChange} className="text-xs rounded-md border border-slate-300 dark:border-slate-700 bg-transparent px-2 py-1">
            {models.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
        <textarea
          className="resize-none text-xs flex-1 rounded-md border border-dashed border-slate-300 dark:border-slate-700 p-2 bg-transparent focus:outline-none"
          placeholder={placeholderByModality[modality]}
          value={prompt}
          onChange={e => updateNode(props.id, { params: { ...(props.data?.params||{}), prompt: e.target.value } as any })}
        />
        <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Action buttons placeholder */}
          <button className="text-[11px] px-2 py-1 rounded bg-slate-900/80 text-white dark:bg-white/10">Run</button>
          <button className="text-[11px] px-2 py-1 rounded bg-slate-900/5 dark:bg-white/5">⋯</button>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!w-3 !h-3" />
      <div className="absolute -top-9 left-1/2 -translate-x-1/2"><NodeToolbar /></div>
    </div>
  );
}
