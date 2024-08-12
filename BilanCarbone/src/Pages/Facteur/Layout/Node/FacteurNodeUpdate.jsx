import React, { useCallback, useState } from 'react';
import { Position } from '@xyflow/react';
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
  SelectLabel
} from "@/Components/ui/select";
import CustomHandle from './CustomHandle';
import { API_FACTEUR } from '@/Api/FacteurApi';
import { ShieldCheck, ShieldX } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { apiClient } from '@/KeycloakConfig/KeycloakConn';

export const FacteurNodeUpdate = ({ data, isConnectable }) => {
  const [errorinput, setErrorinput] = useState(null);


  const handleNom = useCallback((event) => {
    const newNom = event.target.value;
      data.onDataChange({...data,nom:newNom});
  }, [data]);

  const handleEmis = useCallback((event) => {
    const newEmission = parseFloat(event.target.value);
      data.onDataChange({...data,facteur_emission:newEmission});

  }, [data]);

  const handleType = useCallback((value) => {
      data.onDataChange({...data,type:value});
  }, [data]);

  const checkData = useCallback((txt) => {
    apiClient.get(`${API_FACTEUR.Facteur_Search}?search=${txt}`)
      .then((response) => {
        if (response.data) {
          setErrorinput('Ce facteur existe déjà');
        } else {
          setErrorinput(null);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBlur = useCallback((event) => {
    checkData(event.target.value);
  }, [checkData]);
  const [isActive, setActive] = useState(data.active);

  const onSwitchChange = useCallback(() => {
    const newActiveState = !isActive;
    setActive(newActiveState);
    data.onDataChange({ ...data, active: newActiveState });
  }, [data, isActive]);

  return (
    <div className={`p-4 border ${errorinput ? 'border-red-500' : 'border-slate-800'} rounded bg-white shadow-2xl`}>
      <CustomHandle
        type="target"
        position={Position.Top}
        className="mb-2 w-16 h-2 border-inherit !bg-teal-500 rounded-none"
        isConnectable={isConnectable}
        connectionCount={1}
      />
      <div className="mb-2">
        <Input
          type="text"
          name="facteur"
          placeholder="Facteur"
          value={data.nom}
          onChange={handleNom}
          onBlur={handleBlur}
          disabled={!data.editMode}
          className={errorinput ? 'border-red-500' : ''}
        />
        {errorinput && <p className="text-red-500 text-sm">{errorinput}</p>}
      </div>
      <div className="mb-2">
        <Input
          type="number"
          name="facteur_emission"
          placeholder="Facteur d'émission"
          value={data.facteur_emission}
          onChange={handleEmis}
          disabled={!data.editMode}
        />
      </div>
      <div className="mb-2">
        <Select value={data.type} onValueChange={handleType} disabled={!data.editMode}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="kilogramme">kilogramme</SelectItem>
              <SelectItem value="litre">litre</SelectItem>
              <SelectItem value="Mètre cube">Mètre cube</SelectItem>
              <SelectItem value="kilowattheure">kilowattheure</SelectItem>
              <SelectItem value="Kilomètre">Kilomètre</SelectItem>
              <SelectItem value="tonne">tonne</SelectItem>
              <SelectItem value="passager-kilomètre">passager-kilomètre</SelectItem>
              <SelectItem value="hectare">hectare</SelectItem>
              <SelectItem value="Mètre carré">Mètre carré</SelectItem>
              <SelectItem value="anne">anne</SelectItem>
              <SelectItem value="Heure">Heure</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button
        disabled={!data.editMode}
        className={`text-cyan-100 rounded-full ${data.active ? "bg-green-700 hover:bg-green-300 hover:text-gray-500" : "bg-red-700 hover:bg-red-300 hover:text-gray-800"}`}
        onClick={onSwitchChange}
      >
        {data.active ? <ShieldCheck /> : <ShieldX />}
      </Button>
    </div>
  );
};

export default React.memo(FacteurNodeUpdate);
