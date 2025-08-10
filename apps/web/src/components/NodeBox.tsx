import { Handle, Position } from 'reactflow';
import NodeToolbar from './NodeToolbar';
import PromptArea from './PromptArea';

export default function NodeBox() {
  return (
    <div className="relative rounded-2xl bg-white/10 dark:bg-slate-900/40 backdrop-blur p-4">
      <Handle type="target" position={Position.Left} />
      <div className="w-24 h-16" />
      <Handle type="source" position={Position.Right} />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2"><NodeToolbar /></div>
      <PromptArea />
    </div>
  );
}
