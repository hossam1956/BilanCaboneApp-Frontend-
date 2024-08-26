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


export function convertToChartDatacircle(customUserObj) {
  // Initialize the chart data array
  const chartData = [];

  // Iterate over each user object in the array
  customUserObj.forEach(customUserObj => {
    // Extract role information from the customUserObj
    const role = customUserObj.role;

    // Find if the role already exists in the chart data array
    const existingRole = chartData.find(item => item.browser === role);

    // If the role exists, increment the visitors count
    if (existingRole) {
      existingRole.visitors += 1;
    } else {
      // If the role doesn't exist, create a new entry
      chartData.push({
        browser: role,
        visitors: 1,
        fill: `var(--color-${role})`
      });
    }
  });

  return chartData;
}
export function filterChartData(chartData, days = null, startDate = null, endDate = null) {
  let cutoffDate = null;
  const today = new Date();

  if (days !== null) {
    // Calculate the cutoff date based on the selected number of days
    cutoffDate = new Date(today.setDate(today.getDate() - days));
  }

  // Convert startDate and endDate to Date objects if provided
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : today;

  return chartData.filter(data => {
    const dataDate = new Date(data.date);

    // If days is provided, filter by days; otherwise, filter by the date range
    if (days !== null) {
      return dataDate >= cutoffDate;
    } else if (start && end) {
      return dataDate >= start && dataDate <= end;
    }
    return false;
  });
}



export function convertDatatochart(entr, userData) {
  // Step 1: Create a map to aggregate `entreprise` data
  const entrepriseMap = new Map();
  entr.forEach(entry => {
    const date = entry.createdDate.split('T')[0]; // Extract date part from createdDate
    if (!entrepriseMap.has(date)) {
      entrepriseMap.set(date, { entreprise: 0, User: 0 });
    }
    entrepriseMap.get(date).entreprise += 1; // Increment the count
  });

  // Step 2: Create a map to aggregate `User` data
  const userMap = new Map();
  userData.forEach(user => {
    const date = new Date(user.customUserRepresentation.userRepresentation.createdTimestamp).toISOString().split('T')[0];
    if (!userMap.has(date)) {
      userMap.set(date, { entreprise: 0, User: 0 });
    }
    userMap.get(date).User += 1; // Increment the count
  });

  // Step 3: Combine the maps into the final chartData array
  const chartData = [];
  const allDates = new Set([...entrepriseMap.keys(), ...userMap.keys()]);
  
  allDates.forEach(date => {
    chartData.push({
      date: date,
      entreprise: entrepriseMap.has(date) ? entrepriseMap.get(date).entreprise : 0,
      User: userMap.has(date) ? userMap.get(date).User : 0
    });
  });

  // Sort by date if needed
  chartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return chartData;
}