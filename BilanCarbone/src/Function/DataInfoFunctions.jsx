import { apiClient } from "@/KeycloakConfig/KeycloakConn"

export const insertValueOfFacteur=(bodyRequest)=>{
    const response=apiClient.post("data",bodyRequest
    )
    return response.data
}



export const fetchValueOfFacteur=async (idFacteur,idUtilisateur,date)=>{
    const response=await apiClient.get("data/value",{
        params: {
            IdFacteur:idFacteur,
            IdUtilisateur:idUtilisateur,
            date:date
        }
    }
        
    )

    return response.data
    
    
}
