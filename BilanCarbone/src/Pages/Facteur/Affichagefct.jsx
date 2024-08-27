import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ReactFlow, Controls, Background, useNodesState, useEdgesState, addEdge, MiniMap, reconnectEdge, ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import SideBare from "./Layout/SideBare";
import { FacteurNodeUpdate } from "./Layout/Node/FacteurNodeUpdate";
import { TypeNode_Parent_Update } from "./Layout/Node/TypeNode_Parent_Update";
import { TypeNode_child_Update } from "./Layout/Node/TypeNode_child_Update";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Plus, PencilOff, Pencil } from 'lucide-react';
import { reverseTransformData, transformData_json } from '@/Function/mapper';
import { API_TYPE } from '@/Api/FacteurApi';
import { useParams } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { toast } from 'sonner';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogFooter, AlertDialogDescription
} from '@/Components/ui/alert-dialog';
import Page404 from '../error/Page404';
import Page403 from '../error/Page403';
import keycloak from "@/KeycloakConfig/keycloak";
import { isAdmin } from '@/hooks/useUserRole';
import { apiClient } from '@/KeycloakConfig/KeycloakConn';

const initialNodes = [];
const initialEdges = [];
const nodeTypes = {
  Facteur: FacteurNodeUpdate,
  Type_parent: TypeNode_Parent_Update,
  Type_child: TypeNode_child_Update
};

