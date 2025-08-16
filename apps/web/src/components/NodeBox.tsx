import { Handle, Position, NodeProps } from 'reactflow';
import NodeToolbar from './NodeToolbar';
import { useCanvasStore } from '../features/canvas/store';

export default function NodeBox(props: NodeProps) {
  const updateNode = useCanvasStore(s => s.updateNode);
  const prompt = (props.data?.prompt as string) || '';

  return (
    <div className="relative rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur p-4 min-w-[180px]">
      <Handle type="target" position={Position.Left} />
      <div className="text-xs opacity-70 mb-1">{props.data?.modality || 'text'}</div>
      <textarea
        className="mt-1 w-full rounded-xl bg-white/10 dark:bg-slate-900/40 p-2 text-xs"
        placeholder="Prompt..."
        value={prompt}
        onChange={e => updateNode(props.id, { params: { ...(props.data?.params||{}), prompt: e.target.value } as any })}
      />
      <Handle type="source" position={Position.Right} />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2"><NodeToolbar /></div>
    </div>
  );
}
