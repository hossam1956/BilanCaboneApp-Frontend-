import { Handle, useHandleConnections } from '@xyflow/react';

const CustomHandle = ({ connectionCount, ...props }) => {
  const connections = useHandleConnections({
    type: props.type,
  });

  return (
    <Handle
      {...props}
      isConnectable={props.isConnectable && connections.length < connectionCount}
    />
  );
};

export default CustomHandle;
