import React from 'react';
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState, ReactFlowInstance } from 'reactflow';
import 'reactflow/dist/style.css';
import NodeBox from '../components/NodeBox';

const nodeTypes = { box: NodeBox };

export default function CanvasPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const wrapper = React.useRef<HTMLDivElement>(null);
  const [rfInstance, setRfInstance] = React.useState<ReactFlowInstance>();

  const onConnect = React.useCallback((params: any) => setEdges((eds) => addEdge(params, eds)), []);
  const onInit = React.useCallback((instance: ReactFlowInstance) => setRfInstance(instance), []);

  const onDoubleClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (!wrapper.current || !rfInstance) return;
      const { left, top } = wrapper.current.getBoundingClientRect();
      const position = rfInstance.project({ x: event.clientX - left, y: event.clientY - top });
      const newNode = { id: `${nodes.length + 1}`, type: 'box', position, data: {} };
      setNodes((nds) => nds.concat(newNode));
    },
    [rfInstance, nodes.length, setNodes]
  );

  return (
    <div className="pt-12 w-full h-[calc(100vh-3rem)]" ref={wrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
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
