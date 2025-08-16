import React from 'react';
import ReactFlow, { Background, Controls, addEdge, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeBox from '../components/NodeBox';
import { useCanvasStore } from '../features/canvas/store';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AddNodeMenu from '../components/AddNodeMenu';

const nodeTypes = { box: NodeBox };

export default function CanvasPage() {
  const { id: canvasId } = useParams();
  const setActive = useCanvasStore(s => s.setActiveCanvas);
  React.useEffect(() => { if (canvasId) setActive(canvasId); }, [canvasId, setActive]);
  const nodes = useCanvasStore(s => s.flowNodes());
  const edges = useCanvasStore(s => s.flowEdges());
  const addNode = useCanvasStore(s => s.addNode);
  // TODO: filter nodes by canvasId when multi-canvas state introduced per store
  const addEdgeDomain = useCanvasStore(s => s.addEdge);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = React.useState<ReactFlowInstance>();
  const [menuPos, setMenuPos] = React.useState<{x:number;y:number;flow:{x:number;y:number}}|null>(null);

  const onConnect = React.useCallback((params: any) => {
    addEdgeDomain(params.source, params.target);
  }, [addEdgeDomain]);
  const onInit = React.useCallback((instance: ReactFlowInstance) => setRfInstance(instance), []);

  const onDoubleClick = React.useCallback((event: React.MouseEvent) => {
    if (!wrapper.current || !rfInstance) return;
    const { left, top } = wrapper.current.getBoundingClientRect();
    const projected = rfInstance.project({ x: event.clientX - left, y: event.clientY - top });
    setMenuPos({ x: event.clientX, y: event.clientY, flow: projected });
  }, [rfInstance]);

  const handleSelectModality = React.useCallback((modality: 'text'|'image'|'video'|'audio') => {
    if (menuPos) {
      addNode(modality, menuPos.flow);
      setMenuPos(null);
    }
  }, [menuPos, addNode]);

  return (
    <div className="pt-12 w-full h-[calc(100vh-3rem)]" ref={wrapper}>
      <div className="absolute top-14 left-4 z-40 flex items-center gap-2">
        <Link to="/workspace"><Button variant="outline" size="xs">← К рабочему столу</Button></Link>
        {canvasId && <span className="text-[10px] uppercase tracking-wide text-slate-400">ID: {canvasId}</span>}
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onInit={onInit}
        onDoubleClick={onDoubleClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {menuPos && (
        <AddNodeMenu
          x={menuPos.x}
            y={menuPos.y}
          onSelect={handleSelectModality}
          onClose={() => setMenuPos(null)}
        />
      )}
    </div>
  );
}
