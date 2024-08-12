export function transformData_json(nodes, edges) {
  const nodeMap = {};
  nodes.forEach(node => {
    nodeMap[node.id] = node.data;
  });

  const typeMap = {};
  nodes.forEach(node => {
    if (node.type === 'Type_parent') {
      typeMap[node.id] = {
        nom_type: node.data.label,
        types: [],
        facteurs: [],
        active: true,
        id: node.data.id_type
      };
    }
  });

  nodes.forEach(node => {
    if (node.type === 'Type_child') {
      const parentEdge = edges.find(edge => edge.target === node.id);
      if (parentEdge) {
        const parentTypeId = parentEdge.source;
        if (typeMap[parentTypeId]) {
          typeMap[parentTypeId].types.push({
            nom_type: node.data.label,
            types: [],
            facteurs: [],
            active: true,
            id: node.data.id_type || null
          });
        }
      }
    }
  });

  nodes.forEach(node => {
    if (node.type === 'Facteur') {
      const parentEdge = edges.find(edge => edge.target === node.id);
      if (parentEdge) {
        const parentTypeId = parentEdge.source;
        const parentType = nodes.find(item => item.id === parentTypeId);
        if (parentType) {
          let grandparentTypeId = parentTypeId;
          let childType = typeMap[grandparentTypeId];
          if (parentType.type === 'Type_child') {
            grandparentTypeId = edges.find(edge => edge.target === parentTypeId)?.source;
            let child_node=nodes.find(file=>file.id==parentTypeId)
            childType = typeMap[grandparentTypeId].types.find(file => file.nom_type === child_node.data.label);

          }
          if (childType) {
            childType.facteurs.push({
              nom_facteur: node.data.nom,
              unit: node.data.type,
              emissionFactor: node.data.facteur_emission,
              active: true,
              id: node.data.id_facteur || null
            });
          }
        }
      }
    }
  });

  // Convert typeMap to final array format
  return transformToRequestFormat(Object.values(typeMap));
}
const transformToRequestFormat = (data) => {
  return data.map(type => ({
    nom_type: type.nom_type,
    types: type.types ? transformToRequestFormat(type.types) : [],
    facteurs: type.facteurs.map(facteur => ({
      nom_facteur: facteur.nom_facteur,
      unit: facteur.unit,
      emissionFactor: facteur.emissionFactor,
      active: facteur.active,
      id: facteur.id,
    })),
    active: type.active,
    id: type.id,
  }));
};
export function reverseTransformData(json, handleDataChange) {
  const nodes_res = [];
  const edges_res = [];

  const createNode = (id, type, position, data) => {
    return {
      id,
      type,
      position,
      data: { ...data, onDataChange: (data) => handleDataChange(id, data),editMode:false },
      measured: {
        width: 221,
        height: type === 'Facteur' ? 170 : 82,
      },
      selected: false,
      dragging: false,
    };
  };

  let nodeId = 1;

  // Positioning constants
  const typeParentPosition = { x: -200, y: -100 };
  const typeChildInitialPosition = { x: -400, y: 75 };
  const facteurInitialPosition = { x: -500, y: 260 };
  const typeChildXIncrement = 550;
  const facteurXIncrement = 300;

  const createFacteurNode = (facteur, parentId, positionX) => {
    const node = createNode(
      nodeId.toString(),
      'Facteur',
      { x: positionX, y: facteurInitialPosition.y },
      {
        label: 'Facteur node',
        nom: facteur.nom_facteur,
        facteur_emission: facteur.emissionFactor,
        type: facteur.unit,
        active: facteur.active,
        id_facteur:facteur.id,

      }
    );
    nodes_res.push(node);
    edges_res.push({
      source: parentId,
      target: node.id,
      id: `xy-edge__${parentId}-${node.id}`,
    });
    nodeId++;
  };

  const createTypeChildNode = (childType, parentId, positionX) => {
    const node = createNode(
      nodeId.toString(),
      'Type_child',
      { x: positionX, y: typeChildInitialPosition.y },
      {
        label: childType.nom_type,
        active: childType.active,
        id_type:childType.id,
      }
    );
    nodes_res.push(node);
    edges_res.push({
      source: parentId,
      target: node.id,
      id: `xy-edge__${parentId}-${node.id}`,
    });
    nodeId++;
    let facteurPositionX = positionX;
    childType.facteurs.forEach((facteur) => {
      createFacteurNode(facteur, node.id, facteurPositionX);
      facteurPositionX += facteurXIncrement;
    });
  };

  const parentNode = createNode(
    nodeId.toString(),
    'Type_parent',
    { x: typeParentPosition.x, y: typeParentPosition.y },
    {
      label: json.nom_type,
      active: json.active,
      id_type:json.id,
    }
  );
  nodes_res.push(parentNode);
  nodeId++;

  if (json.facteurs) {
    let facteurPositionX = facteurInitialPosition.x;
    json.facteurs.forEach((facteur) => {
      createFacteurNode(facteur, parentNode.id, facteurPositionX);
      facteurPositionX += facteurXIncrement;
    });
  }

  if (json.files) {
    let typeChildPositionX = typeChildInitialPosition.x;
    json.files.forEach((childType) => {
      createTypeChildNode(childType, parentNode.id, typeChildPositionX);
      typeChildPositionX += typeChildXIncrement;
    });
  }

  return { nodes_res, edges_res };
}
