import { apiClient } from "@/KeycloakConfig/KeycloakConn";
import React, { useEffect, useState } from "react";
import { fetchValueOfFacteur,insertValueOfFacteur } from "@/Function/DataInfoFunctions";
import Alerts from "@/Composant/Alerts";


const DataForm=({date,IDs})=>{
    
    const [facteursData, setFacteursData] = useState([]);
    const [isFacteursDataEmpty,setIsFacteursDataEmpty]=useState(false)
    const [numbers,setNumbers]=useState({});
    const [alert,setAlert]=useState(false)
    const [problemAlert,setProblemAlert]=useState(false)
    const [champsVideAlert,setChampsVideAlert]=useState(false)
    const fetchFacteur=async(ID)=>{
        try{
            const response=await apiClient.get(`/facteur/${ID}`)
            return response.data
        }
        catch(e){
            console.error("Erreur:"+e)
        }
    }
    const fetchAndSetFacteurValues = async () => {
      try {
          const fetchedData = await Promise.all(IDs.map(fetchFacteur));
          setFacteursData(fetchedData.filter((data) => data !== null));

          const promises = fetchedData.map(async (facteur) => {
            if (facteur) {
              const value = await fetchValueOfFacteur(facteur.id, localStorage.getItem("idUser"), date);
              return { id: facteur.id, value };
            }
            return null;
          });
      
          const results = await Promise.all(promises);
      
          results.forEach((result) => {
            if (result) {
              setNumbers((prevNumbers) => ({
                ...prevNumbers,
                [result.id]: result.value,
              }));
            }
          });
      } catch (e) {
          setIsFacteursDataEmpty(true);
      }
  };

  useEffect(() => {
      fetchAndSetFacteurValues();
  }, [IDs]);
    
    
    const handleNumberChange = (id, value) => {
      setNumbers((prevNumbers) => ({
        ...prevNumbers,
        [id]:value !== '' ? value : '',
      }));
    };

    
    
    const handleSubmit=async(e)=>{
      e.preventDefault()
      
            
      if(!Object.values(numbers).includes(''))
      { 
        try{
          await Promise.all(
            Object.entries(numbers || {}).map(async([id, value]) => {
              const bodyRequest={
                idUtilisateur:localStorage.getItem("idUser"),
                idFacteur:id,
                date:date,
                quantity:value 
                }
                  await insertValueOfFacteur(bodyRequest)
              }
            )
          )
          setAlert(true);
        }

        catch(e){
          console.error(e)
          setProblemAlert(true)
        }
      }
      else{
        setChampsVideAlert(true)
      }
     
    }
    useEffect(() => {
      if (alert || problemAlert ||champsVideAlert) {
          const timer = setTimeout(() => {
              setAlert(false);
              setProblemAlert(false);
              setChampsVideAlert(false);
          }, 1000); 
  
          return () => clearTimeout(timer);
      }
  }, [alert, problemAlert]);
  

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
                  step="0.1"
                  onBlur={(e)=>{handleNumberChange(facteurData.id,e.target.value)}}
                  defaultValue={numbers[facteurData.id] || ""}
                  required
                  />
                </div>
            
                
              ))
              :
             <h1 className="text-center font-bold my-16">Vous n'avez séléctionner aucun facteur</h1>
            }
          
            

            <button
              type="submit"
              className={`w-full text-white ${isFacteursDataEmpty?`bg-gray-400`:` bg-gray-700 hover:bg-black`} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              onClick={handleSubmit}
              disabled={isFacteursDataEmpty}
            >
              Appliquer
            </button>
            <Alerts  alert={alert} alertProblem={problemAlert} titre_succes={"Données Enregistrer"} message_succes={"Données Enregistrer avec succès" } message_erreur={"Une erreur est survenue lors de l'opération"}/>
            <Alerts  alert={alert} alertProblem={champsVideAlert} titre_succes={"Données Enregistrer"} message_succes={"Données Enregistrer avec succès" } message_erreur={"L'un des champs est vide"}/>

        </div>
    )
}
export default DataForm