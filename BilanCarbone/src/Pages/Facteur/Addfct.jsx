import { useState, useRef, useCallback, useEffect } from 'react';
import { ReactFlow, Controls, Background, useNodesState, useEdgesState, addEdge, MiniMap, reconnectEdge, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SideBare from "./Layout/SideBare";
import { FacteurNode } from "./Layout/Node/FacteurNode";
import { TypeNode_Parent } from "./Layout/Node/TypeNode_Parent";
import { TypeNode_child } from "./Layout/Node/TypeNode_child";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Plus, Eraser } from 'lucide-react';
import { transformData_json } from '@/Function/mapper';
import { API_TYPE } from '@/Api/FacteurApi';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/Components/ui/alert-dialog"
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/KeycloakConfig/KeycloakConn';

const initialNodes =[
]
const initialEdges = [
]
const nodeTypes = { Facteur: FacteurNode, Type_parent: TypeNode_Parent, Type_child: TypeNode_child };

export function Addfct() {
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [nodeData, setNodeData] = useState({});
  const [showAlertDialog, setShowAlertDialog] = useState(false); // Added state for AlertDialog
  const [id,setid]=useState(null);
  const navigate = useNavigate();

  const onConfirmDelete = () => {
    if (selectedElement) {
      if (selectedElement.type === 'node') {
        setNodes((nds) => nds.filter((node) => node.id !== selectedElement.id));
        setNodeData((prevData) => {
          const newData = { ...prevData };
          delete newData[selectedElement.id];
          return newData;
        });
      } else if (selectedElement.type === 'edge') {
        setEdges((eds) => eds.filter((edge) => edge.id !== selectedElement.id));
      }
      setSelectedElement(null);
    }
    setShowDialog(false);
  };

  const handleElementRightClick = (event, element) => {
    event.preventDefault();
    setSelectedElement(element);
    setShowDialog(true);
  };

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find(node => node.id === params.source);
      const targetNode = nodes.find(node => node.id === params.target);
      
      // Prevent connecting TypeNode_child to TypeNode_child
      if (sourceNode.type === 'Type_child' && targetNode.type === 'Type_child') {
        return;
      }

      setEdges((els) => addEdge(params, els));
    },
    [nodes, setEdges]
  );

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge, newConnection) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_, edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }
    edgeReconnectSuccessful.current = true;
  }, []);

  const handleDataChange = useCallback(
    (id, data) => {
      setNodeData((prev) => ({ ...prev, [id]: data }));
      setNodes((nds) =>
        nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...data } } : node))
      );
    },
    [setNodes]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };
      const newNode = {
        id: (nodes.length + 1).toString(),
        type,
        position,
        data: {
          label: `${type} node`,
          onDataChange: (newData) => handleDataChange((nodes.length + 1).toString(), newData), // Pass onDataChange

        },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, setNodes, handleDataChange]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const clearFlow = () => {
    setid(null)
    setNodes([]);
    setEdges([]);
    setNodeData({});
  };

  const handlesave = () => {
    const res = transformData_json(nodes, edges);  
    apiClient.post(API_TYPE.Type, JSON.stringify(res[0], null, 2), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((e) => e.data)
      .then((e)=>{
        setid(e.id)
        setShowAlertDialog(true); // Show the alert dialog on success
      })
      .catch((error) => {
        console.error("Error activating data:", error);
        const currentdate = new Date();
        toast.error(`Problème d'ajoute facteur avec le type `, {
          description: `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} - - - ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`,
        });
      });
  };
  const handleAlertDialogAction = (action) => {
    setShowAlertDialog(false);
    if (action === 'view') {
      navigate(`/facteur/${id}`); // Navigate to the factuer page
    } else if (action === 'add') {
      clearFlow(); // Reset the component
    }
  };
  return (
    <ReactFlowProvider>
      <div className="flex flex-1 relative">
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onReconnectStart={onReconnectStart}
            onReconnectEnd={onReconnectEnd}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeContextMenu={(event, node) => handleElementRightClick(event, { type: 'node', id: node.id })}
            onEdgeContextMenu={(event, edge) => handleElementRightClick(event, { type: 'edge', id: edge.id })}
            attributionPosition="top-center"
            fitView
            snapToGrid
            minZoom={0.01}
            maxZoom={1}
            zoomOnScroll={true}
            zoomOnPinch={true}
            className="bg-teal-50"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        <Card className="ml-1 flex flex-col justify-between h-full border-r border-gray-300 p-4 bg-gray-50">
          <div className="flex justify-center m-1">
            <SideBare />
          </div>
          <div className="flex justify-center">
            <Button variant="destructive" className="w-1/2 m-2" onClick={clearFlow}>
              <Eraser /> Effacer
            </Button>
            <Button className="w-1/2 m-2" onClick={handlesave}>
              <Plus /> Sauvegarder
            </Button>
          </div>
        </Card>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce {selectedElement?.type === 'node' ? 'nœud' : 'bord'} ?
            </DialogDescription>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Annuler</Button>
              <Button variant="destructive" onClick={onConfirmDelete}>Supprimer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Enregistrement réussi</AlertDialogTitle>
              <AlertDialogDescription>
                Les données ont été sauvegardées avec succès. Que souhaitez-vous faire ensuite ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleAlertDialogAction('add')}>Retourner au composant d'ajout</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleAlertDialogAction('view')}>Aller à la vue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </ReactFlowProvider>
  );
  
}

export default Addfct;
