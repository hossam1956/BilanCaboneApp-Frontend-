

import { useCallback, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Input } from "@/components/ui/input";
import CustomHandle from './CustomHandle';
import axios from 'axios';
import { API_TYPE } from '@/Api/FacteurApi';
import { ShieldCheck, ShieldX } from 'lucide-react';
import { Button } from '@/components/ui/button';


export const TypeNode_child_Update = ({ data,isConnectable,editMode }) => {
  const [error, setError] = useState(null);
  const [isActive, setActive] = useState(data.active);

  const onChange = useCallback((evt) => {
    data.onDataChange({ ...data, label: evt.target.value });
  }, [data]);

  const onSwitchChange = useCallback(() => {
    const newActiveState = !isActive;
    setActive(newActiveState);
    data.onDataChange({ ...data, active: newActiveState });
  }, [data, isActive]);

  const checkData = useCallback((txt) => {
    axios.get(`${API_TYPE.Type_Search}?search=${txt}`)
      .then((response) => {
        if (response.data) {
          setError('Ce type existe déjà');
        } else {
          setError(null);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBlur = useCallback((evt) => {
    checkData(evt.target.value);
  }, [checkData]);
  return (
    <>
    <div className={`p-4 border ${error ? 'border-red-500' : 'border-slate-800'} rounded bg-white shadow-2xl`}>
    <CustomHandle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        connectionCount={1}
         className="mb-2 w-16 h-2 border-inherit	 !bg-teal-500 rounded-none"
      />
      <div className="mb-2">
        <Input
          type="text"
          placeholder="Type"
          value={data.label}
          onChange={onChange}
          onBlur={handleBlur}
          className={error ? 'border-red-500' : ''}
          disabled={!data.editMode}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button           disabled={!data.editMode}

          className={`text-cyan-100 rounded-full ${isActive ? "bg-green-700 hover:bg-green-300 hover:text-gray-500" : "bg-red-700 hover:bg-red-300 hover:text-gray-800"}`}
          onClick={onSwitchChange}
        >
          {isActive ? <ShieldCheck /> : <ShieldX />}
        </Button>       
      </div>
          
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
         className="w-16 h-2 border-inherit	 !bg-teal-500 rounded-none"
      />
    </div>

    </>
  );
}