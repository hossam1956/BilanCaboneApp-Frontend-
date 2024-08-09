import { useCallback, useState, useEffect } from 'react';
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
import axios from 'axios';
import { API_FACTEUR } from '@/Api/FacteurApi';
import { MoonLoader } from 'react-spinners';
import { ShieldX } from 'lucide-react';
import React from 'react';
import { apiClient } from '@/KeycloakConfig/KeycloakConn';

export const FacteurNode = ({ data, isConnectable }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [listType, setListType] = useState([]);
  const [errorinput, setErrorinput] = useState  (null);

  const [facteur, setFacteur] = useState({
    nom: "",
    facteur_emission: 0,
    type: ""
  });

  const onChange = useCallback((updatedFacteur) => {
    data.onDataChange(updatedFacteur);
  }, [data]);

  const getData = async () => {
    try {
      const response = await axios.get(API_FACTEUR.Facteur_type);
      setListType(response.data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNom = (event) => {
    const newNom = event.target.value;
    setFacteur((prevFacteur) => {
      const updatedFacteur = { ...prevFacteur, nom: newNom };
      onChange(updatedFacteur);
      return updatedFacteur;
    });
  };

  const handleEmis = (event) => {
    const newEmission = parseFloat(event.target.value);
    setFacteur((prevFacteur) => {
      const updatedFacteur = { ...prevFacteur, facteur_emission: newEmission };
      onChange(updatedFacteur);
      return updatedFacteur;
    });
  };

  const handleType = (value) => {
    setFacteur((prevFacteur) => {
      const updatedFacteur = { ...prevFacteur, type: value };
      onChange(updatedFacteur);
      return updatedFacteur;
    });
  };


  const check_data=(txt)=>{
    axios.get(`${API_FACTEUR.Facteur_Search}?search=${txt}`)
    .then((e)=>e.data)
    .then((e)=>{
      if (e) {
        setErrorinput('Ce facteur existe déjà');
      } else {
        setErrorinput(null);
      }
    })
    
    .catch((e)=>console.log(e))
  }
  const handleBlur = (evt) => {
    check_data(evt.target.value);
  };

  if (loading) {
    return (
      <div className="p-4 border border-slate-800 rounded bg-white shadow-2xl">
        <MoonLoader
          color="#0043ff"
          loading
          size={40}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border border-slate-800 rounded bg-white shadow-2xl flex flex-col items-center justify-center h-full">
        <ShieldX className="text-red-600 mb-2" />
        <span>Erreur lors du chargement des données</span>
      </div>
    );
  }
  

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
        <Input type="text" name="facteur" placeholder="Facteur" value={facteur.nom} onChange={handleNom} onBlur={handleBlur}
            className={errorinput ? 'border-red-500' : ''} />
          {errorinput && <p className="text-red-500 text-sm">{errorinput}</p>}
      </div>
      <div className="mb-2">
        <Input type="number" name="facteur_emission" placeholder="Facteur d'émission" value={facteur.facteur_emission} onChange={handleEmis} />
      </div>
      <div>
        <Select value={facteur.type} onValueChange={handleType}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionnez un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              {listType.map((type, index) => (
                <SelectItem key={index} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default React.memo(FacteurNode);