export function Affichagefct() {
  const edgeReconnectSuccessful = useRef(true);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [nodeData, setNodeData] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [nodesModified, setNodesModified] = useState(false);
  const [edgesModified, setEdgesModified] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [errorStatus, setErrorStatus] = useState(null);
  const [global,setglobal]=useState(true)
  const userIsAdmin = isAdmin();
  const [globalid , setglobalid]=useState(0);
  const getData = useCallback(() => {
    apiClient
      .get(`${API_TYPE.Type}/${id}?all=true`)
      .then((response) => response.data)
      .then((data) => {
        if (userIsAdmin) {
          setglobal(true);
        } else {
          setglobal(data.entreprise !== undefined && data.entreprise !== null);
        }
        setglobalid(data.id)
        const { nodes_res, edges_res } = reverseTransformData(data, handleDataChange);
        setNodes(nodes_res);
        setEdges(edges_res);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false)
        if (error.response) {
          if (error.response.status === 500) {
            setErrorStatus(500);
          } else if (error.response.status === 403) {
            setErrorStatus(403);
          }
        } else {
          console.error(error);
        }
      });
  }, [id]);
  

  const handleElementRightClick = (event, element) => {
    if (editMode) {
      event.preventDefault();
      setSelectedElement(element);
      setShowDialog(true);
    }
  };

  const onConfirmDelete = () => {
    if (selectedElement) {
      if (selectedElement.type === 'node') {
        setNodes((nds) => nds.filter((node) => node.id !== selectedElement.id));
        setNodeData((prevData) => {
          const newData = { ...prevData };
          delete newData[selectedElement.id];
          return newData;
        });
        setNodesModified(true);
      } else if (selectedElement.type === 'edge') {
        setEdges((eds) => eds.filter((edge) => edge.id !== selectedElement.id));
        setEdgesModified(true);
      }
      setSelectedElement(null);
    }
    setShowDialog(false);
  };

  const handleDataChange = useCallback(
    (id, data) => {
      setNodeData((prev) => ({ ...prev, [id]: data }));
      setNodes((nds) =>
        nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...data } } : node))
      );
      setNodesModified(true); 
    },
    [setNodes]
  );

  const onConnect = useCallback(
    (params) => {
      if (editMode) {
        const sourceNode = nodes.find((node) => node.id === params.source);
        const targetNode = nodes.find((node) => node.id === params.target);

        if (sourceNode.type === 'Type_child' && targetNode.type === 'Type_child') {
          return;
        }

        setEdges((els) => addEdge(params, els));
        setEdgesModified(true);
      }
    },
    [editMode, nodes, setEdges]
  );

  const onReconnectStart = useCallback(() => {
    if (editMode) {
      edgeReconnectSuccessful.current = false;
    }
  }, [editMode]);

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      if (editMode) {
        edgeReconnectSuccessful.current = true;
        setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
        setEdgesModified(true);
      }
    },
    [editMode]
  );

  const onReconnectEnd = useCallback(
    (_, edge) => {
      if (editMode && !edgeReconnectSuccessful.current) {
        setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        setEdgesModified(true);
      }
      edgeReconnectSuccessful.current = true;
    },
    [editMode]
  );

  const onDrop = useCallback(
    (event) => {
      if (editMode) {
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
            active: true,
            editMode,
            onDataChange: (data) => handleDataChange(newNode.id, data),
          },
        };
        setNodes((nds) => nds.concat(newNode));
        setNodesModified(true);
      }
    },
    [editMode, nodes, setNodes, handleDataChange]
  );

  const onDragOver = useCallback(
    (event) => {
      if (editMode) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
      }
    },
    [editMode]
  );

  const clearFlow = () => {
    setNodes([]);
    setEdges([]);
    setNodesModified(false);
    setEdgesModified(false);
  };

  const toggleEditMode = () => {
    if (editMode) {
      const changesMade = nodesModified || edgesModified;
      if (changesMade) {
        setShowAlertDialog(true);
      } else {
        setNodesModified(false);
        setEdgesModified(false);
        setEditMode(false);
        setShowCard(false);
      }
    } else {
      setEditMode(true);
      setShowCard(true);
    }
  };

  const handleSave = () => {
    const res = transformData_json(nodes, edges);
    apiClient
      .put(`${API_TYPE.Type}/${globalid}`, JSON.stringify(res[0], null, 2), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((e) => e.data)
      .then(()=>{
        toast.success(`les facteur et les types sont modifier`, {
          description: new Date().toLocaleString(),
        });
        setNodesModified(false);
        setEdgesModified(false);
        setEditMode(false);
        setShowCard(false);
        getData()
      })
      .catch((error) => {
        console.error('Error activating data:', error);
        toast.error(`Problème de modification facteur avec le type`, {
          description: new Date().toLocaleString(),
        });
      });
    
  };

  const handleReturn = () => {
    getData();
    setNodesModified(false);
    setEdgesModified(false);
    setEditMode(false);
    setShowCard(false);
  };

  useEffect(() => {
    getData();
  }, [id,errorStatus]);

  useEffect(() => {
    toogleedit();
  }, [editMode]);

  const toogleedit = () => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          editMode
        }
      }))
    );
  };
  if (errorStatus === 500) {
    return <Page404 />;
  }

  if (errorStatus === 403) {
    return <Page403 />;
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <MoonLoader color="#16537e" loading size={40} />
      </div>
    );
  }

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
            zoomOnScroll
            zoomOnPinch
            className="bg-teal-50"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
        {showCard && (
          <>
            <Card className="ml-1 flex flex-col justify-between h-full border-r border-gray-300 p-4 bg-gray-50">
              <div className="flex justify-center m-1">
                <SideBare />
              </div>
              <div className="flex justify-center">
                <Button className="w-1/2 m-2" onClick={handleSave}>
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
                  <AlertDialogTitle>Sauvegarder</AlertDialogTitle>
                  <AlertDialogDescription>Vous voulez revenir ?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction onClick={handleSave}>Sauvegarder</AlertDialogAction>
                  <AlertDialogAction onClick={handleReturn}>Retour</AlertDialogAction>
                  <AlertDialogCancel onClick={() => setShowAlertDialog(false)}>Annuler</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
          {userIsAdmin|| (global) ? (
      <Button onClick={toggleEditMode} className="absolute top-2 right-2">
        {editMode ? <PencilOff /> : <Pencil />} {editMode ? 'Quitter' : 'Activer'}
      </Button>
    ) : null}
      </div>
    </ReactFlowProvider>
  );
}

export default Affichagefct;
