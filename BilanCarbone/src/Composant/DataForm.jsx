import { apiClient } from "@/KeycloakConfig/KeycloakConn";
import React, { useEffect, useState } from "react";
import {validateInfoConsumption} from "@/Validation/RegexValidation";
const DataForm=({date,IDs})=>{

    
    const dataMaps=JSON.parse(localStorage.getItem("dataMaps"))[localStorage.getItem("idUser")][date]
    const [facteursData, setFacteursData] = useState([]);
    const [isFacteursDataEmpty,setIsFacteursDataEmpty]=useState(false)
    const [numbers,setNumbers]=useState({});
    const [errors, setErrors] = useState({});
    const fetchFacteur=async(ID)=>{
        try{
            const response=await apiClient.get(`/facteur/${ID}`)
            return response.data
        }
        catch(e){
            console.log("Erreur:"+e)
        }
    }
    useEffect(() => {
      const fetchAllFacteurs = async () => {
        try{
          const fetchedData = await Promise.all(IDs.map(fetchFacteur));
          setFacteursData(fetchedData.filter((data) => data !== null));
        }
        catch(e){setIsFacteursDataEmpty(true)}
       
      };
    
        fetchAllFacteurs();
    }, [IDs]);
    
    const handleNumberChange = (id, value) => {
      setNumbers((prevNumbers) => ({
        ...prevNumbers,
        [id]: value,
      }));
    };
    const handleErrorSet = (id, validationErrors) => {
      setErrors((prevNumbers) => ({
        ...prevNumbers,
        [id]: validationErrors,
      }));
    };
    
    const handleSubmit=(e)=>{
      e.preventDefault()
      /*Object.entries(numbers).forEach(([id, value]) => {
        const validationErrors = validateInfoConsumption(value);
        if (validationErrors.length > 0) {
          handleErrorSet(id, validationErrors);
        }
      });*/
      Object.entries(numbers).forEach(([id, value]) => {
        const bodyRequest={
          idUtilisateur:localStorage.getItem("idUser"),
          idFacteur:id,
          quantity:value 
          }
          console.log(bodyRequest)
        }
      );
     
      
    }
    
    return(
        <div>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Calendrier Formulaire
            </h5>
            <div>
              <label
                htmlFor="Date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                name="Date"
                id="Date"
                className={`border text-black font-bold text-center text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                defaultValue={date}
                disabled
              />
            </div>
            { !isFacteursDataEmpty? 
              facteursData.map((facteurData)=>(

                <div key={facteurData.id} className="flex justify-between my-3">
                  <h3>{facteurData.nom_facteur}</h3><h4 className="font-bold">({facteurData.unit})</h4>
                  <input 
                  type="number" 
                  className="border border-solid border-black w-16"
                  onChange={(e)=>{handleNumberChange(facteurData.id,e.target.value)}}
                  />
                </div>
            
                
              ))
              :
             <h1 className="text-center font-bold my-16">Vous n'avez séléctionner aucun facteur</h1>
            }
          
            

            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              Appliquer
            </button>
        </div>
    )
}
export default DataForm