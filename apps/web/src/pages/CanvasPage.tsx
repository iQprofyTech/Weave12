import React from 'react';
import ReactFlow, { Background, Controls, addEdge, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeBox from '../components/NodeBox';
import { useCanvasStore } from '../features/canvas/store';
import AddNodeMenu from '../components/AddNodeMenu';

const nodeTypes = { box: NodeBox };

export default function CanvasPage() {
  const nodes = useCanvasStore(s => s.flowNodes());
  const edges = useCanvasStore(s => s.flowEdges());
  const addNode = useCanvasStore(s => s.addNode);
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
