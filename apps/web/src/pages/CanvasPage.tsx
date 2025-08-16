import React from 'react';
import ReactFlow, { Background, Controls, addEdge, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeBox from '../components/NodeBox';
import { useCanvasStore } from '../features/canvas/store';

const nodeTypes = { box: NodeBox };

export default function CanvasPage() {
  const nodes = useCanvasStore(s => s.flowNodes());
  const edges = useCanvasStore(s => s.flowEdges());
  const addNode = useCanvasStore(s => s.addNode);
  const addEdgeDomain = useCanvasStore(s => s.addEdge);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = React.useState<ReactFlowInstance>();

  const onConnect = React.useCallback((params: any) => {
    addEdgeDomain(params.source, params.target);
  }, [addEdgeDomain]);
  const onInit = React.useCallback((instance: ReactFlowInstance) => setRfInstance(instance), []);

  const onDoubleClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (!wrapper.current || !rfInstance) return;
      const { left, top } = wrapper.current.getBoundingClientRect();
      const position = rfInstance.project({ x: event.clientX - left, y: event.clientY - top });
      addNode('text', position); // default modality text for now
    },
    [rfInstance, addNode]
  );

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
    </div>
  );
}
