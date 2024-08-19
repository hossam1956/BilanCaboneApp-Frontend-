import { apiClient } from "@/KeycloakConfig/KeycloakConn";
import React from "react";

const DataForm=({date})=>{
    const dataMaps=JSON.parse(localStorage.getItem("dataMaps"))[localStorage.getItem("idUser")][date]
    //console.log(dataMaps)


    const fetchFacteur=async(id)=>{
        try{
            const response=await apiClient.get(`/facteur/${id}`)
            console.log(response)
        }
        catch(e){
            console.log("Erreur:"+e)
        }
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
            <div>
            {dataMaps.map((dataMap)=>(
                fetchFacteur(dataMap)
            ))}
            </div>
        </div>
    )
}
export default DataForm