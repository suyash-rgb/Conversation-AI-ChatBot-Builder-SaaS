import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
} from 'reactflow';
import { nodeTypes } from './flowConfig';
import 'reactflow/dist/style.css';

let id = 3;
const getId = () => `${id++}`;

function FlowCanvasInner() {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChangeBase] = useNodesState([]);
  const [edges, setEdges, onEdgesChangeBase] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [copiedNodes, setCopiedNodes] = useState([]);

  React.useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'c') {
      setCopiedNodes(selectedNodes);
    }

    if (event.ctrlKey && event.key === 'v') {
      if (copiedNodes.length === 0) return;

      const newClones = copiedNodes.map((node) => {
        const newId = getId();
        return {
          ...node,
          id: newId,
          position: {
            x: node.position.x + 50,
            y: node.position.y + 50,
          },
          selected: false,
          data: {
            ...node.data,
            updateNode,
            duplicateNode,
          },
        };
      });

      setNodes((nds) => [...nds, ...newClones]);
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
 }, [copiedNodes, selectedNodes]);


  const duplicateNode = (nodeId) => {
  const original = nodes.find((n) => n.id === nodeId);
  if (!original) return;

  const newId = getId();
  const newPosition = {
    x: original.position.x + 50,
    y: original.position.y + 50,
  };

  const clonedNode = {
   ...original,
   id: newId,
   position: newPosition,
   data: {
     ...original.data,
     updateNode,
     duplicateNode,
   },
  };

   setNodes((nds) => [...nds, clonedNode]);
  };

  const updateNode = useCallback((id, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                ...newData,
                updateNode,
                duplicateNode,
              },
            }
          : node
      )
    );
  }, [setNodes]);

  const onNodesChange = useCallback((changes) => {
    onNodesChangeBase(changes);
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          updateNode,
        },
      }))
    );
  }, [onNodesChangeBase, setNodes, updateNode]);

  const onEdgesChange = useCallback((changes) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (type) => {
    if (!reactFlowInstance) return;

    const center = reactFlowInstance.project({
      x: window.innerWidth / 2 - 150,
      y: window.innerHeight / 2 - 150,
    });

    //Step 2; compute isFirstMessageNode
    const isFirst = nodes.filter((n) => n.type === 'message').length === 0;

    const newNode = {
      id: getId(),
      type,
      position: center,
      data:
        type === 'message'
          ? { 
              text: '', 
              isFirstMessageNode: isFirst,
              updateNode, 
              duplicateNode }
          : type === 'options'
          ? { options: [''], updateNode }
          : { option: '', updateNode },
          
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}, []);

const onDrop = useCallback((event) => {
  event.preventDefault();

  const type = event.dataTransfer.getData('application/reactflow');

  if (!type || !reactFlowInstance) return;

  const bounds = reactFlowWrapper.current.getBoundingClientRect();
  const position = reactFlowInstance.project({
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
  });

  const newNode = {
    id: getId(),
    type,
    position,
    data:
      type === 'message'
        ? { text: '', updateNode, duplicateNode }
        : type === 'options'
        ? { options: [''], updateNode }
        : { option: '', updateNode },
  };

  setNodes((nds) => [...nds, newNode]);
}, [reactFlowInstance, updateNode, duplicateNode]);


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r space-y-3">
        <p className="text-lg font-bold mb-2">➕ Add Nodes</p>

        <button
          className="w-full p-2 bg-white border rounded shadow text-left text-sm hover:bg-gray-50"
          onClick={() => addNode('message')}
        >
          💬 Message Node
        </button>

        <button
          className="w-full p-2 bg-yellow-100 border rounded shadow text-left text-sm hover:bg-yellow-200"
          onClick={() => addNode('options')}
        >
          🔘 Options Node
        </button>

        <button
          className="w-full p-2 bg-green-100 border rounded shadow text-left text-sm hover:bg-green-200"
          onClick={() => addNode('option')}
        >
          ⚪ Option Node
        </button>

        <button
          className="w-full p-2 bg-gray-200 border rounded shadow text-left text-sm hover:bg-gray-300"
          onClick={() => addNode('decision')}
        >
         🔀 Decision Node
        </button>


        <button
          className="w-full p-2 bg-blue-100 border rounded shadow text-left text-sm hover:bg-blue-200"
          onClick={() => addNode('sendEmail')}
        >
         📧 Send Email Node
        </button>

        <button
          className="w-full p-2 bg-purple-100 border rounded shadow text-left text-sm hover:bg-purple-200"
          onClick={() => addNode('carousel')}
        >
         📚 Carousel Node
        </button>

        <button
          className="w-full p-2 bg-blue-100 border rounded shadow text-left text-sm hover:bg-blue-200"
          onClick={() => addNode('sendImage')}
        >
          🖼 Send Image Node
        </button>

        <button
          className="w-full p-2 bg-gray-100 border rounded shadow text-left text-sm hover:bg-gray-200"
          onClick={() => addNode('sendDocument')}
        >
          📄 Send Document Node
        </button>

        <button
          className="w-full p-2 bg-red-100 border rounded shadow text-left text-sm hover:bg-red-200"
          onClick={() => addNode('sendVideo')}
        >
         🎥 Send Video Node
        </button>

        <button
          className="w-full p-2 bg-indigo-100 border rounded shadow text-left text-sm hover:bg-indigo-200"
          onClick={() => addNode('userDetails')}
        >
         🧾 User Details Node
        </button>

        <button
          className="w-full p-2 bg-yellow-100 border rounded shadow text-left text-sm hover:bg-yellow-200"
          onClick={() => addNode('query')}
        >
          🟨 Query Node
        </button>


        <button
          className="w-full p-2 bg-teal-100 border rounded shadow text-left text-sm hover:bg-teal-200"
          onClick={() => addNode('feedback')}
        >
          📝 Feedback Node
        </button>


        <button
          className="w-full p-2 bg-pink-100 border rounded shadow text-left text-sm hover:bg-pink-200"
          onClick={() => addNode('humanTakeover')}
        >
         🧑‍💼 Human Takeover Node
        </button>



      </div>

      {/* Flow Canvas */}
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          connectable
          onSelectionChange={({ nodes }) => setSelectedNodes(nodes)}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  );
}
