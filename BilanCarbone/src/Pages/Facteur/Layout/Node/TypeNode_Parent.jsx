import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Input } from "@/Components/ui/input";
import axios from 'axios';
import {  API_TYPE } from '@/Api/FacteurApi';

export const TypeNode_Parent = ({ data, isConnectable }) => {
  const [error, setError] = useState  (null);
  const onChange = useCallback((evt) => {
    data.onDataChange({ label: evt.target.value });
  }, [data]);

  const check_data=(txt)=>{
    axios.get(`${API_TYPE.Type_Search}?search=${txt}`)
    .then((e)=>e.data)
    .then((e)=>{
      if (e) {
        setError('Ce type existe déjà');
      } else {
        setError(null);
      }
    })
    
    .catch((e)=>console.log(e))
  }
  const handleBlur = (evt) => {
    check_data(evt.target.value);
  };
  return (
    <>
    <div className={`p-4 border ${error ? 'border-red-500' : 'border-slate-800'} rounded bg-white shadow-2xl`}>
        <div className="mb-2">
          <Input  type="text" placeholder="Type" value={data.label} onChange={onChange} onBlur={handleBlur}
            className={error ? 'border-red-500' : ''} />
          {error && <p className="text-red-500 text-sm">{error}</p>}

        </div>
        <Handle type="source" position={Position.Bottom} isConnectable={isConnectable} className="w-16 h-2 border-inherit !bg-teal-500 rounded-none" />
      </div>
    </>
  );
};
