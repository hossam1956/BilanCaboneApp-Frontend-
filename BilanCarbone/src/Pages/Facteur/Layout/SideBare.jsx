

const SideBare = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64">
    <h2 className="text-lg font-semibold mb-4 text-gray-700">Palette de Nœuds</h2>
    <p className="mb-4 text-gray-500">Faites glisser ces nœuds sur le canevas :</p>
    <div
      className="dndnode input bg-blue-100 border border-blue-500 p-2 mb-2 rounded"
      onDragStart={(event) => onDragStart(event, 'Type_parent')}
      draggable
    >
      <div className="text-center font-medium text-blue-700">Nœud Type Parent</div>
    </div>
    <div
      className="dndnode bg-gray-100 border border-gray-800 p-2 mb-2 rounded"
      onDragStart={(event) => onDragStart(event, 'Type_child')}
      draggable
    >
      <div className="text-center font-medium text-gray-700">Nœud Type Enfant</div>
    </div>
    <div
      className="dndnode output bg-pink-100 border border-pink-500 p-2 rounded"
      onDragStart={(event) => onDragStart(event, 'Facteur')}
      draggable
    >
      <div className="text-center font-medium text-pink-700">Nœud Facteur</div>
    </div>
  </aside>
  
  );
};

export default SideBare;
